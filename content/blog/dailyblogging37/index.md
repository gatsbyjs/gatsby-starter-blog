---
title: Daily Study Logging35 - node js로 JSON 파일 만들기
date: "2020-06-23T21:14:32.169Z"
description: JSON데이터 파일 만들기
tags: ["knowledge", "studylog", "node"]
---

노드 JS로 JSON 파일 만들기를 해보자.

자바스크립트 객체는 키-벨류 형태로 값을 저장할 수 있다. 이러한 형태를 JSON(JavaScript Object Notation)이라고 한다.

```javascript
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
}
```

노드의 fs API를 통해서 JSON 파일을 만들고 지울 수 있다. `fs.writeFileSync`를 사용하면 된다. 이 API는 없으면 파일을 새로 만들고 있으면 내용을 수정한다. 첫 번째 인자에는 파일명과 확장자를, 두번째 인자로는 파일의 내용이 될 인자를 넣는다.

```javascript
fs.writeFileSync("1-json.json", dataToAdd)
```

JSON파일을 만들기 위해서는 역설적으로 그 안에 들어가는 데이터를 스트링화 해주어야 한다. `const bookJSON = JSON.stringify(book);` 처럼 스트링화 한 뒤 `fs.writeFileSync("1-json.json", bookJSON)` 같이 데이터를 집어 넣는다.

그러면 현재 디렉토리 하에 JSON 파일이 생성된 것을 확인할 수 있다.
