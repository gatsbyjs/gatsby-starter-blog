---
title: Daily Study Logging18.2 - 정규표현식
date: "2020-05-12T21:14:32.169Z"
description: 정규표현식 메타문자
tags: ["knowledge", "studylog", "regex"] 
---


**WildCard Meta Character**

"." 점 하나다. 
줄바꾸기 문자를 제외한 모든 문자를 의미한다. (줄바꾸는 것 까지 하나의 문자로 인식하게 하려면, single line mode 로 실행 해 준다. 뒤에 s를 붙이면 된다.)

/.ohn/ ==> john과 mobn모두 match가 된다.

.을 와일드 카드가 아니라 문자로 쓰고 싶다면, 이스케이핑을 해줘야 하는데 앞에 \를 하나 붙여 주면 된다.

/Dr. Jazeb => Dr. Jazeb과 Drt Jazeb모두 인식한다. 

/Dr\. Jazeb => Dr. Jazeb만 인식한다.


**Character Set**

"[]" 대괄호다. 대괄호안에 있는 것중 하나와 일치하는 문자를 의미한다


/[cd]ash/ => cash와 dash 모두 매치가 된다. 



**Character Range**

대괄호 안에 들어있는 "-"이다. 해당 범위 안에 있는 문자중 하나와 일치하는 것을 의미한다. 

/[a-z]/ => a부터z까지 모든 알파벳 중 하나, 
/[a-zA-Z] => 모든 알파벳 대소문자 
/[0-9]/ => 모든 숫자



대괄호 안에 들어 있는건 하나의 문자에 대해서만 적용됨을 잊지 말자. 


**Not Symbol**

대괄호 안에 "^"이 있으면 그것을 제외하고 라는 말이 된다. 

/[^absd]/ => absd를 제외한 모든 문자


