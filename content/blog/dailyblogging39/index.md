---
title: Daily Study Logging39 - 프로그래머스 네트워크
date: "2020-06-27T12:13:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"]
---

[출처](https://programmers.co.kr/learn/courses/30/lessons/43162)

```javascript
function solution(n, computers) {
  let answer = 0
  let visit = new Array(n).fill(false)
  let DFS = (computers, i) => {
    if (visit[i]) {
      return
    }
    visit[i] = true

    for (let j = 0; j < n; j++) {
      if (computers[i][j] === 1) {
        DFS(computers, j)
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visit[i]) {
      answer++
      DFS(computers, i)
    }
  }

  return answer
}
```

오랫만에 코딩테스트 볼일이 다시생겨서 알고리즘 문제를 풀어 보았다. DFS와 BFS구현을 위한 사고를 하는게 익숙하지 않아서 한번 정리를 하면서 다시 머리를 살려 놓고자 한다.

문제는 각 노드가 연결된 좌표를 computers 배열에 담아 주고 여기에 서로 연결 되 네트워크가 몇 개 있는지 맞추는 것이다.

dfs이던지 bfs이던지 연결 되어 있는 것들을 한번 순회를 시키고 나서 또 순회를 시킬게 있으면 정답에 개수를 추가하는 방식이다.

DFS를 구현하는 방법을 주저리 주저리 설명하면, 일단 base case로 방문한적 노드를 또 방문하는 순간을 잡는다. 그리고 아직 방문하지 않은 경우에는 컴퓨터의 개수 만큼 for문을 돌리면서, 연결된 지점을 찾는다. 그리고 연결된 지점의 끝까지 타고 들어가면서 visit 처리를 해 준다. 한번의 dfs가 끝나면,연결된 모든 노드는 visit 처리가 되어 있다.
