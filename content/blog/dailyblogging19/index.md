---
title: Daily Study Logging19 - 정규표현식
date: "2020-05-13T21:14:32.169Z"
description: 정규표현식 메타문자 이스케이핑
tags: ["knowledge", "studylog", "regex"] 
---


메타문자는 정규표현식 안에서 사용할수 없다. 다른의미를 가지기 때문이다. 


이스케이핑을 하는 방법은 쉽다. 백슬래시 \를 붙여 주면 된다. 

예를들어 파일명을 정규현식으로 사용하기 위해서는 

C:\Users\Jesse\Document\student.txt

==> /C\:\\Users\\Jesse\\Documents\\student\.txt

와 같이 써야 한다.
