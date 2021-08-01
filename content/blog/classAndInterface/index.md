---
title: 클래스, 인터페이스 추상 클래스
date: "2021-08-01T12:40:32.169Z"
description: 타입스크립트로 인터페이스와 추상클래스를 배워보자
tags: ["typeScript", "class", "interface"]
---

클래스, 인터페이스 추상 클래스 등 OOP의 세계에서는 활용하면 좋은 개념들이 많이 있다.

자바스크립트 역시 OOP적으로 프로그래밍을 할 수 있지만, 타입스크립트는 OOP적 성격을 가질수 있는 장치를 극대화 해준다.

이번 글에서는 타입스크립트에서 인터페이스와 추상 클래스가 어떻게 사용되는지에 대한 이야기를 할 것이다.

우리가 만들고자 하는 코드는 버블정렬을 하는 코드다. 버블 정렬이란 원소의 맨앞에서 부터 바로 다음 원소를 비교해 가면서 원소의 대소에 따라 자리를 바꾸는 식으로 정렬 대상이 되는 것들을 정렬 하는 방식이다. 더 자세한 설명은 이 글의 대상에서 하고자 하는 이야기가 아니기에 생략한다.

## 작동은 하지만 좋지 않은 코드

먼저 일단 동작하지만 그렇게 좋은 코드는 아닌 코드를 보자.

```tsx
class Sorter {
  constructor(public collection: number[] | string) {
    this.collection = collection
  }

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // 배열인 경우의 처리
        if (this.collection instanceof Array) {
          if (this.collection[j] > this.collection[j + 1]) {
            const leftHand = this.collection[j]
            this.collection[j] = this.collection[j + 1]
            this.collection[j + 1] = leftHand
          }
        }
        // 문자열인 경우의 처리
        if (this.collection instanceof String) {
          // 문자열에 필요한 처리
        }
      }
    }
  }
}

const sorter = new Sorter([10, 3, -5, 0])
sorter.sort()
console.log(sorter.collection)
```

이 코드는 아래와 같이 동작한다.

- `constructor` 로 숫자 배열 혹은 문자열을 받고 이를 `collection` 에 할당한다.
- 전달받은 `collection` 의 타입에 따라서 다른 처리를 한다.
  - 숫자 배열인 경우 j 번째 수와 j+1 번째 수를 비교한다.
  - 만약 j 번째 수가 더 크다면 둘의 자리를 바꾸어 놓는다.
  - 문자열의 경우 문자열에 필요한 처리( 각자리의 문자를 비교하고 둘의 자리를 바꾸어 놓는다.)
- `Sorter` 클래스에 배열을 넣고 `sort` 메서드를 호출한다.
- 오름차순으로 정렬된 값을 출력한다.

이코드는 우리가 의도한 대로 동작할 것이다. 하지만, 그렇다고 해서 좋은 코드는 아니다. 유지보수에 그리 좋은 코드가 아니기 때문이다.

우리가 정렬을 하려는 것들이 늘어남에 따라서 이 Sorter 클래스의 코드는 계속해서 바뀌어야 한다.

예를 들어 문자, 배열 뿐만 아니라 LinkedList를 추가한다고 생각해 보면 `constructor(public collection: number[] | string | LinkedList` 를 쓰게 될 것이다. 그리고 `if (this.collection instanceof LinkedList )` ... 이런 코드를 `sort` 메서드 안에 추가해야 할 것이다. 하나의 타입이 늘어날 때마다 이런 과정을 계속해서 겪어야 할 것이다. 50개 타입을 추가 하려면 50가지의 분기를 만들어야 할 것이다.

이렇게 기존에 있던 코드를 계속 고쳐쓰게 되는 것은 보기도 좋지 않고 의도치 않은 버그를 발생 시키기도 쉽다.

## 약간 더 나은 코드(인터페이스 활용)

리펙터링 방식은 다양하다. 하지만 모든 리펙터링 방식은 하나의 원칙을 공유하고 있다. 공통된 부분을 추출해서 묶는 것이다.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FZyV0W66wpw.png?alt=media&token=6676b2a2-bcc1-48b4-b28b-974d5f9f78b9)

위 이미지에서 볼 수 있듯, `sort`에서 추출할 수 있는 핵심 로직은 비교와 교환 이었다.

`Sorter` 클래스는 비교가 참이라면 교환을 하는 방식으로 버블정력을 추상화해서 가지고 있도록 하고, 정렬의 대상이 되는 클래스에서 `compare` 와 `swap`의 구체적인 구현을 하게 한다.

먼저 정렬의 대상이 되는 `NumberCollection` 을 만들어 보자

```tsx
export class NumbersCollection {
  constructor(public data: number[]) {}

  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex]
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex]
    this.data[leftIndex] = this.data[rightIndex]
    this.data[rightIndex] = leftHand
  }
}
```

이코드는

- 정렬의 대상이 되는 숫자 배열을 `constructor` 로 받는다.
- `length` , `compare` ,`swap` 등 기존의 `Sorter` 클래스가 사용하던 것들의 구체적인 구현을 가지고 있다.

이런한 `NumbersCollection`을 정렬의 대상으로 받는 `Sorter` 클래스는 아래와 같다.

```tsx
import { NumbersCollection } from "./NumbersCollection"

export class Sorter {
  constructor(public collection: NumbersCollection) {
    this.collection = collection
  }

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1)
        }
      }
    }
  }
}
```

이 코드는

- 정렬의 대상이 되는 `NumberseCollection`을 `constructor` 로 받는다.
- 이 대상의 `compare` 메서드를 불러서 비교 로직을 수행하고 `swap` 메서드를 불러서 교환 로직을 수행한다.

이 코드를 통해 정렬을 수행하면 아래와 같이 할 수 있다.

```tsx
import { Sorter } from "./Sorter"
import { NumbersCollection } from "./NumbersCollection"

const numbersCollection = new NumbersCollection([10, -355, -5, 0])
const sorter = new Sorter(numbersCollection)
sorter.sort()
console.log(numbersCollection.data)
```

이런 방식에는 여전히 문제가 남아 있는데, `NumbersCollection` 밖에 정렬을 할 수 없다는 점이다.

그때 그때 받을 수 있는 타입으로 `StringsCollection` .... 등등을 넣을수도 있다. 하지만 이러한 방식은 정렬 대상이 추가될 때마다 기존 코드를 고쳐야 하고 가독성에 좋지 않다.

이때 사용할 수 있는 것이 바로 인터페이스다. 대상이 되는 객체가 무엇이든 상관 없이 `length`, `compare`, `swap`을 가지고 있으면 사용할 수 있다는 선언이다. 여기에 인자로 들어오는 객체들은 해당 조건을 만족하기만 하면 된다.

```tsx
interface Sortable {
  length: number
  compare(leftIndex: number, rightIndex: number): boolean
  swap(leftIndex: number, rightIndex: number): void
}

export class Sorter {
  constructor(public collection: Sortable) {
    this.collection = collection
  }

  sort(): void {
    const { length } = this.collection

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1)
        }
      }
    }
  }
}
```

이제 어떤 대상 이던지 상관 없이 인터페이스의 조건에만 맞으면 `Sorter` 를 통해서 정렬할 수 있게 되었다.

이를 바탕으로 CharactersColleciton 을 구현하면 아래와 같다.

```tsx
export class CharactersColleciton {
  constructor(public data: string) {}

  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLocaleLowerCase() >
      this.data[rightIndex].toLocaleLowerCase()
    )
  }

  swap(leftIndex: number, rightIndex: number) {
    const characters = this.data.split("")
    const leftHand = characters[leftIndex]
    characters[leftIndex] = characters[rightIndex]
    characters[rightIndex] = leftHand

    this.data = characters.join("")
  }
}
```

이를 사용해 정렬해 보면 아래처럼 할 수 있다.

```tsx
import { Sorter } from "./Sorter"
import { NumbersCollection } from "./NumbersCollection"
import { CharactersColleciton } from "./CharactersCollections"

// const numbersCollection = new NumbersCollection([10, -355, -5, 0]);
// const sorter = new Sorter(numbersCollection);
// sorter.sort();
// console.log(numbersCollection.data);

const charactersCollection = new CharactersColleciton("XaAaYn")
const sorter = new Sorter(charactersCollection)
sorter.sort()
console.log(charactersCollection)
```

## 더 나은 코드(추상 클래스 활용)

확장 가능하게 코드를 짜긴 했는데, 아직 뭔가 아쉽다. 우리의 코드는 정렬하고자 하는 대상이 되는 클래스의 인스턴스를 선언하고 에 다시 그 인스턴스를 집어넣고 메서드를 호출해서 정렬시킨다.

굉장히 부자연스러운 흐름이다. 그냥 `charactersCollection.sort()` 처럼 정렬하고자 하는 대상의 메서드로 를 호출 하는 것이 훨씬 자연스러운 흐름일 것이다.

이대로 코드를 진행시키면, 이 코드를 개발한 나는 이 코드를 쓸수 있을지 모르지만, 다른 개발자들 에게 이 코드가 왜 이렇게 부자연스럽게 짜여졌는 설명하고 사용법을 제공해 주어야 한다.

인터페이스를 통해서는 이 목표를 이룰 수 없다. `Sorter`가 정렬 메서드를 호출하는 구조이기 때문이다.

그럼 어떻게 해야 할까? 이때 활용할 수 있는 것으로 상속을 활용할 수 있다.

클래스를 상속하면 자식 객체들은 부모의 메서드와 프로퍼티에 접근할 수 있다. `Sorter` 를 정렬 대상에 상속시켜 정렬 대상 자체가 `sort` 를 호출할 수 있게 해보자.

```tsx
export abstract class Sorter {
  abstract compare(leftIndex: number, rightIndex: number): boolean
  abstract swap(leftIndex: number, rightIndex: number): void
  abstract length: number

  sort(): void {
    const { length } = this

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1)
        }
      }
    }
  }
}
```

위코드는

- `abstract` 클래스로 선언되어, 구체적인 인스턴스를 만들지 못하도록 한다. 이 클래스는 오로지 상속을 위해서만 사용될 것 이라는 표시다.
- `abstract` 메서드 및 프로퍼티는 자식 클래스가 반드시 구현 해야만 하도록 정해 놓은 것이다.
- `sort` 메서드는 자식들이 사용하게될 메서드다. 자식들은 각각 자신의 `compare` 와 `swap` 을 사용해서 버블정렬을 하게 된다.

이제 `Sorter` 를 상속받는 `NumbersCollection` 을 만들어 보자

```tsx
import { Sorter } from "./Sorter"

export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super()
  }

  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex]
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex]
    this.data[leftIndex] = this.data[rightIndex]
    this.data[rightIndex] = leftHand
  }
}
```

위 코드는

- `Sorter` 를 상속 받는다.
- `constructor` 안에 `super()` 를 호출하여 부모 클래스를 초기화 시킨다.
- `length` ,`compare`, `swap` 에 대한 구체적 구현을 가지고 있다.

이로써 이제 우리는 `charactersCollection.sort()` 같은 더 직관적인 정렬방식을 가질수 있게 되었다.

## 인터페이스 vs 추상 클래스

쓰다 보니 추상 클래스가 더 좋은 것 같은 뉘앙스를 풍기고 있지만 절대 그렇지 않다. 둘의 쓰임이 각각 다른 것일 뿐이다.

둘 모두 다른 클래스 사이의 관계를 정의하는데 사용된다는 공통점이 있다. 서로 다른 클래스들이 같은 목적으로 사용될수 있도록 하는 것이다.

클래스들의 결합 방식에 있어서 둘은 차이가 난다.

인터페이스는 클래스간 느슨한 결합을 구현한다. 해당 기능이 되는 것들은 인터페이스를 통해서 서로 연결될 수 있다. 특정 클래스가 태어나면서 부터 이걸 가지고 있어야 한다는 강제가 아니라, 이 메서드나 프로퍼티를 가지고 있는 메서드는 여기에 합류할 수 있다고 알려주는 것이다. `Sorter` 의 코드가 변경되어도 정렬대상이 되는 클래스들의 코드자체가 변하지는 않는다.

추상 클래스는 클래스간 강한 결합을 시킨다. 상속을 받은 자식 클래스들은 반드시 무언가를 해야 한다. 이미 태어날때 부터 이렇게 만들어져야 한다는 걸 강제 하는 것이다. `Sorter` 클래스를 상속 받은 자식 클래스들은 싫더라도 일단 강제되는 메서드를 모두 구현하고 가지고 있어야 한다. 추상클래스 `Sorter` 의 코드를 변경하면 모든 자식은 이에 따른 영향을 받는다.

일반적으로는 느슨한 결합을 이용하는 것이 강한 결합을 이용하는 것보다 더 선호되는 코드 페턴이다. 강한 결합은 유지보수성을 떨어뜨린다. 한 곳의 코드를 고쳤을 때 다른 곳에서 예상치 못한 버그가 발생하는 경우가 많기 때문이다.

하지만 위의 사례 처럼 인터페이스 만으로는 구현하기 어려운 사례에서는 선택적으로 강한 결합을 사용하는 편이 더 좋은 경우도 있다.
