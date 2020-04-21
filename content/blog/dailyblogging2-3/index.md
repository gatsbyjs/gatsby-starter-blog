---
title: Daily Study Logiing2.3 - 2018 KAKAO BLIND 압축, JS
date: "2020-04-20T12:40:32.169Z"
description: 프로그래머스 DP
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/17684)


[커밋 로그](https://github.com/Jesscha/algorithmsolutions/commit/a433dbd5fccc470bb4d512340e7905865387bbf8)

자바스크립트로 코딩테스트를 봐야 할 일이 생겨서 자바스크립트로 카카오 기출 문제를 풀었다. 

일단 답을 맞추기는 했지만, 자바스크립트로 웹개발 말고 알고리즘을 푼 것은 처음이기에 다른 사람의 풀이를 보면서 얻어 배울게 있는지 알아 보았다. 


#### 첫코드
```javascript
function solution(msg) {
    const alphas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const ans = [] 
    let txtlen = 1
    let textbefore
    for(let i = 0; i< msg.length; i++){
        if (txtlen !== 1 ){
            txtlen -=1
            continue
        }
        let text = msg[i]
        let ii = i 
        while (alphas.includes(text)){
            ii += 1 
            textbefore = text
            text += msg[ii]
        }
        ans.push(alphas.indexOf(textbefore)+1)
        alphas.push(text)
        txtlen = textbefore.length
    }
    return ans;
}

console.log(solution("KAKAO"))
```

풀이의 로직은 간단하다. 

1. 각 글자별로 순회를 돌린다.
2. 그 글자가 이미 알파벳에 들어 있으면, 그 글자의 다음글자 까지 합한 글자도 알파벳 리스트에 들어 있는지 확인한다. 
3. 더이상 다음 글자를 합친 글자가 알파벳 리스트에 들어 있지 않을 때까지 이를 반복한다. 
4. 반복이 끝나면 마지막에 합쳐진 글자에서 마지막 글자를 뺀 것의 인덱스 번호를 답에 붙인다. 
5. 마지막에 합쳐진 글자를 알파벳 리스트에 더한다. 

로직은 틀리지 않았고 문제도 맞았지만 뭔가 내가 짠 코드가 만족스럽지 않았다. 

#### 다시 쓴 코드 
```javascript
function solution(msg) {
    const alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    const ans = [] 
    while(msg) {
        let temp = '';
        for ( i = 0; i< msg.length; i ++) {
            temp = msg.slice(0, i+1);
            if (alphas.indexOf(temp)=== -1){
                ans.push(alphas.indexOf(temp.slice(0,temp.length-1))+1);
                break
            }
            if (i === msg.length -1 ){
                ans.push(alphas.indexOf(temp.slice(0,temp.length))+1);
            }
        }
        alphas.push(temp);
        msg = msg.slice(i)
    }
    return ans;
}

console.log(solution("KAKAO"))

```

나는 문자열을 그대로 유지한 상태에서 인덱스를 앞으로 당겨 가며 구현을 했고 참고한 코드 에서는 문자열을 잘라가면서 구현을 했다는 점에서 가장 결정적 차이가 있는 듯 하다. 

문자열에 split을 쓰면 해당 기호로 나누 어진 문자를 원소로 하는 배열을 반환한다는 것, indexOf에 해당배열에 없는 원소를 넣으면 -1을 반환 한다는 점, slice(i)는 i 부터 뒤까지를 모두 자른다는 점을 새롭게 배웠다. 


~






