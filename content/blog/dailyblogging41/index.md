---
title: Daily Study Logging41 - 타입스크립트, Interface
date: "2020-06-30T12:13:32.169Z"
description: 타입스크립트 interface 사용법
tags: ["typescript", "studylog"]
---

타입스크립트의 Interface는 복잡한 타입 설정을 재사용 가능하고 읽기 좋은 형태로 만들어 준다.

```javascript
const oldCivic = {
  name: "civic",
  yaer: 2000,
  borken: true,
};

const printVehicle = (vehicle: {name: string; yaer: number; broken: boolean}):void => {
  console.log(`Name: ${vehicle.name}`)
  console.log(`Year: ${vehicle.year}`)
  console.log(`Broken: ${vehicle.broken}`)
})
```

위의 코드는 정상적으로 작동한다. 하지만 읽기 그렇게 시원하지 않은 것도 사실이다.

인터페이스를 아래와 같이 사용하면 훨씬 간결한 코드를 쓸 수 있다.

```javascript
interface Vehicle {
  name: string;
  yaer: number;
  broken: boolean;
}
const oldCivic = {
  name: "civic",
  yaer: 2000,
  borken: true,
};

const printVehicle = (vehicle: Vehicle):void => {
  console.log(`Name: ${vehicle.name}`)
  console.log(`Year: ${vehicle.year}`)
  console.log(`Broken: ${vehicle.broken}`)
})
```

함수를 선언할 때는 아래와 같이 해당 함수가 무엇을 리턴하는지 미리 지정하고 interface에서 타입을 지정하면 된다.

```javascript
interface Vehicle {
  name: string;
  yaer: Date;
  broken: boolean;
  summary(): string;
}
const oldCivic = {
  name: "civic",
  yaer: new Date(),
  borken: true,
  summary() : string {
    return `Name: ${this.name}`;
  }
};

const printVehicle = (vehicle: Vehicle):void => {
  console.log(`Name: ${vehicle.summary());
})
```

자 이제 우리의 함수 `printVehicle`에서 사용하는 프로퍼티는 summary 뿐이다. 이때, 인터페이스에서 summary를 제외한 다른 것들을 지워도 동일하게 동작하는 것을 확인할 수 있다.

타입스크립트가 체크하는것은 실제로 사용되는 프로퍼티의 타입뿐이기 때문이다.

```javascript
interface Vehicle {
  // name: string;
  // yaer: Date;
  // broken: boolean;
  summary(): string;
}
const oldCivic = {
  name: "civic",
  yaer: new Date(),
  borken: true,
  summary() : string {
    return `Name: ${this.name}`;
  }
};

const printVehicle = (vehicle: Vehicle):void => {
  console.log(`Name: ${vehicle.summary());
})
```
