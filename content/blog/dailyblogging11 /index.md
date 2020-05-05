---
title: Daily Study Logging11 - 프로그래머스 순위, 자바스크립트
date: "2020-05-03T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/49191?language=javascript)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/2c822db07fc486da28ddf674908e9c2a9362062f)

파이썬으로 풀었던 기억으로 그때의 로직을 자바스크립트로 구현해 보았지만, 시간 초과가 발생했다.

자바스크립트 코딩테스트를 위해 연습을 하고는 있지만...역시 알고리즘 문제는 파이썬으로 푸는게 개이득이다. 

## 시간 초과 난 코드
```javascript
function solution(n, results) {

    // 각 선수의 이기고 진 사람을 기록할 set을 담을 array를 만든다. 
    let arrWin = [] 
    for (let i = 0; i < n+1; i++) {
        const wins = new Set()
        arrWin.push(wins)
    }

    let arrLose = [] 
    for (let j = 0; j < n+1; j++) {
        const wins = new Set()
        arrLose.push(wins)
    }
    for (let index = 1; index <n+1; index++){
        for (let re of results){
            let [winner, loser] = re
            // 승부 자체를 기록
            if (winner === index){
                arrWin[index].add(loser);
            }
            if (loser === index){
                arrLose[index].add(winner);
            }
            // 다른 승부를 이식
            for (let a of arrLose[index]){
                for (let aa of arrWin[index] ){
                    arrWin[a].add(aa)
                }
            }
            for (let b of arrWin[index]){
                for (let bb of arrLose[index] ){
                    arrLose[b].add(bb)
                }
            }    
        }


    }
   
    let answer = 0;  
    for (let k in arrWin){
        if (arrWin[k].size + arrLose[k].size ===n-1){
            answer++
        }
    }  

  return answer;
}

console.log(
  solution(8, [[1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [4, 5]])
);

// 승패의 개수가 n-1개 들어 있는 사람의 순위는 정확하게 파악할 수 있다.

// 이를 위한 구현 방법

// 각 번호 별로 이긴 set과 진 set을 만든다.

// for 문을 돌린다. 각 항의 0번째가 1번째를 이기는 것이므로 이를 각기 기록한다.

// 문제는 직접 승부가 아니라 다른 이들과의 승부로 결정되는 것을 기록하는방법

// 누군가에게 졌다면, 그 사람이 이긴 모든 사람은 나를 이긴다.

// 누군가를 이겼다면 그 사람이 진 모든 사람은 나에게 진다.

// 위의 두가지를 기본 원리로 삼아 알고리즘을 짠다.

// 다시 정리하면,
// 1. 이긴 진 자체를 기록
// 2. 이긴 사람의 진 리스트를 진 사람의 진 리스트에 추가
// 3. 진 사람의 이긴 리스트릴 이긴 사람의 이긴 리스트에 추가
// 4. 각 선수의 정보가 업데이트 될 때마다 추가로 갱신 
// 5. 이긴 진 리스트 합처서 개수가 n-1개 이면 count


// 3try 만에 배운 것, 순서가 중요하다. 마지막에 앞의 전적을 업데이트 하는 일이 발생하면 그것과 관련된 다른 승부를 업데이트 할 수 없었다. 
// 4try 적용점. 순서로 깔짝깔짝 고치지 말고 처음부터 완전히 승부를 기록하면 된다고 생각했으나.. 시간초과가 났다.

```
나와 비슷한 접근 이지만 다른 식으로 해결한 사람의 코드에 주석을 달아 보았다. 

```javascript
function solution(n, results){
    let boxers = new Array(n).fill(0);
    boxers = boxers.map(a=> [[],[]]);
    // 각 선수간 이기고 진 결과를 담는다. 
    for (let i = 0; i < results.length; i++) {
        let result = results[i]
        // 각 번호의 1번 자리에는 각 번호 자신이 이긴 선수들을 추가 
        // 각 번호의 0번 자리에는 각 번호 자신이 진 선수를 추가
        boxers[result[0]-1][1].push(result[1])
        boxers[result[1]-1][0].push(result[0])
    }

    let idx = 0;
    //  각 선수별 경기 결과가 상호 결과에 주는 영향을 파악 하기
    while(idx < n){

        for(let i=0;i<results.length;i++){
            let result = results[i];
            let r1 = result[0];
            let r2 = result[1];
            for(let j=0;j<boxers.length;j++){
                let boxer = boxers[j]
                // 지는 리스트
                let b1 = boxer[0]
                // 이기는 리스트
                let b2 = boxer[1]
                // 이미 모든 선수와의 관계가 결정 되어 있으면 무시
                if(b1.length + b2.length == n-1) continue
                //특정 선수가 r2에는 지는데  r1한테는 지는게 기록 되어 있지 않으면 그 선수는 반드시 r1에게 져야 한다. 왜냐면 r2는 r1에게 지기 때문이다.
                if(b1.includes(r2)){
                    if(!b1.includes(r1)) b1.push(r1)
                }
                // 특정 선수가 r1에게는 이기는데 r2한테 이기는게 기록되어 있지 안흥면 그 선수는  반드시 r2에게 이긴다. r1은  r2에게 이기기 때문이다
                if(b2.includes(r1)){
                    if(!b2.includes(r2)) b2.push(r2)
                }
            }
        }
        idx++
    }
    return boxers.filter(a => {return a[0].length + a[1].length == n-1 ? true : false}).length
}
```

위의 코드는 시간초과 없이 통과가 된다. 나의 코드는 for 문이 4번 내려가고 통과한 코드는 3번 내려간다. 삼중 for문이나 사중 for문이나 오랜 시간이 걸리는 것은 매한가지 이지만, 삼중이 사중 보다 더 나은 건 사실이다. 

주된 차이는 초기 상태 지정을 먼저 하고 그걸 바탕으로 각 승부의 영향력을 조사 했다는 점이다. 

나의 코드는 한번에 그걸 다 하려고 해서 더 복잡했고 부 자연 스러웠다. 

교훈이라고 하기는 좀 그렇지만, for문을 가능한 한 nesting하지 않도록 고민을 더 했어야 했다는 생각을 한다. 