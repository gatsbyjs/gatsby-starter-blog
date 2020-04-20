---
title: Daily Study Logiing2 - kakao Blind 2018 방금그곡, 파이썬
date: "2020-04-20T12:40:32.169Z"
description: 카카오 2018 블라인드 채용
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/17683?language=python3)
[커밋 로그](https://github.com/Jesscha/algorithmsolutions/commits/master)

```python

''' 2018 KAKAO BLIND RECRUITMENT [3차] 방금그곡 '''

def hashToOther(melody):
    melody = melody.replace("C#", "Z")
    melody = melody.replace("D#", "X")
    melody = melody.replace("F#", "M")
    melody = melody.replace("G#", "L")
    melody = melody.replace("A#", "P")
    return melody

def solution(m, musicinfos):
    ansset = []
    m = hashToOther(m)
    for idx, musicinfo in enumerate(musicinfos):
        st, ed, mName, melody = musicinfo.split(',')
        playTime = int(ed[:2])*60 + int(ed[3:5]) - int(st[:2])*60 - int(st[3:5])
        melody = hashToOther(melody)
        if len(melody) < playTime:
            melody = melody*(playTime//len(melody)) + melody[:(playTime%len(melody))]
        elif len(melody) > playTime:
            melody = melody[:(playTime%len(melody))]
        else:
            melody = melody
        if m in melody:
            ansset.append([mName, playTime, idx])
    if ansset:
        ansset.sort(key = lambda x: (-x[1], idx))
        return ansset[0][0]
    else:
        return "(None)"

print(solution("ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]))

```

문제를 풀기 전에는 먼저 생각을 해야 한다. 

설명은 굉장히 복잡하지만, 사실은 문자열 포함 여부를 찾는 문제였다. 

두번째 인자에 주어진 재생시간이 곡의 시간보다 긴지 짧은지를 먼저 판단하고, 실제로 재생된 음악 목록을 만든다. 그리고 주어진 m이 실제로 재생된 음악 목록에 들어 있는지를 파악한다. 

있으면 정답 후보군에 추가를 해둔다. 

위의 절차가 끝난 뒤 후보군에 있는 곡들을 길이순, 입력 시간순으로 정렬하여 제일 앞에 있는 원소를 출력하면 된다. 

각각의 코드 블럭을 살펴보자

```python 
def hashToOther(melody):
    melody = melody.replace("C#", "Z")
    melody = melody.replace("D#", "X")
    melody = melody.replace("F#", "M")
    melody = melody.replace("G#", "L")
    melody = melody.replace("A#", "P")
    return melody
```
맨위에 선언한 이 함수는 #이 들어간 멜로디를 하나의 문자로 바꾸기 위함이다. 멜로디의 길이를 젤때는 C#을 2개가 아닌 하나로 카운트 해야 한다. 하지만 그냥 문자로 개수를 새면 C#은 2개가 된다. 이를 위해 문자열에서 #문자들을 전혀 다른 문자 1개로 대체 했다. 


```python
def solution(m, musicinfos):
    ansset = []
    m = hashToOther(m)
    for idx, musicinfo in enumerate(musicinfos):
        st, ed, mName, melody = musicinfo.split(',')
        playTime = int(ed[:2])*60 + int(ed[3:5]) - int(st[:2])*60 - int(st[3:5])
        melody = hashToOther(melody)
```

정답 함수다 맨 위에 ansset은 정답후보를 담는 배열이다. 
주어진 m을 앞서 선언한 함수에 넣어서 # 문자들을 치환한다. 
멜로디에 대해서도 마찬가디로 # 문자들을 치환한다. 

그뒤 주어진 인풋을 시작 시간과 끝시간, 멜로디 부분으로 쪼갠다.

```python
if len(melody) < playTime:
            melody = melody*(playTime//len(melody)) + melody[:(playTime%len(melody))]
        elif len(melody) > playTime:
            melody = melody[:(playTime%len(melody))]
        else:
            melody = melody
        if m in melody:
            ansset.append([mName, playTime, idx])
    if ansset:
        ansset.sort(key = lambda x: (-x[1], idx))
        return ansset[0][0]
    else:
        return "(None)"

```
만약 재생시간이 멜로디 보다 길다면, 그만큼 반복이 되었다는 의미이니 그만큼 멜로디를 추가한다.

적다면 그만큼 덜 되었다는 것이니 그만큼 멜로디를 자른다. 

몫과 나머지를 이용하여 해당 연산을 수행했다. 

그리고 주어진 m이 재생된 멜로디 문자열에 있다면 후보군에 재생시간, 인덱스와 함께 집어 넣는다. 

후보군을, 재생시간은 내림차순으로 인덱스는 오름차순으로 정렬하고 첫번째 요소의 첫번째 요소를 리턴하면 문제가 해결된다. 

만약 anset이 없으면 (None)을 출력한다. 

정답률 40%가 넘는 쉬운 문제여서 수월하게 풀수 있었다. 

풀면서 느낀점중 하나는 문자열 문제를 풀때는 특수한 문자들을 다루기 쉬운 문자로 치환하는 아이디어가 문제를 한층 쉽게 해주는 경우가 자주 있는 것 같다는 점이다. 



