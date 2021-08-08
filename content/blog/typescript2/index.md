---
title: TypeScript Examples (Enum, Tuple, Generics, Inheritence Vs Composition)
date: "2021-08-08T12:40:32.169Z"
description: 타입스크립트 예제로 알아보는 개념들
tags: ["typeScript "]
---이번에도 타입스크리트 관련 글이다. `Enum` , `Tuple` , (Inheritence Vs Composition) 에 대한 이야기가 포함될 것 같다.

통계를 내는 작은 프로젝트를 만들면서 배워보자.

자, 일단 별로 좋지 않은 코드를 봐보자

```tsx
import fs from "fs";

const matches = fs
  .readFileSync("football.csv", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((row: string): string[] => {
    return row.split(",");
  });

const matchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}

let manUnitedWins = 0;

for (let match of matches) {
  if (match[1] === "Man United" && match[5] === matchResult.HomeWin) {
    manUnitedWins++;
  } else if (match[2] === "Man United" && match[5] === matchResult.AwayWin) {
    manUnitedWins++;
  }
}

console.log(`Man United won ${manUnitedWins} games`);
```

이코드가 하는일은 CSV파일을 읽어서 Man United 가 얼마나 이겼는지 알아내는 것이다.

참고로 csv파일은 아래의 형식으로 이루어져 있다.

```tsx
10/08/2018,Man United,Leicester,2,1,H,A Marriner
11/08/2018,Bournemouth,Cardiff,2,0,H,K Friend
11/08/2018,Fulham,Crystal Palace,0,2,A,M Dean
11/08/2018,Huddersfield,Chelsea,0,3,A,C Kavanagh
11/08/2018,Newcastle,Tottenham,1,2,A,M Atkinson
11/08/2018,Watford,Brighton,2,0,H,J Moss
```

## Enum

위 코드에서 보면, `matchResult` 를 상수화 해서 사용하고 있다. 그냥 이렇게 써도 사실 큰 문제는 없지만 더 좋은 방식이 있다.

이 방법은 `matchResult` 를 일반 객체로 사용하고 있다. 이 객체는 변조 될 수 있다. 프로퍼티가 추가될수도 있고, 메서드가 추가될수도 있다. 하지만 우리가 이 객체를 만든 목적은 이 객체 자체를 변조해서 사용하기 위함이 아니다. 이렇게 변조 가능하게 두면 누군가 실수로 이 객체에 무언가를 추가해서 사용할지도 모른다.

이런 걱정을 미연에 방지해 줄수 있는 자료구조가 `Enum`이다. `Enum` 으로 선언된 데이터는 런타임에서 변하지 않는다. 즉 누군가 실수로 여기에 프로퍼티를 추가하거나 할 수 없다는 것이고, 이 자체로만 사용될 것이라는 것을 미래의 나와 개발자 동료들에게 알리는 기능을 할 수 있는 것이다.

고치는 법은 앞에 `enum` 만 붙여주면 끝

```tsx
import fs from "fs"

const matches = fs
  .readFileSync("football.csv", {
    encoding: "utf-8",
  })
  .split("\n")
  .map((row: string): string[] => {
    return row.split(",")
  })

enum matchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}

let manUnitedWins = 0

for (let match of matches) {
  if (match[1] === "Man United" && match[5] === matchResult.HomeWin) {
    manUnitedWins++
  } else if (match[2] === "Man United" && match[5] === matchResult.AwayWin) {
    manUnitedWins++
  }
}

console.log(`Man United won ${manUnitedWins} games`)
```

## 클래스를 이용한 로직의 분리

지금 우리의 코드는 많은 부분이 하드코딩 되어있다.

### 소스 데이터를 불러오는 로직의 분리

소스코드를 불러오는 방식은 다양할 수 있다. 지금은 CSV에서 불러오고 있지만 네트워크 요청으로 파일을 불러올 수도있다. 이경우 우리코드의 상반부의 대부분을 드러내고 다시 써야 한다. 불러오는 로직을 별도의 클래스로 관리해 보자

`CSVFileReader` 라는 클래스를 만들어서 csv를 불러오도록 해보자

```tsx
import fs from "fs"

export class CsvFileReader {
  data: string[][] = []

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
  }
}
```

위 코드가 하는 일은 `CsvFileReader` 의 인스턴스가 데이터를 this.data에 저장할 수 있도록 하는 것이다.

그리고 이제 우리의 `index.ts` 를 아래 처럼 고친다.

```tsx
const reader = new CsvFileReader("football.csv")

enum matchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}

let manUnitedWins = 0

for (let match of reader.data) {
  if (match[1] === "Man United" && match[5] === matchResult.HomeWin) {
    manUnitedWins++
  } else if (match[2] === "Man United" && match[5] === matchResult.AwayWin) {
    manUnitedWins++
  }
}

console.log(`Man United won ${manUnitedWins} games`)
```

여전히 같은 결과를 볼 수 있다. 만약에 우리가 데이터를 네트워크에서 불러온다면 맨 윗 한줄만 바꾸면된다.

## Tuple로 더 좋은 CsvFileReader 만들기

지금 우리가 만든 `CsvFileReader` 도 개선할 구석이 많다. `CsvFileReader` 안의 data는 string 배열이 들어있는 배열로 자료구조를 가지고 있다.

근데 우리가 실제로 활용하게 될 데이터는 단순히 스트링이 아니다. 각 원소들은 저마다의 타입을 가지고 있다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FycH09ghSQ3.png?alt=media&token=03e0b54a-fd8e-41dd-a476-d1412a58bda8](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FycH09ghSQ3.png?alt=media&token=03e0b54a-fd8e-41dd-a476-d1412a58bda8)

각 요소들은 각 타입에 맞는 후처리를 할 수 있도록 각 데이터의 형 변환을 해 주도록 하자

제일 처음에 들어오는 데이터는 데이터 형식으로 보여주면 쓸모가 많을 것이다. 이를 날짜로 바꾸는 함수를 만들어 보자

```tsx
export const dateStringToDate = (dateString: string): Date => {
  //28/10/2018
  const dateParts = dateString.split("/").map((value: string): number => {
    return parseInt(value)
  })

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
}
```

이 함수는 들어온 스트링을 쪼개서 각 위치에 맞추어 Date 객체를 새로 만들어 주는 역할을 한다.

이걸이제 `CsvFileReader` 로 넣어 주고 숫자로 사용되는 원소들을 `parseInt` 를 넣어서 사용해 주면 아래와 같은 코드가 된다. 추가로 row[5]에 type assertion 을 써서 match Enum 타입을 가짐을 알려 준다.

```tsx
import fs from "fs"
import { matchResult } from "./MatchResult"
import { dateStringToDate } from "./utils"

export class CsvFileReader {
  data: string[][] = []

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
      .map((row: string[]): any => {
        return [
          dateStringToDate(row[0]),
          row[1],
          row[2],
          parseInt(row[3]),
          parseInt(row[4]),
          row[5] as matchResult, //'H', 'A', 'D'
        ]
      })
  }
}
```

지금 위의 코드에는 한가지 문제가 있다. 마지막 map에 서 리턴하는 자료의 형식이 `any` 인 것이다. 우리는 지금 read 메서드가 리턴하는 값이 무슨 값인지 알수 없다.

이제 드디어 `tuple` 이 등장할 차례다. 배열이지만, 각 배열에 위치해 있는 워소들이 무슨 타입을 가지고 있는지 정해줄 수 있다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2F-5jfpEMkDL.png?alt=media&token=7f560223-b34b-49ca-ad95-904c31ca4a45](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2F-5jfpEMkDL.png?alt=media&token=7f560223-b34b-49ca-ad95-904c31ca4a45)

```tsx
import fs from "fs"
import { matchResult } from "./MatchResult"
import { dateStringToDate } from "./utils"

type MatchData = [Date, string, string, number, number, matchResult, string]

export class CsvFileReader {
  data: MatchData[] = []

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
      .map(
        (row: string[]): MatchData => {
          return [
            dateStringToDate(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            row[5] as matchResult,
            row[6],
          ]
        }
      )
  }
}
```

위와 같은 처리를 통해서 배열의 각 위치에 어떤 타입이 리턴 되는지 알려줄 수 있다.

## 상속을 통한 리팩터링

동작하는 CSVFileReader를 만들기는 했지만, 재사용하기 그렇게 좋은 형태는 아니다. 지금 우리는 우리가 사용하는 형식으로 데이터가 주어졌을 때만 이 클래스를 사용할 수 있다.

사용하는 데이터가 바뀔때마다 데이터 형식에 맞게 코드를 뜯어 고쳐야 한다.

공통적인 부분을 CsvFileReader 에 남겨 놓고 그렇지 않은 부분은 다른 클래스에게 위임해 보자

```tsx
import fs from "fs"
import { matchResult } from "./MatchResult"
import { dateStringToDate } from "./utils"

type MatchData = [Date, string, string, number, number, matchResult, string]

export class CsvFileReader {
  data: MatchData[] = []

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
      .map(this.mapRow)
  }

  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as matchResult,
      row[6],
    ]
  }
}
```

위의코드를 통해 `read`가 호출 되면 `mapRow`가 리턴하는 결과물의 배열을 리턴하도록 되었다.

이제 `mapRow` 의 구현을 다른 클래스에게 맏겨볼수 있게 되었다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FrW3Vs3r-9d.png?alt=media&token=4f580fe5-e8b9-4b3b-83b0-03364e5d7b33](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FrW3Vs3r-9d.png?alt=media&token=4f580fe5-e8b9-4b3b-83b0-03364e5d7b33)

`CsvFileReader` 를 추상클래스로 만들고 다른 클래스에 상속을 시켜준다.

```tsx
import fs from "fs"
import { matchResult } from "./MatchResult"

type MatchData = [Date, string, string, number, number, matchResult, string]

export abstract class CsvFileReader {
  data: MatchData[] = []

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): MatchData

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
      .map(this.mapRow)
  }
}
```

```tsx
import { CsvFileReader } from "./CsvFileReader"
import { dateStringToDate } from "./utils"
import { matchResult } from "./MatchResult"

export class MatchReader extends CsvFileReader {
  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as matchResult,
      row[6],
    ]
  }
}
```

여기서도 아직 문제가 있긴 하다. 추상 클래스인 `CsvFileReader` 의 `mapRow`의 결과 타입이 `MatchData` 로 고정 되어 있다는 것이다.

## Generics를 통한 코드 확장성 향상

`generics` 는 타입을 함수에 넣는 인자 처럼 사용한다.

```tsx
import fs from "fs"

export abstract class CsvFileReader<T> {
  data: T[] = []

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
      .map(this.mapRow)
  }
}
```

위의 코드는 CsvFileReader를 상속하는 클래스에서 타입을 넣어줄 수 있도록 한다.

```tsx
import { CsvFileReader } from "./CsvFileReader"
import { dateStringToDate } from "./utils"
import { matchResult } from "./MatchResult"

type MatchData = [Date, string, string, number, number, matchResult, string]

export class MatchReader extends CsvFileReader<MatchData> {
  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as matchResult,
      row[6],
    ]
  }
}
```

이제 상속을 통한 리펙터링을 마쳤다. 아래처럼 사용하면 된다.

```tsx
import { MatchReader } from "./MatchReader"
import { matchResult } from "./MatchResult"

const reader = new MatchReader("football.csv")
reader.read()

let manUnitedWins = 0

for (let match of reader.data) {
  if (match[1] === "Man United" && match[5] === matchResult.HomeWin) {
    manUnitedWins++
  } else if (match[2] === "Man United" && match[5] === matchResult.AwayWin) {
    manUnitedWins++
  }
}

console.log(`Man United won ${manUnitedWins} games`)
```

## 구성을 통한 리팩터링

지금까지는 상속하는 식으로 우리의 코드를 고쳤었다. 하지만 다른 방식으로도 리팩터링을 할 수 있다.

이번에는 인터페이스를 사용해서 리펙터링을 해볼 것이다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2Fj4osRJA2Js.png?alt=media&token=d95f8578-25dd-4464-aa6b-2e650df68e3f](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2Fj4osRJA2Js.png?alt=media&token=d95f8578-25dd-4464-aa6b-2e650df68e3f)

### Is-a, has-a

상속을 사용하면, 기능을 구성하는 클래스들은 is-a 관계를 가진다. 상속으로 만들어진 `MatchReader`는 `CsvFileReader`다.

무슨말인지 잘 이해가 안되니 좀더 단순화된 예시를 들어보자.

창문, 벽을 프로그래밍 한다고 생각해 보자. 상속으로 만들면 아래처럼 된다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2F3MeKTremoY.png?alt=media&token=1c6ed77d-20fc-41c4-b5da-4f9f405f48dd](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2F3MeKTremoY.png?alt=media&token=1c6ed77d-20fc-41c4-b5da-4f9f405f48dd)

벽과 창문은 `Rectangle` 을 상속 받는다. `Wall` 은 `Rectangle` 이다. `Window`도 `Rectangle` 이다. 이게 is-a 관계다.

이런 식으로 코딩이 되어 있다고 했을 때는 만약 동그란 창문이 있으면 코드를 재사용 할 수 없게된다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSsIzj2ZYEN.png?alt=media&token=d4677eb9-4c2d-4ac1-b898-07d7e5f1219e](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSsIzj2ZYEN.png?alt=media&token=d4677eb9-4c2d-4ac1-b898-07d7e5f1219e)

위의 이미지 처럼 `toggleOpen` 등의 코드를 재사용할 수 없다.

has-a 관계로 이 관계를 고쳐보자

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSzHn35JcRL.png?alt=media&token=f992da92-b9ca-4b98-af99-88853a722a82](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSzHn35JcRL.png?alt=media&token=f992da92-b9ca-4b98-af99-88853a722a82)

이제 `Wall` 은 `dimentions`을 가지고 있다. 여기에 `Rectangle` 을 넣게되면 `Wall` 은 `Rectangle` 을 가지고 있게 된다. 이게 has-a 관계다.

이제 동그란 벽을 만들때 기존 `Window` 의 코드를 재사용할 수 있다.

![https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSzHn35JcRL.png?alt=media&token=f992da92-b9ca-4b98-af99-88853a722a82](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2FdigitalBrain%2FSzHn35JcRL.png?alt=media&token=f992da92-b9ca-4b98-af99-88853a722a82)

여기서 볼 수 있다시피 코드 구성을 통한 방식이 더 재사용 가능한 코드를 만들 수 있는 방법이 된다.

이제 우리의 코드를 상속이 아닌 구성 방식으로 구성해 보자.

```tsx
import fs from "fs"

export class CsvFileReader {
  data: string[][] = []

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",")
      })
  }
}
```

`CsvFileReader` 는 이제 특정용로 제한 되지 않는 클래스다. `MatchReader` 와 `CsvFileReader` 를 has-a 관계로 만들어 보자

```tsx
import { matchResult } from "./MatchResult"
import { dateStringToDate } from "./utils"
type MatchData = [Date, string, string, number, number, matchResult, string]

interface DataReader {
  read(): void
  data: string[][]
}

export class MatchReader {
  matches: MatchData[] = []
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read()
    this.matches = this.reader.data.map(
      (row: string[]): MatchData => {
        return [
          dateStringToDate(row[0]),
          row[1],
          row[2],
          parseInt(row[3]),
          parseInt(row[4]),
          row[5] as matchResult,
          row[6],
        ]
      }
    )
  }
}
```

`MatchReader` 는 `DataReader` 인터페이스를 만족하는 객체를 가지고 있게 된다.

이를 아래 처럼 사용하면, 이제 구성으로 코드를 재구성 하게된 것이다.

```tsx
import { MatchReader } from "./MatchReader"
import { matchResult } from "./MatchResult"
import { CsvFileReader } from "./CSVFileREader"

const csvFileReader = new CsvFileReader("football.csv")

const matchReader = new MatchReader(csvFileReader)

matchReader.load()

let manUnitedWins = 0

for (let match of matchReader.matches) {
  if (match[1] === "Man United" && match[5] === matchResult.HomeWin) {
    manUnitedWins++
  } else if (match[2] === "Man United" && match[5] === matchResult.AwayWin) {
    manUnitedWins++
  }
}

console.log(`Man United won ${manUnitedWins} games`)
```
