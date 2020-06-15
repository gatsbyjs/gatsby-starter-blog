---
title: Daily Study Logging30 - 정규표현식
date: "2020-06-03T21:14:32.169Z"
description: Alternation/Choice
tags: ["knowledge", "studylog", "regex"] 
---

문자 `|` 는 `|`를 기준으로 나누어진 정규 표현식중 하나라도 걸리는 것을 잡아 낸다. 

예를 들어, `/boy | girl/`은 boy, girl과 매치가 된다. 하지만 boygirl은 매치가 되지 않는다.

복잡해 질수록 그룹화 해서 사용해야 명확하게 사용할 수 있다. 

예를 들어, `/I think Korea|America|China will win a world cup 2050/` 이렇게 정규식을 쓰면 해당 정규 식은 I think Korea, America, China will win a world cup 2050 중 하나와 매치가 된다. 

`/I think (Korea|America|China) will win a world cup 2050/` 이와 같이 작성해야 I think Korea will win a world cup 2050 등과 매치가 된다. 



