---
title: Daily Study Logging47 - [번역]React hooks를 쓰면 Redux를 안써도 될까?
date: "2020-07-14T12:13:32.169Z"
description: hooks는 Redux의 대체제가 아니다.
tags: ["react", "studylog"]
---

이 글은 Max González 의 [Stop Asking if React Hooks Replace Redux](https://medium.com/swlh/stop-asking-if-react-hooks-replace-Redux-448c54d79551) 를 번역(의역) 및 요약한 글 입니다.

---

결론부터 말하자면, 아니다. hooks는 Redux를 대체하지 않는다.

## Redux는 처음부터 선택사항 이었다.

Dan Abramov에 글 [you might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-Redux-be46360cf367)에서 말하는 것처럼 당신의 앱에는 Redux가 애시당초 필요하지 않을 수 있다. 당신이 사용하지 않았던 것을 대체할 필요는 없다.

Redux는 자바스크립트 라이브러리다. 당신이 React라는 자바스크립트 라이브러리를 사용할때 같이 사용하는 다른 자바스크립트 라이브러리인 것이다. 당신의 프로젝트에 라이브러리를 사용하는 것은 번들사이즈를 증가 시킨다. 그 결과 앱 로딩 속도가 늦어질수 있다. 그러니 필요가 없는 라이브러리를 당신의 프로젝트에 추가해서는 안된다.

hook이 rdux를 대체하는지 묻는 사람들은 둘중 하나를 꼭 사용해야 한다고 믿는 경향이 있다. 사실이 아니다. 만약 당신의 앱이 저장해야할 state를 많이 가지고 있지 않거나 컴포넌트의 구조가 단순해서 prop drilling을 하지 않아도 될 정도라면 상태 관리 라이브러리를 쓸 필요가 없다. 이런 앱에는 React가 기본적으로 제공하는 기능이면 충분하다. hook이 있던지 없던지 상관없이 말이다.

심지어, 거대한 어플리케이션 스테이트나 복잡한 React 컴포넌트 구조를 가지고 있는 프로젝트에서도 상태관리 라이브러리를 반드시 써야 하는 것은 아니다. prop drilling은 귀찮을수 있지만 plain React는 다양한 상태 관리 옵션을 제공해준다. hooks는 상태를 더 클린하게 관리할 수 있도록 돕는다. Redux는 경량 라이브라리이다. 하지만 셋업하기 복잡하고 번들사이즈를 늘리는 등 다양한 trade-off를 감내해야 한다. Redux를 쓰지 않아야 할 타당한 이유는 많다. 당신은 항상 Redux를 써야 하는 것은 아니다.

그렇지만, Redux를 사용해야 하는 이유 또한 많다. 만약 당신의 프로젝트가 Redux를 시작부터 사용했다면 그만한 이유가 있을 것이다. 미들웨어, 디버깅 툴, single source of truth 등이 필요했을 수 있다. 만약 Redux를 사용해야할 좋은 이유가 있다면 hooks가 그 이유를 없애지는 않을 것이다. 만약 당신이 이전에 Redux가 필요했다면 아마 아직도 필요할 것이다. 그 이유는 바로...

## hooks 와 Redux는 같은 문제를 풀려고 하지 않기 때문이다.

Redux는 상태관리 라이브러리이다. hooks는 React의 업데이트된 기능중 하나로, functional component가 class component가 하던 모든 일을 할 수 있게 해준다.

그렇다면 왜 class 없이 react를 쓸 수 있게 해주는 기능이 상태관리 라이브러리를 쓸모 없게 만드는 걸까?

**상태관리 라이브러리를 쓸모 없게 만들지 않는다.**

React 공식[문서](https://reactjs.org/docs/hooks-intro.html)에 의하면, React hooks는 세가지 주요한 이유때문에 만들어졌다.

- 클래스 컴포넌트간 logic 재사용이 힘들다.
- 라이프사이클 메서드는 헛갈리고 관계없는 로직을 포함하는 경우가 있다.
- 클래스는 인간과 기계 모두 이해하기 힘들다.

위 세가지 중 어떤 것도 상태 관리와는 관계가 없다.

hooks가 어플리케이션 스테이트를 관리하는 몇가지 옵션을 제공해 주기는 한다. useState, useReducer, useContext 등의 hooks는 이전의 React가 제공해 주던 방식보다 훨씬 조직화된 상태관리를 할 수 있도록 도와준다.

하지만 이런 hooks는 새로운 것도, 마법적인 것도 아니고 상태 관리 라이브러리를 의미 없게 만들지도 않는다. 왜냐하면 ...

## React hooks는 당신의 React app이 이전에 못하던 것을 가능하게 만들어 주지 않는다!

그렇다. 이제 당신은 fucntional componeent로 class component의 기능을 모두 구현할 수 있게 되었다. 하지만, class component가 하지 못하는 것은 하지 못한다. 더 조직화된 코드 구현과 재사용성을 제외하고는 말이다. hooks는 기능을 추가하기 위해 도입된 것이 아니라 개발자 경험을 증대시키기 위해 도입된 것이다.

useState 나 useReducer 는 component state를 다루는 방법이다. class component의 his.state, this.setState 와 동일하게 동작할 뿐이다. 이 메서드를 쓰더라도 prop drill down을 해야 하는 이슈는 여전하다.

사람들은 종종 useContext 가 Redux를 관속에 묻어 버렸다고 생각하는 것 같다. 이를 통해 prop drilling 없이 컴포넌트간 state를 공유할 수 있기 때문이다. 하지만 이 역시 전혀 새로운 것이 아니다. conTexApi는 React의 일부가 된지 꽤 됬다. useContext hook은 그저 \<Consumer> wrapper 없이 컨텍스트를 사용하게 해준 것일 뿐이다. 몇 몇 개발자들은 context를 전체 애플리케이션 상태 관리를 위해 쓰려고 한다. 이것은 context가 디자인된 의도와 맞지 않다. 공식문서에 의하면

> Context는 리액트 컴포넌트 트리에서 글로벌하다고 판단되는 데이터(현재 인증받은 유저나 테마, 선호 언어 등)를 공유하기 위해 설계되었다.

다른 말로 하면, 자주 업데이트 되지 않는 것들을 위한 것이라는 말이다.

문서는 또한, context를 드믈게 사용하라고 권하고 있다. 컴포넌트 재 사용을 더 힘들게 하기 때문이다. 또한 개발자가 주의를 기울이지 않으면 불필요한 rerender를 발생시킬 수 있어 조심해야 한다.

나는 context를 애플리케이션 상태 관리에 성공적으로 사용한 사례들을 많이 보았다. 가능한 일이다. 하지만 context는 상태관리를 위해 디자인 된것은 아니다. 반면에 Redux는 상태관리라는 특정한 목적을 염두에 두고 만들어 졌다.

더욱이 hooks는 Redux의 죽음을 의미하지 않는다. 최근 Redux (업데이트 문서)[https://react-redux.js.org/next/api/hooks]를 읽어보면 알 수 있다.

## Redux역시 hooks를 가지고 있다!

그렇다. React hooks는 Redux 라이브러리를 도우며 Redux의 페인포인트를 해결하려 한다.

(다른 아티클에 더 디테일한 내용을 서술해 놓았다.)[https://medium.com/swlh/clean-up-redux-code-with-react-redux-hooks-71587cfcf87a]여기서는 핵심만 말하겠다. hook등장 이전에는 mapStateToProps와 mapDispatchToProps 함수를 선언해서 사용하고 connect를 사용해 컴포넌트를 감싸며 higher order function을 만들었다. 이를 통해 dispatch function과 Redux store의 스테이트를 props로 넘겨 줄 수 있었다.

간단한 카운터 앱 코드를 한번 보자 ( 너무 간단해서 Redux가 필요없는 예시이지만, 정보 전달을 위해 이정도는 허용해 주도록 하자). Redux store와 increment, decrement action creator를 어딘가 정의해 두었다고 가정하자.(위에 링크된 글에는 전체 코드가 첨부되어 있다.)

```javascript
import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions/actions"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { count, increment, decrement } = this.props

    return (
      <div>
        <h1>The count is {count}</h1>
        <button onClick={() => increment(count)}>+</button>
        <button onClick={() => decrement(count)}>-</button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  count: store.count,
})

const mapDispatchToProps = dispatch => ({
  increment: count => dispatch(actions.increment(count)),
  decrement: count => dispatch(actions.decrement(count)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

얼마나 짜증나는가, higher order component로 감싸지 않고 Redux store에 접근할 수 있다면 좋지 않겠는가? 그게 바로 hook이 할 수 있는 일이다. hooks는 코드 재사용과 higher order component로 만들어진 wrapper hell을 제거 하기 위해 존재한다. 아래 코드는 동일한 기능을 하는 코드를 hooks를 사용해서 구현한 코드다.

```javascript
import React from "react"
import * as actions from "../actions/actions"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  const count = useSelector(store => store.count)

  return (
    <div>
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(actions.increment(count))}>+</button>
      <button onClick={() => dispatch(actions.decrement(count))}>-</button>
    </div>
  )
}

export default App
```

아름답지 않은가? useSelctor 는 Redux store의 한 조각을 컴포넌트에서 사용할 수 있게 해준다. useDispatch를 사용하는 것은 매우 간단하다. 단순히 선언하고 사용하는 것을 통해 dispatch function을 통해 Redux store에 업데이트를 보낼 수 있다. 무엇보다도, 더이상 못생긴 mapping function과 connect를 사용하지 않아도 된다. 이제 모든것이 컴포넌트안에 아름답게 들어있다. 훨씬 짧고 읽기 쉬우며 코드를 조직화 하기 좋다. 결국,

## React hooks와 Redux를 경쟁 관계로 바라볼 필요가 없다.

분명히, 이 두가지 기술은 멋지게 서로를 상호보완한다. React hooks는 Redux를 대체하지 않는다. 단지 React 앱을 더 잘 구성할 수 있는 방법을 제공하고, Redux를 사용한다면 더 잘 연결됱 컴포넌트를 작성할 수 있게 해 주는 것이다.

그러니 더이상 "hooks 가 Redux를 대체하나요?" 같은 질문을 하지 않길 바란다.

대신, 스스로에게 어떤 앱을 만들고 있는지 어떤 상태관리가 필요한지, Redux가 필요한지, 어떻게 하면 여러 기술들을 조화롭게 사용할수 있을지에 대해서 물어보아라
