---
title: Daily Study Logging29 - 정규표현식
date: "2020-06-01T21:14:32.169Z"
description: 정규 표현식의 그룹화
tags: ["knowledge", "studylog", "regex"] 
---

괄호 `()`를 사용하여 정규표현식을 그룹화 할 수 있다. 

그룹을 사용하면 더 읽기 쉬운 정규표현식을 작성할 수 있다. 단 `[]` 안에서는 그룹화를 할 수 없다.

`/(xyz)+/` 는 'xyz', 'xyzxyz'처럼 xyz가 반복 되는 문자열과 매치가 된다. 


`/([a-z]+[0-9]{0,3}) team/` 은 'zero team', 'a334 team' 등과 매치가 된다.

