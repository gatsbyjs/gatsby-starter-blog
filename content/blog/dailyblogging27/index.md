---
title: Daily Study Logging27 - Pure function in Functional Programming
date: "2020-05-24T21:14:32.169Z"
description: meaning of Pure function
tags: ["knowledge", "studylog", "FP"] 
---

Functional Programming에서 Pure Function은 2가지 특징을 가진다. 


1. 같은 인풋에 대해서 항상 같은 값을 리턴한다. 

    이러한 특성 덕분에 pure function은 값이 예측 가능하여 디버깅 하기도 쉽고 function 끼리 연계하여 사용하기도 좋다.

    ```javascript

    function mutipluByTwo(num) {
        return num * 2 
    }
    ```

    위와 같은 함수은 파라메터로 특정 값이 들어가면 같은 결과가 나온다. 2를 넣으면 항상 4가, 3을 넣으면 항상 6이 나온다.



2. 함수 바깥의 요소에 영향을 주지 않는다

    pure function안에서 일어나는 일은 바깥 세상에 영향을 주지 않는다. 이러한 특성 때문에 pure function은 독립적으로 이용 될 수 있다. 

    ```javascript

    const array = [1,2,3]

    function popLaste(arr){
        arr.pop()
        return arr
    }
    ```
    위의 함수는 pure 하지않다. 전역 변수인 array에 영향을 주고 있기 때문이다.


    ```javascript

    const array = [1,2,3]

    function popLaste(arr){
        const newArr = arr.slice()
        newArr.pop()
        return newArr
    }
    ```
    위의 함수는 pure 하다. array를 그대로 두고 복사한 객체인 newArr의 값을 변화 시켰기 때문이다.
