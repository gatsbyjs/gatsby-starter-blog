---
title: 리액트 펑션 컴포넌트와 사용과 클래스 컴포넌트는 어떻게 다를까?
date: "2020-01-17T12:40:32.169Z"
description: 펑션 컴포넌트를 써야 할지 클래스 컴포넌트를 써야할지 고민이라면 이 글을 읽어 보아야 한다.
---

**이 글은 
[How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)를 번역한 글 입니다. 의역 및 오역이 있을 수 있는 점 참고해 주시길 바랍니다. 리액트를 더 올바르게 쓰고자 하시는 분들은 꾸준히 Dan Abramov의 다른글도 읽어 보신다면 좋은 인사이트를 많이 얻어 가실 수 있을 실 겁니다. **


리액트의 펑션 컴포넌트와 클래스는 어떻게 다른 걸까? 

이 물음에 대한 전통적인 답은 클래스가 더 많은 기능을 사용할 수 있도록 해 준다는 것 이었다. 예를 들어 스테이트 같은 기능은 함수에서 사용할 수 없었다. 하지만, 리액트 훅이 탄생한 뒤 이 주장은 의미가 없어졌다. 

혹자는 둘중 하나의 성능이 더 빠르다고 말한다. 어느게 더 빠를까? 이를 주장하는 벤치마크들은 [결함](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f?source=your_stories_page---------------------------)이 많다. 그래서 여기서 부터 [결론](https://github.com/ryardley/hooks-perf-issues/pull/2)을 이끌어 내기는 조심스럽다. 성능은 대부분 코드가 무엇을 하느냐에 의해서 결정된다. 펑션이나 클래스냐가 이를 좌우하지는 않는다. 우리의 관측에 의하면 둘간의 차이는 무시할만하다. 각각에 대한 최적화 전략이 [다르기는](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)하지만 말이다. 

어느쪽이 더 빠르던지에 상관 없이 이미 존재하는 컴포넌트를 바꿔 쓰는것을 [권하지는 않는다](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both). 훅이 나온지는 몇년 되지 않았고(리액트가 2014년에 그랬던 것 처럼 말이다.) 베스트 프랙티스가 확립되지 않았다. 

그럼 리액트 펑션과 클래스는 차이가 없는걸까? 물론 차이가 있다. 둘간의 멘탈모델이 다르다. 이번 포스트에서는 둘간의 가장 큰 차이에 대해서 설명해 볼 것이다. 이 차이점은 펑션 컴포넌트가 처음 소개된 2015년 부터 있었지만 종종 간과 되고는 한다. 

한마디로 이 차이점을 말하자면 
> 펑션 컴포넌트는 렌더된 값을 기억하고 사용한다.

이게 무슨 의미인지 뜯어보자 

—————————————————————————— 
메모: 이 포스트는 펑션 컴포넌트나 클래스 컴포넌트에 대한 가치 평가를 하고 있지 않다. 나는 여기서 두 프로그래밍 모델의 차이를 설명할 뿐이다. 펑션에 대한 이해를 더 넓히기 위해서는 [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#adoption-strategy)를 참고하면 좋다. 
—————————————————————————— 

이 컴포넌트를 생각해 보자 

```javascript
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```



