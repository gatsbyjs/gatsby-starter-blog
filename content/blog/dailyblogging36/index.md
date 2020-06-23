---
title: Daily Study Logging36 - Type Annotations
date: "2020-06-21T21:14:32.169Z"
description: 타입 스크립트의 type annotation
tags: ["knowledge", "studylog", "ts"]
---

Type annotations는 타입 스크립트에게 우리가 어떤 타입의 value를 사용할 것인지 알려주는 코드이다.

```javascript
//primitive

let appeles: number = 5
let speed: string = "fast"
let hasName: boolean = true
let nothingMuch: null = null
let nothing: undefined = undefined

// built in objects

let now: Date = new Date()

// Array
let colors: string[] = ["red", "greem", "blue"]
let myNumbers: number[] = [1, 2, 3]
let truth: boolean[] = [true, false]

// class

class Car {}

let car: Car = new Car()

// object literal

let point: { x: number, y: number } = {
  x: 10,
  y: 20,
}
```

기본적으로는 뒤에 콜론 `:`를 붙이고 해당 변수가 어떤 타입인지를 알려준다. array를 선언하는 경우, array안에 들어있는 값들이 어떤 타입인지를 선언해 주고 그 뒤에 '[]' 를 붙인다. 객체안의 프로퍼티 마다 타입을 정해 주고 싶다면 각 프로퍼티가 무슨 타입인지 { x: number; y: number } 처럼 정의 한다.
