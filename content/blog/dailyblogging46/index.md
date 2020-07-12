---
title: Daily Study Logging45 - 타입스크립트, Instance Method Modifiers
date: "2020-07-10T12:13:32.169Z"
description: 타입스크립트, Instance Method Modifiers
tags: ["typescript", "studylog"]
---

class에서 modifier란 class의 method나 property에 부여할수 있는 특징을 말한다. 세가지 옵션이 있는데 public, private, protected가 그것이다.

자바스크립트 클래스의 method와 property는 기본적으로 public이며, 다른 modifier를 강제할 수 있는 문법이 없다. (ES10에서 부터는 #을 변수명 앞에 붙이면 private선언이 되기는 한다.) 타입스크립트에서는 modifier를 강제할 수 있다.

modifier의 목적은 해당 method나 property에 접근할 수 있는 권한을 명시하기 위함이다.

아무것도 정해 두지 않으면 기본적으로 public이 부여된다. 어느곳에서든지 해당 method나 property에 접근할 수 있다.

private이 부여된 method의 경우에는 동일한 클래스에 있는 다른 method에 의해서만 호출 될 수 있다.

protected가 부여된 경우, 동일한 클래스에 있는 다른 method 혹은 child class에 있는 method에 의해 호출될 수 있다.

아래의 코드를 보자

```typescript
class Vehicle {
  public drive(): void {
    console.log("부릉부릉")
  }

  public honk(): void {
    console.log("빵빵")
  }
}

class Car extends Vehicle {
  public drive(): void {
    console.log("뿌릉")
  }
}

const car = new Car()
car.drive() //"뿌릉"
car.honk() // "빵빵"
```

drive를 private으로 아래처럼 바꿔주면 에러가 발생한다.

```typescript
class Vehicle {
  public drive(): void {
    console.log("부릉부릉")
  }

  public honk(): void {
    console.log("빵빵")
  }
}

class Car extends Vehicle {
  //Class 'Car' incorrectly extends base class 'Vehicle', 부모 클래스는 public인데 자식클래스가 overwrite해서 private으로 만들어서는 안된다.
  private drive(): void {
    console.log("뿌릉")
  }
}

const car = new Car()
car.drive() // Property 'drive' is private and only accessible within class 'Car'.ts(2341)
car.honk()
```

아래의 코드는 무리없이 동작한다. 상송받은 modifier를 바꾸지 않았고, private메서드를 내부에서 호출했기 때문이다.

```typescript
class Vehicle {
  // public drive(): void {
  //   console.log("부릉부릉")
  // }

  public honk(): void {
    console.log("빵빵")
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log("뿌릉")
  }
  startDriving(): void {
    this.drive()
  }
}

const car = new Car()
car.startDriving()
car.honk()
```

protected에 대해서 알아보자. honk를 private으로 선언하고 자식 클래스에서 호출하면 아래와 같은 에러가 발생한다.

```typescript
class Vehicle {
  private honk(): void {
    console.log("빵빵")
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log("뿌릉")
  }
  startDriving(): void {
    this.drive()
    this.honk() // Property 'honk' is private and only accessible within class
  }
}

const car = new Car()
car.startDriving()
```

protected를 부여해주면 자식클래스의 method는 이를 호출할 수 있다. 하지만 외부에서 호출하는 것은 허용되지 않는다.

```typescript
class Vehicle {
  protected honk(): void {
    console.log("빵빵")
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log("뿌릉")
  }
  startDriving(): void {
    this.drive()
    this.honk()
  }
}

const car = new Car()
car.startDriving()
car.honk() //Property 'honk' is protected and only accessible within class 'Vehicle' and its subclasses.
```

근데 이게 왜 필요한 걸까? 언뜻 생각하면 보안이슈와 관련이 있을 것 같지만 그렇지 않다.

modifier를 추가하는 이유는 다른 개발자들이 call할 수 있는 method를 제한하기 위함이다. 잘못 사용하는 경우 어플리케이션을 망가뜨릴 정도로 복잡한 method가 다른 개발자에 의해 call되는걸 막는것이 주 목적이다.
