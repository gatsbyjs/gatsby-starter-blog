---
title: Daily Study Logging35 - npm yargs 활용하기
date: "2020-06-20T21:14:32.169Z"
description: NMP 라이브러리 yargs를 사용하여 argument parsing을 해보자
tags: ["knowledge", "studylog", "node"]
---

yargs는 커멘드라인에서 수행되는 작업을 돕는 노드 라이브러리다.

커맨드 라인으로 주어진 명령을 인자로 바꾸어 주는 역할을 한다.

app.js 라는 파일이 아래와 같이 구성되어 있다고 하자

```javascript
const yargs = require("yargs")

//create add command
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function(argv) {
    console.log("Title: " + argv.title)
    console.log("Body: " + argv.body)
  },
})
```

이 상대태에서 커맨드 라인에 `node app.js add --title="title" --body="body"`를 입력하면,

Title: title  
Body: body

과 같은 결과를 얻게 된다. 커맨드라인으로 주어진 값을 함수에 담을 수 있는 것이다.

구체적으로 설정을 살펴보자

`command`는 명령어를 가르킨다. 실행되는 파일명 뒤에 붙어서 어떤 명령을 수행할지를 알려준다. `describe`는 이게 어떤 명령인지 설명하는 역할인데, help 커멘드를 쓰거나 에러가 났을 때 이 설명이 나온다.

`builder`는 argv(arguments vector의 약자)객체에 들어갈 키 값을 설정하는 역할을 한다.

`title`이라는 키 값의 설명 `describe`, 필수인지를 설정하는 `demandOption`, 어떤 타입의 인풋을 받아야 하는 지 정하는 `type` 이 주로 사용되는 설정이다.
