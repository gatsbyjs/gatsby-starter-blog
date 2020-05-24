---
title: Daily Study Logging25 - 자바스크립트 스코핑
date: "2020-05-21T21:14:32.169Z"
description: 자바스크립트 스코핑
tags: ["knowledge", "studylog", "javascript"] 
---

> 자바스크립트에서 변수의 접근 범위는 lexical scope가 접근할 수 있는 변수를 정한다. dynamic scope가 결정하는 것이 아니다. 

오늘은 자바스크립트의 변수 스코핑에 대해 정리를 한다. 

lexical scope는 말은 어려워 보이지만 함수가 코드상에 적힌 위치에 따른 스코프를 말 하는 것 이고 dynamic scope는 함수가 호출된 위치에 따라 스코프가 정해지는 것을 말 한다.

바로 코드로 설명해 보자 

```javascript

function fnB() {
    const b = "b";
    return fnC();
}

function fnC() {
    console.log(b) // Uncaught ReferenceError: b is not defined
    const c= "c";
    return "The last function called"
}

function fnA() {
    const a = "a"
    return fnB();
}

fnA();
```

위와 같은 코드가 있다고 하자. `fnA`는 `fnB`를 `fnB`는 `fnC`를 호출한다. 각 함수는 독립적으로 적혀 있기 때문에 각 함수가 가지고 있는 변수는 다른 함수에서 접근 할 수 없다. 변수의 스코핑이 동적으로 이루어지지 않는 것이다. 


이제 아래 코드를 보자. `fnC`는 다른 함수안에 적혀 있기 때문에 그 lexical scoping에 의해 다른 변수들에 접근 할 수 있다.


```javascript
function fnA() {
    const a = "a";
    return function fnB() {
        const b = "b";
        return function fnC() {
            console.log(b) // "b" 
            const c = "c";
            return "The last function called"
        }
    }
}
fnA()()()

```

위의 두 함수의 기능은 매우 유사 하지만 변수 스코핑은 굉장히 다르게 욺직인다. 복잡한 함수를 구현할 수록 스코핑이 꼬여서 버그가 나는 경우가 많은데 위와 같은 스코핑 원칙을 잘 기억해 두어야 한다.