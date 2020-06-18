---
title: Daily Study Logging33 - nodejs란 뭘까?
date: "2020-06-18T21:14:32.169Z"
description: Anchors
tags: ["knowledge", "studylog", "node"]
---

자바스크립트는 원레 웹에서만 사용할 수 있도록 만들어진 언어였지만, 노드js가 등장한 이후 자바스크립트는 웹 바깥에서도 사용할 수 있는 언어가 되었다.

노드 js는 라이브러리도, 프레임워크도 아니다. 자바스크립트 런타임이다.

런타임이 무엇이냐면, 해당 언어가 수행되는 전반적인 환경을 말한다.

브라우저에서 윈도우 Object나 DOM API를 사용할 수 있는 것은 브라우저 런타임환경에 브라우저 API가 포함되어 있기 때문이다. 이와 마찬가지로 node 역시 하나의 런타임으로, Cluster와 FileSystem API 와 같은 라이브러리를 제공한다.

크롬과 Node.js는 구글으 V8 엔진을 공유하지만 다른 런타임 (크롬과 Node.js)에서 돌아간다고 이해하면 된다.
