---
title: Daily Study Logging40 - 타입스크립트, 디스트럭쳐링에서 타입 선언하기
date: "2020-06-29T12:13:32.169Z"
description: 타입스크립트 annotation 방법
tags: ["typescript", "studylog"]
---

타입 스크립트는 변수가 선언될때 타입스크립트가 알아서 변수가 무슨 타입인지 알 수 있는 경우를 제외하고는 명시적으로 그 타입을 적어 주어야 한다.

키 값을 기준으로 객체를 나누어 변수에 할당하는 디스트럭쳐링의 경우에는 어떤식으로 타입이 선언 되는지 알아보자.

일단 특정 객채를 파라메터로 집어 넣을때는 아래와같은 형식을 취한다. 파라메터의 이름, 각각의 키에 대응되는 값의 타입을 선언해 준다.

```javascript
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
}

const logWeather = (forecast: { date: Date, weather: string }): void => {
  console.log(forecast.date)
  console.log(forecast.weather)
}

logWeather(todaysWeather)
```

디스트럭쳐링으로 파라메터를 넣을때는 어떻게 할까?

```javascript
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
}

const logWeather = ({
  date,
  weather,
}: {
  date: Date,
  weather: string,
}): void => {
  console.log(forecast.date)
  console.log(forecast.weather)
}

logWeather(todaysWeather)
```

위와 같이 파라메터의 이름이 있던 자리에 디스트럭쳐링을 위한 키 값을 넣으면 된다.

한번더 연습해 보자.

```javascript
const profile = {
  name: "jesse",
  age: 27,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age
  },
}

const { age }: { age: number } = profile

const {
  coords: { lat, lng },
}: { coords: { lat: number, lng: number } } = profile
```

중첩 되어 있는 요소를 디스트럭쳐링 할때는 디스트럭쳐 하고자 하는 요소까지 내려 간 뒤, 디스트럭쳐 되는 키 값의 타입을 선언해 주어야 한다.
