---
title: Daily Study Logging13 - 카카오 2019 BLIND 블록게임, 파이썬
date: "2020-05-05T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42894)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/4fc850a7c45bd50a64719f3df321aa324a980752)

이전에는 풀다가 지쳐서 포기한 문제 였지만, 다시 프레시한 마음으로 도전하니 해결 할 수 있었다. 

무려 100줄의 코드 지만 일단 통과 했다는 점에 의미를 둔다. 나의 풀이 로직은 간단했는데, 막상 구현 하다보니 100줄이 넘는 코드가 탄생했다. 

나의 아이어는 맨 위부터 검은 블록을 두개씩 떨어뜨리고 블록이 터지는 것을 기록한뒤 다시 검은 블록을 떨어뜨리기를 반복 하는 것이다. 더이상 블록이 터지지 않을 경우 반복을 종료한다. 

어떤 블록이 터지는지를 판별하는 방법을 생각해 내기 위해서 고심 끝에 내린 결론은 블록이 터지는 패턴을 모두 검사해 보고 패턴에 일치하는 경우 터트리는 것 이었다. 블록이 터질 수 있는 모양은 5가지 밖에 없었기 때문에 이러한 구현을 할 수 있었다. `isPattern`1~5 를 보면 증복되는 코드가 많아 분명 뭔가 더 효율적으로 짤 수 있었을 것이라는 생각이 남는 코드다. 

이렇게 실제 좌표를 리스트로 나타내서 순회하는 경우에 범위 제한을 설정해 주는 것이 상당히 성가시기 때문에 전체 배열을 0두줄로 감싸 줬다. 이렇게 하면 Index Out of Range 오류를 사전에 막을수 있어 효율적이다. 

이전에는 풀수 없었지만, 지금은 풀수 있는 이유가 무엇일까 생각해 봤더니, 기능별로 다른 역할을 하는 함수를 쪼개서 만들 생각을 했기 때문인 것 같다. 큰 문제를 작은 문제 여러개로 쪼개는 감이 어느정도는 생긴듯 해 뿌듯한 느낌이 들었다. 


```python
import copy
answer = 0
newBoard = []
def makeitRain(newBoard):
    tmpBoard = copy.deepcopy(newBoard)
    for j in range(2, len(tmpBoard)-2):
        n = 0
        m = j
        while tmpBoard[n+1][m] == 0:
            n += 1
            if n == len(tmpBoard)-1:
                break
        tmpBoard[n][m] = "g"
        tmpBoard[n-1][m] = "g"
    return tmpBoard

def popCheck(tmpBoard):
    global answer
    flag = True
    for i in range(2, len(tmpBoard)-2):
        for j in range(2, len(tmpBoard)-2):
            if tmpBoard[i][j] != 0 and tmpBoard[i][j] != "g":
                if isPattern1(i, j, tmpBoard):
                    answer += 1
                    flag = False
                if isPattern2(i, j, tmpBoard):
                    answer += 1
                    flag = False
                if isPattern3(i, j, tmpBoard):
                    answer += 1
                    flag = False
                if isPattern4(i, j, tmpBoard):
                    answer += 1
                    flag = False
                if isPattern5(i, j, tmpBoard):
                    answer += 1
                    flag = False
    if flag:
        return False
    else:
        return True

def isPattern1(i, j, tmpBoard):
    global newBoard
    # ⌞ 눞혀서
    colorNumber = tmpBoard[i][j]
    if tmpBoard[i][j+1] == "g" and   tmpBoard[i][j+2] == "g" and tmpBoard[i+1][j] == colorNumber and tmpBoard[i+1][j+1] == colorNumber and tmpBoard[i+1][j+2] == colorNumber:
        newBoard[i][j] = 0
        newBoard[i][j+1] = 0
        newBoard[i][j+2] = 0
        newBoard[i+1][j] =0
        newBoard[i+1][j+1] = 0
        newBoard[i+1][j+2] = 0
        return True

    return False
def isPattern2(i, j, tmpBoard):
    # ⌏ 눞혀서
    global newBoard
    colorNumber = tmpBoard[i][j]
    if tmpBoard[i][j-1] == "g" and   tmpBoard[i][j-2] == "g" and tmpBoard[i+1][j] == colorNumber and tmpBoard[i+1][j-1] == colorNumber and tmpBoard[i+1][j-2] == colorNumber:
        newBoard[i][j] = 0
        newBoard[i][j-1] = 0
        newBoard[i][j-2] = 0
        newBoard[i+1][j] =0
        newBoard[i+1][j-1] = 0
        newBoard[i+1][j-2] = 0
        return True

    return False


def isPattern3(i, j, tmpBoard):
    # ⌞ 세워서
    global newBoard
    colorNumber = tmpBoard[i][j]
    if tmpBoard[i][j+1] == "g" and   tmpBoard[i+1][j+1] == "g" and tmpBoard[i+1][j] == colorNumber and tmpBoard[i+2][j] == colorNumber and tmpBoard[i+2][j+1] == colorNumber:
        newBoard[i][j] = 0
        newBoard[i][j+1] = 0
        newBoard[i+1][j+1] = 0
        newBoard[i+1][j] =0
        newBoard[i+2][j] = 0
        newBoard[i+2][j+1] = 0
        return True

    return False


def isPattern4(i, j, tmpBoard):
    #  ⌏ 세워서
    global newBoard
    colorNumber = tmpBoard[i][j]
    if tmpBoard[i][j-1] == "g" and   tmpBoard[i+1][j-1] == "g" and tmpBoard[i+1][j] == colorNumber and tmpBoard[i+2][j] == colorNumber and tmpBoard[i+2][j-1] == colorNumber:
        newBoard[i][j] = 0
        newBoard[i][j-1] = 0
        newBoard[i+1][j-1] = 0
        newBoard[i+1][j] =0
        newBoard[i+2][j] = 0
        newBoard[i+2][j-1] = 0
        return True

    return False
def isPattern5(i, j, tmpBoard):
    # ㅗ 모양
    global newBoard
    colorNumber = tmpBoard[i][j]
    if tmpBoard[i][j-1] == "g" and   tmpBoard[i][j+1] == "g" and tmpBoard[i+1][j] == colorNumber and tmpBoard[i+1][j+1] == colorNumber and tmpBoard[i+1][j-1] == colorNumber:
        newBoard[i][j] = 0
        newBoard[i][j-1] = 0
        newBoard[i][j+1] = 0
        newBoard[i+1][j] =0
        newBoard[i+1][j+1] = 0
        newBoard[i+1][j-1] = 0
        return True

    return False



def solution(board):
    global newBoard
    newBoard = [[0 for _ in range(len(board)+4)] for _ in range(len(board)+4)]
    # 0처리를 안하기 위해 padding을 넣어줌
    originboard = copy.deepcopy(board)
    for i in range(len(originboard)):
        for j in range(len(originboard)):
            newBoard[i+2][j+2] = originboard[i][j]

    while True:
        tmpBoard  = makeitRain(newBoard)
        if popCheck(tmpBoard) == False:
            break

    return answer
```