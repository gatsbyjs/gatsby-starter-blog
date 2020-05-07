---
title: Daily Study Logging15 - 카카오 2019 겨울인턴 크레인 인형뽑기 게임, 자바스크립트
date: "2020-05-07T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/64061#)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/92af0d8639da5f81c120324286255b96af915bf9)

자바스크립트 코테를 위한 손풀기 연습 삼아 풀어 보았다. 

while문을 사용하여 0 이 아닌 곳 까지 내려가고, 처음만난 0이 아닌 숫자를 바스켓에 넣는다. 

다음에 들어오는 숫자가 바스켓에 들어있는 마지막 숫자와 같다면, 바스켓의 마지막 숫자를 pop 하고 카운트를 2 추가 한다.  아니라면 바스켓에 숫자를 추가한다. 

이 과정을 반복 후 cnt를 리턴해 주면 끝 

```javascript
function solution(board, moves) {
    let basket = []
    let cnt = 0 

    for (let m of moves){
        let d = 0
        let flag = true
        while (board[d][m-1] == 0){
            d++
            if (d === board.length){
                flag =false
                break
            }
        }
        if (flag){
            let doll = board[d][m-1]
             board[d][m-1] = 0
            if (basket[basket.length-1] === doll){
                basket.pop()
                cnt += 2
            }else{
                basket.push(doll)
            }
        } 
    }
    return cnt;
} 
```
