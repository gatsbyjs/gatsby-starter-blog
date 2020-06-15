---
title: Daily Study Logging31 - 정규표현식
date: "2020-06-15T21:14:32.169Z"
description: Nested Alternation
tags: ["knowledge", "studylog", "regex"] 
---


Alternation을 nesting하여 사용할수도 있다. 

`/(usa|korea) likes blue (china/russia) likes red/`라는 표현식을 살펴보자. 

각 나라 이름에 맞춰서 경우와 매치를 시킬 것이다. (ex, usa likes blue china likes rds)

이렇게 하는 대신에 파란색을 좋아하는 나라만 매치가 되거나 빨간색을 좋아하는 나라만 매치가 되도록 하고 싶으면 어떻게 할까? 

Alternation을 nesting하면 된다. 

`/((usa|korea) likes blue | (china/russia) likes red)/` 그루핑을 해주고 가운데에 Alternation 표시를 해주면 된다. 

이렇게 표현식을 써주면 파란색을 좋아하는 나라나 빨간색을 좋아하는 나라 둘중하나에만 매치가 된다.

