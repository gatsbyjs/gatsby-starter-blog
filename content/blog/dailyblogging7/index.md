---
title: Daily Study Logiing7 - react, redux
date: "2020-04-27T13:09:32.169Z"
description: 리액트로 쇼핑몰 만들기 - 페이지를 새로 고침해도 아이템이 남아 있게 하기 
tags: ["knowledge", "studylog", "react"] 
---
[커밋로그](https://github.com/Jesscha/react-shoppingmall/commit/e03cb7de3cb23272bb348397ac101a0702231b1f)


현재 내가 만든 쇼핑몰은 새로고침을 사용하면 카트에 담긴 아이템이 모두 초기화 되는 문제를 가지고 있었다. 

아이템을 세션 스토리지나 로컬 스토리지에 저장하면 이와 같은 문제를 해결 할 수 있다. 

로컬 스토리지와 세션 스토리지는 새로고침을 해도 데이터를 갱신하지 않기 때문이다. 

세션 스토리지는 브라우저를 닫을 때까지 유지되고 로컬 스토리지는 따로 지우기 전까지는 유지 된다.

리덕스에서는 state를 로컬 스토리지나 세션 스토리지에 저장할 수 있는 모듈을 제공해 준다.

`redux-persist`가 바로 그것이다.오늘은 이 모듈을 사용해서 카트 아이템을 로컬 스토리지에 저장하여 새로고침을 하더도 카트 아이템이 남아있는 기능을 추가하도록 하겠다. 

제일 먼저 해야 하는 것은 

`yarn add redux-persist` 명령어를 사용하여 모듈을 설치해 준다. 

그 뒤 몇 가지 세팅을 하면 쉽게 스토리지를 이용할 수 있다. 

제일 먼저 수정해야 하는 것은 `store.js`다.

```javascript
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
```

`import { persistStore } from "redux-persist";`로 persistStore를 불러 온다. 


`export const store = createStore(rootReducer, applyMiddleware(...middlewares));` 는 미들웨어가 전체 앱의 상태변화를 파악하고 리듀서에게 넘겨주는 역할을 한다. 원래부터 있던 세팅이다. 

`store`를 `persistStore`로 감싸 주면 reduxpersist를 사용할 준비가 된다.

이제 `root-reducer.js`에서 몇가지 수정을 해준다. 

`import { persistReducer } from 'redux-persist';`   
`import storage from 'redux-persist/lib/storage';`
두가지를 임포트 한다. 처음 것은 redux persist를 사용하기 위해 persistReducer를 불러온다. 그뒤 상태가 저장될 곳을 정한다. 그냥 storage로 두면 로컬 스토리지가 되고, 세션 스토리지를 사용하려면, 세션 스토리지 사용법을 문서에서 다시 찾아 봐야 한다. 

그뒤 어떤 state를 로컬스토리지에 저장할지를 정하기 위해 Config를 만든다. 

```javascript
const persistConfig= {
    key: 'root',
    storage,
    whitelist: ['cart']
}
```
key는 root로 주고 저장할 장소, 그리고 whitelist 에 로컬에 저장할 state를 넣는다.

리덕스에서 관리되던 상태는 user와 cart두가지 였는데, user는 firebase에서 관리해 주기에 cart만을 넣는다.

`export default persistReducer(persistConfig, rootReducer)`여기에 담아서 export를 해 준다. 

마지막으로 `index.js`로 간다. 

![](/img0.png)


Router안에 PersistGate를 만들어서 persistor를 인자로 넘겨 주면 세팅은 끝난다. 

이제 cartReducer를 통하는 state는 로컬 state에 저장된다. 새로고침을 해도 브라우져를 껐다 켜도 카트에 상품이 남아 있다. 
