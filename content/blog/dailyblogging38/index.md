---
title: Daily Study Logging38 - useCallback과 useMemo
date: "2020-06-24T21:14:32.169Z"
description: 리액트 어플리케이션 최적화를 위한 hooks
tags: ["knowledge", "studylog", "react"]
---

react Hooks인 useCallback 과 uesMemo는 성능 최적화를 위해서 사용된다.

## useCallback

리액트에서 컴포넌트의 상태가 변경되어 다시 렌더링 될 때, 그 컴포넌트에 있는 모든 값과 함수는 같이 랜더링 된다. 이러한 방식은 리소스의 낭비를 불러일으킬 수 있다. 왜냐하면, 다시 만들어야 할 필요가 없는 것들까지 다시 만들어 내느라 리소스를 사용하기 때문이다.

특정 함수를 다시 랜더링 되지 않도록 돕는 역할을 하는 Hooks API가 바로 useCallback이다.

```javascript
import React, { useState, useCallback } from "react"

// Set에 add를 하여 새롭게 렌더링 된건지 아닌건지를 판단한다.
const functions = new Set()

const App = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  const incrementCount1 = () => setCount1(count1 + 1)
  const incrementCount2 = () => setCount2(count2 + 1)

  const logName = () => console.log("jesse")
  functions.add(logName)

  console.log(functions)
  return (
    <div className="App">
      Count 1: {count1}
      <button onClick={incrementCount1}> Increase Count1</button>
      Count 1: {count2}
      <button onClick={incrementCount2}> Increase Count2</button>
    </div>
  )
}

export default App
```

위의 코드를 보자, 중간에 컴포넌트 상태와 전혀 관련이 없는 함수인 `logName`이라는 함수를 하나 넣어 두었다. 그리고 Set에 add를 했다. 만약 이 쓸모없는 함수가 새롭게 렌더 되지 않았다면 set의 개수는 같을 거고 새롭게 랜더된다면 set의 길이가 늘어날 것이다.

위의 코드를 실행하면, 버튼을 누를 때 마다 set의 길이가 하나씩 증가하는 것을 볼 수 있다. 이러한 비효율성을 해결하는 방법이 바로 useCallbakc이다.

`const logName = () => useCallback(console.log('jesse'), []);` 처럼 useCallback으로 감싸주면, 맨처음에 추가 된 이후로 set의 길이가 늘어나지 않는다.

`logName`을 기억하고 다시 렌더링 하지 않는 것이다.

위의 `incrementCount1`, `incrementCount2`도 마찬가지로 매번 렌더링 될 필요가 없다. count1 과 count2가 바뀔 때에만 각각 다시 렌더링 되어야 할 뿐이다.

```javascript
const incrementCount1 = useCallback(() => setCount1(count1 + 1), [count1])
const incrementCount2 = useCallback(() => setCount2(count2 + 1), [count2])
```

앞서 했던 것과 다른점이 하나 있다. 두번째 인자에 의존성 경로를 표시한 것이다. 의존성 경로에 있는 값이 변했을 때만 해당 함수는 다시 랜더링 되게 된다.

## useMemo

useCallback과 비슷하지만, 값을 기억한다는 차이가 있다. 의존성 경로에 있는 값이 이전과 동일한 경우 이전의 결과 값을 재활용한다.

```javascript
const doSomethingComplicated = () => {
  // 아주 복잡한 연산이라고 가정..
  return count1 * 1000
}
```

위와 같은 코드가 이전에 우리가 사용한 코드 사이에 끼어들었다고 하자. count1이 바뀔 때 마다 이 연산이 다시 잔행되는 건 맞다. 하지만 incrementCount2를 눌러도 위의 함수는 호출된다. count1이 바뀌지 않는 이상 이 값이 바뀔 일은 없으니 이 연산을 다시 할 필요도 없다.

이 함수를 아래와 같이 바꾸면 값을 기억해서 사용할 수 있다.

```javascript
const doSomethingComplicated = useMemo(() => {
  // 아주 복잡한 연산이라고 가정..
  return (count1*1000), [count1])
}

```
