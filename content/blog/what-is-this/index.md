---
title: 자바스크립트 "this" 완벽 가이드
date: "2020-03-16T12:40:32.169Z"
description: Free Code Camp의 "The Complete Guide to this in JavaScript" 번역 및 해설 추가
tags: ["knowledge", "Java Script"] 
---

**본 글은 Free Code Camp의 "The Complete Guide to this in JavaScript"를 번역 및 주석을 단 글 입니다.**
[출처](https://www.freecodecamp.org/news/the-complete-guide-to-this-in-javascript/)

--- 


### 자바스크립트에서 모든 펑션은 선언되는 순간 `this` 레퍼런스를 자동으로 가진다. 

자바스크립트 `this`는 자바나 C#과 같은 class 기반 언어들과 꽤 유사하다.(자바스크립트는 prototype-based language이며 class라는 컨셉을 가지고 만들어 지지 않았다.) `this`는 어떤 object가 function을 호출하고 있는지를 가리킨다.(이 object는 종종 context라 불리기도 한다.). 하지만 자바스크립트 function에서 호출되는 `this`는 function이 호출되는 위치에 따라 다른 object를 가리킬수도 있다. 

5가지 기본적인 규칙은 아래와 같다. 

## 규칙 1

function이 global scope에서 호출되면, `this`는 **gobal object** 를 가리키게 된다.(브라우져에서는 `window` 가 되고 Node.js에서는 `global`이 된다.)

```javascript 
function foo() {
  this.a = 2;
}

foo();
console.log(a); // 2
```

메모: 만약 당신이 `foo()`function을 strict 모드에서 선언했다면, 당신은 이 function을 글로벌 scope에서 호출하는 것이다. `this`는 `undefined`가 될 것이고 `this.a = 2`는 `Uncaught TypeError `에러가 날 것이다. 

## 규칙 2 

아래의 예시를 살펴 보자. 

```javascript
// foo는 this에 a라는 property를 추가해 주는 함수
function foo() {
  this.a = 2;
}

// obj는 foo라는 method를 가진 object
const obj = {
  foo: foo
};

// object에 있는 foo를 call 한다. 
obj.foo();

// 그뒤 obj에 a 라는 property가 생겼음을 확인할 수 있다. 
console.log(obj.a); // 2

```

분명히, 위의 코드에서는 `foo()` function은  `obj` object context 에서 실행된다. 따라서 `this`는 `obj`에 속하게 된다. function이 해당 context에서 호출 될 때, `this`는 이 object에 속한다. 


## 규칙 3 

`.call`, `.apply`와 `.bind`는 call site에서 `this`를 명시적으로 지정하기 위해 사용될 수 있다. 

```javascript
// foo를 this의 bar property를 읽어오는 function으로 정의 한다. 
const foo = function() {
  console.log(this.bar)
}
// foo에 call로 {bar:1}을 this로 정해준다. 그럼 this의 bar property인 1이 출력된다.
foo.call({ bar: 1 }) // 1

// 만약 그냥 foo()를 호출한다면, undefined가 출력된다. window객체는 bar 라는 property가 없기 때문이다. 
```

각 함수가 어떻게 `this`를 정할수 있는지에 대한 간단한 예시는 아래와 같다. 

- `.call()`: `fn.call(thisObj, fnParam1, fnParam2)`
- `.apply()`: `fn.apply(thisObj, [fnParam1, fnParam2])`
- `.bind()`: `const newFn = fn.bind(thisObj, fnParam1, fnParam2)`


## 규칙 4

```javascript
function Point2D(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point2D(1, 2);
console.log(p1.x); // 1
console.log(p1.y); // 2
```

`Point2D` function은 `new` 키워드와 함께 호출 되었다. 그리고 `this`는 `p1` object를 가리킨다. function이 `new`키워드와 함께 호출 된다면, 새로운 object가 만들어지고 `this`는 그 object를 가리키게 된다. 

메모: `new` 키워드와 함께 function이 호출된다면 이를 _constructor function_ 이라 한다. 

## 규칙 5

자바스크립트는 런타임에서 최근의 context를 기준으로 `this`의 값을 정한다. 때문에, 때때로 `this`는 당신이 생각하는 것과 다른것을 가리킬 수 있다.

```javascript
const Cat = function(name, sound) {
  this.name = name;
  this.sound = sound;
  this.makeSound = function() {
    console.log( this.name + ' says: ' + this.sound );
  };
}

const kitty = new Cat('Fat Daddy', 'Mrrooowww');
kitty.makeSound(); // Fat Daddy says: Mrrooowww

// 이 코드는 우리가 예상하는 방식으로 작동한다.

```

이제, Cat이 사람들을 짜증나게 할 수 있도록 100초동안 0.5초마다 울음소리를 내는 `annoy()` method를 추가하자.

```javascript
const Cat = function(name, sound) {
  this.name = name;
  this.sound = sound;
  this.makeSound = function() {
    console.log( this.name + ' says: ' + this.sound );
  };
  this.annoy = function() {
    let count = 0, max = 100;
    const t = setInterval(function() {
      this.makeSound(); // <-- 이 부분에서 `this.makeSound is not a function` 에러를 내며 함수가 실행되지 않는다.
      count++;
      if (count === max) {
        clearTimeout(t);
      }
    }, 500);
  };
}

const kitty = new Cat('Fat Daddy', 'Mrrooowww');
kitty.annoy();

```

위의 코드는 동작하지 않는다. `setInterval` callback의 내부는 global context를 가지기 때문이다. 따라서, `this`는 더이상 우리의 kitty를 가리키지 않는다. 웹 브라우저에서, `this`는 대신 Window object를 가리키게 된다. Window object는 `makeSound()` method를 가지고 있지 않다. 

이를 해결하기 위한 몇가지 방법이 있다. 

1. 새로운 context를 만들기 전에 `this`를 로컬 변수로 저장하는 것이다. 그리고 그 변수를 callback안에서 사용하는 것이다. 

```javascript
const Cat = function(name, sound) {
  this.name = name;
  this.sound = sound;
  this.makeSound = function() {
    console.log( this.name + ' says: ' + this.sound );
  };
  this.annoy = function() {
    let count = 0, max = 100;
    const self = this; // this를 self라는 변수에 저장했다.
    const t = setInterval(function() {
      self.makeSound();
      count++;
      if (count === max) {
        clearTimeout(t);
      }
    }, 500);
  };
}

const kitty = new Cat('Fat Daddy', 'Mrrooowww');
kitty.annoy();
```

2. ES6에서 arrow function을 이용할 수 있다. arrow function은 `this`를 해당 함수가 정의된 코드의 context로 정한다. 

```javascript
const Cat = function(name, sound) {
  this.name = name;
  this.sound = sound;
  this.makeSound = function() {
    console.log( this.name + ' says: ' + this.sound );
  };
  this.annoy = function() {
    let count = 0, max = 100;
    const t = setInterval(() => { // arrow function을 사용하여 함수를 호출한다.
      this.makeSound();
      count++;
      if (count === max) {
        clearTimeout(t);
      }
    }, 500);
  };
}

const kitty = new Cat('Fat Daddy', 'Mrrooowww');
kitty.annoy();


```

