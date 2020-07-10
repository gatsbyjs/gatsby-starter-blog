---
title: Daily Study Logging45 - useState와 useReducer 어느것을 써야 할까?
date: "2020-07-10T12:13:32.169Z"
description: useState와 useReducer
tags: ["react", "studylog"]
---

react hooks를 공부하다보면 매우 비슷한 기능을 하는 것 같은 hooks를 만날 때가 있다. 바로 useState와 와 useReducer 이다.

두 hooks모두 컴포넌트의 state를 바꾸는데 사용되고 코드만 잘 짜면 서로의 기능을 서로가 대체 할 수 있다.

하지만 분명 둘중 하나를 골라 사용하는 편이 더 좋은 상황이 있다. 결론부터 이야기하자면 **컴포넌트의 state가 다른 state에 영향을 주지 않고 독립적으로 욺직이면, useEffect를 쓰는것이 더 깔끔한 코드를 짤 수 있다.** 반면에,
**컴포넌트의 state의 변화가 해당 컴포넌트의 다른 state에 영향을 주거나 받는 경우 useReducer를 사용하는게 더 깔끔한 코드를 짤 수 있다.**

이 글에서 사용하는 예시는 Kent C. Dodds의 [블로그 포스팅](https://kentcdodds.com/blog/should-i-usestate-or-usereducer) 코드 예제를 사용했다.

## useState가 더 유리한 경우

여기 useDarkMode라는 custom hook이 있다.

```javascript
function useDarkMode() {
  // 해당 브라우저의 테마가 dark 인지 light 인지 구분하는 쿼리로 사용하기 위한 변수
  const preferDarkQuery = "(prefers-color-scheme: dark)"
  const [mode, setMode] = React.useState(
    // 로컬스토리지에 담긴 정보나 브라우저 설정을 읽어 초기값을 정한다.
    () =>
      window.localStorage.getItem("colorMode") ||
      // 설정이 dark이면 mathes는 true가 light 이면 false 가 된다.
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light")
  )

  // 윈도우 객체의 모드가 변함에 따라 mode state를 바꾼다.
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setMode(mediaQuery.matches ? "dark" : "light")
    // mediaQuery의 상태가 변할 때 마다 handleChange 가 호출된다.
    mediaQuery.addListener(handleChange)
    // 컴포넌트가 언마운트 될때 상태변화 관찰을 멈춘다.
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  // 모드가 변하면 로컬 스토리지에 모드를 저장해 놓는다.
  React.useEffect(() => {
    window.localStorage.setItem("colorMode", mode)
  }, [mode])
  return [mode, setMode]
}
```

위의 custom hook을 사용하면 유저가 dark 모드나 ligth모드를 선택할때에 맞춰서 mode를 바꿀수 있다. useState를 써서 구현 되었고, 나름깔끔하게 구현되었다.

useReducer를 써서 동일한 기능을 구현해 보자.

```javascript
const preferDarkQuery = "(prefers-color-scheme: dark)"
// dispatch를 통해 액션이 들어오면 처리하는 방식을 정의하는 것이 reducer의 역할이다.
function darkModeReducer(state, action) {
  switch (action.type) {
    case "MEDIA_CHANGE": {
      return { ...state, mode: action.mode }
    }
    case "SET_MODE": {
      // make sure to spread that state just in case!
      return { ...state, mode: action.mode }
    }
    default: {
      // helps us avoid typos!
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
// use the init function to lazily initialize state so we don't read into
// localstorage or call matchMedia every render
function init() {
  return {
    mode:
      window.localStorage.getItem("colorMode") ||
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light"),
  }
}
function useDarkMode() {
  // useReducer는 2가지 파라메터를 필수로, 3번째 파라메터는 선택적으로 받는다.
  // 첫 번째 파라메터는 액션에 따른 상태 변화를 정의 하는 리듀서, 두번째 파라메터는 초기 스테이트, 세번째 파라메터는 초기 값을 lazy하게 정한다. lazy한 파라메터를 집어 넣는 이유는 초기 상태를 동적으로 정할 수 있기 때문이다.
  const [state, dispatch] = React.useReducer(
    darkModeReducer,
    { mode: "light" },
    init
  )
  const { mode } = state

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    // 이전 코드의 setMode와 비교하면 차이점을 더 명확히 확인할 수 있다.
    // 위에서 setMode 한번으로 끝난던 것에 비해, dispatch를 사용해서 리듀서에 type과 mode를 넘겨준다.
    const handleChange = () =>
      dispatch({
        type: "MEDIA_CHANGE",
        mode: mediaQuery.matches ? "dark" : "light",
      })
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem("colorMode", mode)
  }, [mode])
  // We like the API the way it is, so instead of returning the state object
  // and the dispatch function, we'll return the `mode` property and we'll
  // create a setMode helper (which we have to memoize in case someone wants
  // to use it in a dependency list):
  // setMode라는 함수는 "SET_MODE"타입을 가진 dispatch다.
  const setMode = React.useCallback(
    newMode => dispatch({ type: "SET_MODE", mode: newMode }),
    []
  )
  // 리턴하는 것은 useState를 썼을 때와 같다.
  return [mode, setMode]
}
```

완전히 동일한 기능을 하는 custom hook임에도 불구하고 전자가 훨씬 간단함을 알수 있다. 물론 기존의 redux스타일을 고수 하지 않는다면, useReducer를 저것 보다 더 간단히 쓸 수도 있다. 아래처럼 말이다.

```javascript
function useDarkMode() {
  const preferDarkQuery = "(prefers-color-scheme: dark)"
  const [mode, setMode] = React.useReducer(
    // dispatch의 역할을 하는 setMode의 인자로 주어진게 함수라면 그 함수에 원래 모드를 넣는다. setMode에 인자로 주어진게 함수가 아니면 그 값을 리턴한다. (즉 그 값이 mode가 된다.) 해당 코드에서는 setMode안에 함수가 아닌 스트링을 넣어주고 있다.  이처럼 쓸 수 있는 것은 이 reducer가 처리하는 스테이트가 mode 하나 뿐이기 때문이다.
    (prevMode, nextMode) =>
      typeof nextMode === "function" ? nextMode(prevMode) : nextMode,
    "light",
    () =>
      window.localStorage.getItem("colorMode") ||
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light")
  )
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setMode(mediaQuery.matches ? "dark" : "light")
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])
  React.useEffect(() => {
    window.localStorage.setItem("colorMode", mode)
  }, [mode])
  return [mode, setMode]
}
```

위처럼 쓸 수 있다. 하지만 여전히 useState를 쓰는 편이 훨씬 직관적이고 편하다는 사실은 변하지 않는다.

## useReducer가 더 유리한 경우

아래에 useUndo라는 custom hook이 있다. 한번 실행한 활동을 취소하거나 반복 할 수 있도록 도와주는 hook이다.

```javascript
function useUndo(initialPresent) {
  // 과거와 미래의 활동은 없고, 현재의 활동만 받아서 initailstate로 활용한다.
  const [past, setPast] = React.useState([])
  const [present, setPresent] = React.useState(initialPresent)
  const [future, setFuture] = React.useState([])

  // 과거에 실행한게 있으면 canUndo = true, 미래 작업이 있으면 canRedo = true
  const canUndo = past.length !== 0
  const canRedo = future.length !== 0

  const undo = React.useCallback(() => {
    // 과거의 활동중 최신 활동을 present로 바꾸고 과거의 마지막 작업은 과거에 포함시키지 않는다. 미래는 이전에 현재 였던 것을 추가한다.
    if (!canUndo) return
    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)
    setPast(newPast)
    setPresent(previous)
    setFuture([present, ...future])
  }, [canUndo, future, past, present])
  const redo = React.useCallback(() => {
    // 미래의 활동중 가장 최근 활동을 presentfh 바꾸고 그 작업은 미래에 포함시기지 않는다. 과거에는 현재였던 것을 추가한다.
    if (!canRedo) return
    const next = future[0]
    const newFuture = future.slice(1)
    setPast([...past, present])
    setPresent(next)
    setFuture(newFuture)
  }, [canRedo, future, past, present])

  // set에서 받은 인자를 present로 추가하고 기존의 present는 과거로 옮긴다.
  const set = React.useCallback(
    newPresent => {
      if (newPresent === present) {
        return
      }
      setPast([...past, present])
      setPresent(newPresent)
      setFuture([])
    },
    [past, present]
  )
  // 인자로 받은것만 present로 두고 나머지는 빈 배열로 초기화 한다.
  const reset = React.useCallback(newPresent => {
    setPast([])
    setPresent(newPresent)
    setFuture([])
  }, [])

  // 첫번째 인자로는 결과 값들을, 두번째 인자로는 함수와 조건을 리턴
  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ]
}
```

useState를 써도 아무 문제 없이 코드가 수행될 것만 같다. 그렇다면 아래의 코드를 보자

```javascript
function Example() {
  const [state, { set }] = useUndo("first")
  React.useEffect(() => {
    set("second")
  }, [set])
  React.useEffect(() => {
    set("third")
  }, [set])
  return <pre>{JSON.stringify(state, null, 2)}</pre>
}
```

아래와 같은 출력이 기대되는 코드지만...

```javascript
{
  "past": ["first", "second"],
  "present": "third",
  "future": []
}
```

실제로는 아래와 같은 꼴의 결과물을 얻게 된다.

```javascript
{
  "past": [
    "first",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "second",
    "third",
    "... this goes on forever..."
  ],
  "present": "third",
  "future": []
}
```

set 함수는 useCallback을 사용하여, past와 present를 디펜던시로 가지고 있다. `set('second')`는 present와 past를 변화 시키고 set을 변화시킨다. `set('third')`도 마찬가지다. 이들이 일으킨 변화는 set을 계속 변화시키고 계속해서 useEffect안에 있는 함수가 호출되게 만든다.

useState를 사용하는 상태에서 위의 코드를 먼저 고쳐보자

```javascript
function useUndo(initialPresent) {
  // past, preset, future가 하나의 object로 묶였다. 다른 프로퍼티를 참고하는 함수를 사용할때, 부정확한 프로퍼티를 참조하는 것을 막아준다.
  const [state, setState] = React.useState({
    past: [],
    present: initialPresent,
    future: [],
  })
  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0
  const undo = React.useCallback(() => {
    // setState가 currentState라는 인자를 받아서 차리한다, 디펜던시가 사라졌다.
    setState(currentState => {
      const { past, present, future } = currentState
      if (past.length === 0) return currentState
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [])
  const redo = React.useCallback(() => {
    // setState가 currentState라는 인자를 받아서 차리한다, 디펜던시가 사라졌다.
    setState(currentState => {
      const { past, present, future } = currentState
      if (future.length === 0) return currentState
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    })
  }, [])
  const set = React.useCallback(newPresent => {
    // setState가 currentState라는 인자를 받아서 차리한다, 디펜던시가 사라졌다.
    setState(currentState => {
      const { present, past } = currentState
      if (newPresent === present) return currentState
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    })
  }, [])
  const reset = React.useCallback(newPresent => {
    setState(() => ({
      past: [],
      present: newPresent,
      future: [],
    }))
  }, [])
  return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
```

멘 처음 말한 것과 같이 useReducer를 안쓰고도 해결했다. 이번에는 useReducer를 써서 해결해 보자

```javascript
const UNDO = "UNDO"
const REDO = "REDO"
const SET = "SET"
const RESET = "RESET"

function undoReducer(state, action) {
  const { past, present, future } = state
  const { type, newPresent } = action
  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    }
    case REDO: {
      if (future.length === 0) return state
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    }
    case SET: {
      if (newPresent === present) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }
  }
}
function useUndo(initialPresent) {
  const [state, dispatch] = React.useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  })
  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0
  const undo = React.useCallback(() => dispatch({ type: UNDO }), [])
  const redo = React.useCallback(() => dispatch({ type: REDO }), [])
  const set = React.useCallback(
    newPresent => dispatch({ type: SET, newPresent }),
    []
  )
  const reset = React.useCallback(
    newPresent => dispatch({ type: RESET, newPresent }),
    []
  )
  return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
```

처음부터 useReducer로 만들 생각을 했다면 dependency array로 인해 생기는 문제에 대해서 고민할 필요도 없다.

둘 모두 서로의 기능을 완전히 대체할 수 있기에 "이럴때는 이런걸 써야 한다"는 규칙을 정하기는 어렵다.

하지만 선택을 그나마 더 잘하기 위한 기준을 제시한다면,

- 독립적 엘리먼트의 state만을 다룬다면 `useState`
- 각 엘리먼트의 state가 서로 영향을 끼친다면 `useReducer`

를 사용하는 편이 좋다고 말 할 수 있겠다.
