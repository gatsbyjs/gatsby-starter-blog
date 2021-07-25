---
title: Promise 여러개 동시에 쓰는 법
date: "2021-07-25T12:40:32.169Z"
description: Promise.all을 알아보자
tags: ["promise"]
---

자바스크립트를 쓰다 보면 `Promise` 라는 것을 종종 사용하게 된다. 사실 자바스크립트를 처음 시작하면 이 `Promise` 에 대한 감을 잡기가 어렵긴하다.( `Promise` 를 제대로 이해 하려면 MDN문서를 참고하길 권장 드린다.)

오늘 이 글에서 하고 싶은 이야기는 `Promise`를 더 효과적으로 활용하는 것에 대한 이야기다.

클라이언트와 서버는 적개는 몇개, 많개는 수십개의 ajax 통신을 한다. `Promise` 를 쓰면 이를 효과적으로 구현할 수 있다.

## 서로 의존적이지 않은 AJAX call의 효율적 구현

이 각각의 통신은 이전 통신에 의존할수 있고 아닐수도 있다.

예를 들어 현재 요청을 하고 있는 클라이언트의 계정 상태에 따라서 다른 응답이 돌아와야 하는 경우가 있을 수 있다. 해당 계정의 타입이 무엇인지를 서버에서 불러 온뒤 그 타입에 해당하는 컨텐츠를 다시 요청 하는 경우가 그렇다.

반면에 클라이언트의 계정 타입을 불러오는 요청과, 유저 상관없이 등장하는 컨텐츠를 불러오는 요청은 아무 상관이 없다.

일반적으로 우리에게 친숙한 `async` `await` 을 써서 구현하면 아래와 같은 구현이 될 수 있겠다.

마지막 `console.log`는 이 데이터를 바탕으로 화면을 출력 하는 것 이라고 상상해 보자.

각 응답에 1초 씩 걸리도록 해 두었으니 총 3초 뒤에 응답을 가져오게 된다.

```javaScript
const callUserInfo = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve("super user")
    }, 1000)
  )

const callUserContent = userType =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(`${userType} Content`)
    }, 1000)
  )

const callNormalContent = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve("normal Content")
    }, 1000)
  )

const init = async () => {
  const userType = await callUserInfo()
  const userContent = await callUserContent(userType)
  const normalContent = await callNormalContent()

  console.log(`
    유저 타입: ${userType}
    유저 컨텐츠 : ${userContent}
    일반 컨텐츠 : ${normalContent}
    `)
}

init()
```

여기서 좀 생각해 보면, 이 요청은 반드시 3초가 걸릴 필요가 없는 요청이라는 것을 알 수 있다.

굳이 `callNormalContent`는 독립적이기 때문에, 굳이 순서를 지킬 필요가 없다.

이때 활용할 수 있는 장치가 `promise.all` 이다.

```javaScript
const callUserInfo = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve("super user")
    }, 1000)
  )

const callUserContent = userType =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(`${userType} Content`)
    }, 1000)
  )

const callNormalContent = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve("normal Content")
    }, 1000)
  )

const init = async () => {
  let userType
  let userContent
  let normalContent
  const promiseAllValue = await Promise.all([
    callUserInfo()
      .then(type => {
        userType = type
        return callUserContent(type)
      })
      .then(content => {
        userContent = content
        return content
      }),
    callNormalContent().then(content => {
      normalContent = content
      return content
    }),
  ])

  console.log(promiseAllValue) // [ 'super user Content', 'normal Content' ]

  console.log(`
    유저 타입: ${userType}
    유저 컨텐츠 : ${userContent}
    일반 컨텐츠 : ${normalContent}
    `)
}

init()
```

(리팩터링 할 여지는 아직 많지만..)`Promise.all` 의 인자로 `Promise` 가 담긴 배열을 넘기면, 안에 들어 있는 프로미스가 모두 완료 되면 그 안의 값을 반환한다.

`Promise.all` 을 사용하지 않는 코드는 위의 작업에 약 3초 가량이 소모된다. 각각의 응답을 기다렸다가 처리하고 있기 때문이다.

반면 `Promise.all` 을 쓰고 있는 코드는 2초 가량이 소모 된다. 의존관계가 없는 요청들이 서로를 기다리고 있지 않기 때문이다.

`async/await` 을 쓰지 않고 `Promise` 만 써도 위와 동일한 기능을 하는 코드를 구현 할 수도 있지만, `Promise.all` 을 사용하는 것이 훨씬 간결한 코드를 만들어 준다.
