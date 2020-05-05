---
title: Daily Study Logging10 - 프로그래머스 소수 찾기, 자바스크립트
date: "2020-04-30T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42839?language=javascript)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/4b13e0320f2db3e4569e96080e4dd48395ed7732)

파이썬으로는 import permutaiotns 을 하면 되는 간단한 문제였지만.. 자바스크립트로 하려니 permutaions를 직접 구현해야 했다. 프로그래머스의 모범 답안을 참고했다.

```javascript
function solution(numbers) {
    var answer = 0;
    var set = new Set();
    makeNumbers(set , '' , numbers.split(''));
    return set.size;
}

function issosu(num) {
    if( num < 2) return false;
    for (var i =2; i <= num / 2 ; i++) {
        if( num % i === 0) return false;
    }
    return true;
}

function makeNumbers(set , cur, nums) {
    if( nums.length === 0 ) return;
    var clone = nums.slice()
    for (let i in nums) {
        var su = clone.pop();
        var num = Number(cur+su);
        if ( issosu(num)) {
            set.add(num);
        }
        makeNumbers(set, cur+su , clone);
        clone.unshift(su);
    }
}
```

`makeNumbers`는 주어진 숫자로 만들 수 있는 모든 숫자를 만들어서 소수인지 아닌지 핀별하는 함수다. 

인자로는 set과 cur와 nums를 받는다. 

set은 Set객체가 이는 파이썬의 set과 거의 동일한 자료형인 듯 하다. 자료의 순서는 중요하지 않고 증복된 자료는 들어있지 않다.

여러개 경우의 수의 숫자가 만들어지는 가운데, 증복되는 것들을 제외하기 위해 set자료형을 쓴다. 

cur는 주어진 숫자를 의미한다. 이 뒤에 다른 숫자가 붙어서 새로운 숫자가 된다.

nums는 뒤에 붙을 숫자 리스트다.

한줄한줄 살펴 보자 

`if( nums.length === 0 ) return;`  은 재귀함수의 base case다. 더이상 더할 수잇는 숫자가 없는 경우에 종료한다. 

`var clone = nums.slice().reverse();` 넣을수 있는 숫자를 한번 뒤집어서 clone이라는 변수에 저장해 주는 역할을 한다. slice()로 얕은 복사를 한다. 얖은 복사를 해서 사용해야 이전의 배열들과 독립적으로 사용할 수있다.

`for (i in nums) {`  nums의 길이 만큼 아래의 함수를 반복한다. 

`var su = clone.pop();`위에서 복제해서 만든 clone의 맨 뒤의 수를 하나 빼서 su에 저장한다. 

`var num = Number(cur+su);` 맨처음에들어온 수와 colne에서 pop 한 수를 합쳐서 num을 만들고 

`if ( issosu(num)) { set.add(num); }` 소수 판별 함수에 num을 넣어보고 소수인 경우 set에 추가한다. 

`makeNumbers(set, cur+su , clone);`이번 차수 결과가 반영된 set, string으로 넘겨지눈 cur+su, pop으로 길이가 하나 줄어든 clone 을 인자로 넣고 재귀를 수행한다. 

`clone.unshift(su);` 위에서 pop을 한 su를 clone의 맨앞에 다시 넣어준다. 다시 넣어주는 것은 다음 for 문에서는 다시 사용할 수 있는 숫자 리스트를 유지 시켜줘야 하기 때문이다.  그리고 push가 아니라 반드시 unshift를 해야 하는데, push를 하는 경우 제자리에 다시 붙는 거라서 처음과 동일한 연산을 해 버리게 된다. 

unshift로 앞에 붙이면 각 숫자가 처음에 붙도록 할 수 있다.