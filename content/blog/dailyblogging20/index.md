---
title: Daily Study Logging20 - 정규표현식
date: "2020-05-14T21:14:32.169Z"
description: character Set 내에서의 escaping
tags: ["knowledge", "studylog", "regex"] 
---


"[]" 은 정규표현식에서 Character Set을 의미한다. 하나의 문자와 일치하는지 아닌지를 판별하는 표현식이다. 


이 Character Set안에서 Escaping해야할 문자는 4가지가 있다. 

-, /, *, ] 이다. 

어떤 한 문자가 위의 문자들 중 하나와 일치하는지 알고 싶다면 

/[\-\/\*\]]/ 처럼 정규식을 작성해 주어야 한다. 

다른 메타문자에 대해서는 Character Set안에서는 신경 쓸 필요 없다.