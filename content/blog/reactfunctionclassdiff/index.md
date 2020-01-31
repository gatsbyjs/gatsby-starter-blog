---
title: 리액트 function component와 class component는 어떻게 다를까? 
date: "2020-01-31T12:40:32.169Z"
description: 리액트 function 과 class의 차이를 다룬 글 번역
ogimage: './mathgirl.png'
tags: ["knowledge", "React", "Hook", "translation"]  
---

**이 글은 
[How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)를 번역한 글 입니다. 의역 및 오역이 있을 수 있는 점 참고해 주시길 바랍니다. 리액트를 더 올바르게 쓰고자 하시는 분들은 꾸준히 Dan Abramov의 다른글도 읽어 보신다면 좋은 인사이트를 많이 얻어 가실 수 있습니다.**

---

리액트의 function component와 class component는 어떻게 다른 걸까? 

이 물음에 대한 전통적인 답은 class를 통해 더 많은 기능을 사용할 수 있다는 것 이었다. 예를 들어 state 같은 기능은 함수에서 사용할 수 없었다. 하지만, 리액트 Hook이 탄생한 뒤 이 주장은 의미가 없어졌다. 

혹자는 둘중 하나의 성능이 더 빠르다고 말한다. 어느게 더 빠를까? 이를 주장하는 벤치마크들은 [결함](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f?source=your_stories_page---------------------------)이 많다. 그래서 여기서 부터 [결론](https://github.com/ryardley/hooks-perf-issues/pull/2)을 이끌어 내기는 조심스럽다. 성능은 대부분 코드가 무엇을 하느냐에 의해서 결정된다. function이나 class냐가 이를 좌우하지는 않는다. 우리의 관측에 의하면 둘간의 차이는 무시할만하다. 각각에 대한 최적화 전략이 [다르기는](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)하지만 말이다. 

어느쪽이 더 빠르던지간에 이미 존재하는 component를 바꿔 쓰는것을 [권하지는 않는다](https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both). Hook이 나온지는 몇년 되지 않았고(리액트가 2014년에 그랬던 것 처럼 말이다.) 최선의 사용방식이 확립되지 않았다. 

그럼 리액트 function과 class는 차이가 없는걸까? 물론 차이가 있다. 둘간의 멘탈모델이 다르다. 이번 포스트에서는 둘간의 가장 큰 차이에 대해서 설명해 볼 것이다. function component가 처음 소개된 2015년 부터 있어왔던 차이점 이지만 이는 종종 간과 되곤 한다. 

한마디로 이 차이점을 말하자면 

> function component는 렌더 당시의 값을 기억하고 사용한다.

이게 무슨 의미인지 뜯어보자 

---

메모: 이 포스트는 function component나 class component에 대한 가치 평가를 하고 있지 않다. 나는 여기서 두 프로그래밍 모델의 차이를 설명할 뿐이다. function에 대한 이해를 더 넓히기 위해서는 [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#adoption-strategy)를 참고하면 좋다.
 
---

이 component를 생각해 보자 

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


이 코드는 setTimeout을 이용하여 네트워크에 요청을 보내고 응답을 돌려받는 시뮬레이션이다. 예를 들어 만약 props.user가 Dan이라면 이코드는 ‘Followed Dan’ 이라는 메시지를 3초 뒤에 보여줄 것이다. 간단하다. 

(참고로, arrow function을 쓰는 것과 함수 선언을 하는 것이 이 예시에서는 아무런 차이가 없다. arrow function 대신 function handleClick()을 써도 정확히 같은 방식으로 동작할 것이다. )

위의 코드를 class로 쓴다면 어떻게 될까? 이렇게 된다. 


```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
```

일반적으로 사람들은 종종 각각이 의미하는바를 인지 하지 못하고 둘을 같은 것처럼 사용한다. 

**하지만, 이 두가지 코드는 미묘하게 다르다.** 둘을 자세히 살펴보자. 다른점이 보이는가? 개인적으로 나는 이 차이를 알아내는 데에 오랜 시간이 걸렸다. 

스포일러가 있으니 스스로 정답을 알아내고자 한다면, [데모](https://codesandbox.io/s/pjqnl16lm7)를 다뤄 보면서 시도해 보길 바란다. 이제 둘간의 차이를 설명하고 왜 이차이가 중요한지 설명하도록 하겠다. 

---

시작하기 전에 여기서 설명하는 차이는 리액트 Hook과는 관련이 없음을 알려드리고 싶다. 위의 예에서는 심지어 Hook을 사용하지도 않았다. 

이글은 리액트에서 function과 class의 차이점을 다룬다. 만약 당신의 리액트 앱에서 function을 사용하고자 한다면 당신은 이것을 이해할 필요가 있을 것이다.
 
---

**리액트 어플리케이션에서 흔히 일어나는 버그 상황과 함께 차이를 들여다 볼 것이다.**

이 [예제](https://codesandbox.io/s/pjqnl16lm7)를 열면 두개의 ProfilePage가 보일 것이다. 각각은 하나의 버튼을 랜더 한다. 

각 버튼을 가지고 아래의 동작을 따라해 보자 

Follow 버튼을 클릭한다.
3초가 지나기전에 프로필을 바꾼다. 
Alert 텍스트를 읽는다. 

이제 당신은 차이를 느낄 수 있을 것이다. 

function 버튼을 눌렀을 때는 변화  profile을 시키기 전의 이름이 나온다. 
class로 만들어진 버튼을 눌렀을 때는 profile을 변화 시킨 뒤의 이름이 나온다. 

![버튼비교](https://overreacted.io/386a449110202d5140d67336a0ade5a0/bug.gif)

---

이 예제 에서는 첫번째 작동 방식이 옳은 방식이다.  **만약 내가 누군가를 팔로우 한 뒤 다른 사람의 프로필로 이동했다면 리액트 component는 내가 팔로우한 대상을 헛갈려서는 안된다.** class의 이러한 작동 방식은 분명히 버그다.
 
---

그렇다면 왜 class는 이렇게 움직이는 것일까? 

우리 class의 showMessage 매써드를 자세히 살펴보자 

```javascript
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };
```

이 class 매써드는 this.props.user를 읽는다. props는 리액트에서 불변한다. 즉 절대 변하지 않는다는 말이다. **하지만 ‘this’는 언제나 변한다.**

‘this’ 는 사실 변하기 위해 존재한다. 리액트는 this를 매번 변경하여 당신의 렌더(render)와 라이프사이클 메서드가 가장 신선한 버젼에 접근할 수 있도록 해준다. 

그래서 리퀘스트가 진행되는 동안 우리 component가 다시 렌더된다면, this.props역시 바뀔 것이다. showMessage메서드는 user를 ‘너무 빨리’ 변경된  props에서 읽어온다.

UI는 개념적으로 현재 어플리케이션의 상태를 나타내야 한다. 다른 시각적 결과물과 마찬가지로 이벤트 역시 렌더된 상태에 속해 있어야 한다. 이벤트핸들러는 특정 렌더의 props와 state에 속해 있다. 

하지만 setTimeout이 this.props를 불러오도록 하는것은 그 관계를 무너뜨린다. 우리의 showMessage 콜백은 어떠한 렌더에도 묶여 있지 않다. 그래서 올바른 props를 놓쳐 버린다. this로부터 정보를 읽어 오는 행위가 그 연결고리를 끊어 놓았다. 


---

**function component가 존재하지 않는다고 하면 우리는 이 문제를 어떻게 해결 할 수 있을까?**

우리는 렌더와 props 그리고 showMessage 콜백간의 관계를 고치고 싶다. 이를 위해서 props가 도중에 길을 잃지 않도록 해야 한다. 

이를 해결하는 하나의 방법은 this.props를 이벤트 발생 초기에 읽고, 이 값을 timeout 함수에 넘기는 방법이다. 

```javascript
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

이 [방법](https://codesandbox.io/s/3q737pw8lq)은 동작한다. 하지만 이러한 접근 방식은 코드를 장황하게 만들며 시간이 지날 수록 에러가 발생할 가능성이 높아진다. 우리가 하나의 prop이상을 사용해야 할때나 state를 함께 사용해야 할 때  는 어떻게 할 것인가? **만약 showMessage가 다른 메서드를 콜 한다면, 그리고 그 메서드가 props나 state를 사용해야 한다면, 우리는 같은 문제를 똑같이 겪을 것이다.** 그래서 우리는 this.props나 this.state를 인자로 넘겨주어야 할 것이다. 

그렇게 하는 것은 일반적으로 class가 제공하는 이점을 사용하지 못하게 한다. 또한, 이 방식을 강요하기도 어렵고 기억하기도 어렵다. 때문에 사람들은 그냥 버그를 받아 들이고 쓰는 경우가 종종 있다. 

마찬가지로, alert코드를 handleClick 메서드 안에 인라인으로 써 넣는 것 역시 큰 문제를 해결하지 못한다. 우리는 다양한 메서드로 나눌수 있지만, 해당 렌더의 상황에 맞는 props와 state를 읽을 수 있는 코드를 작성하길 원한다. **이 문제는 리액트 에서만 한정된 문제는 아니다. 데이터를 this와 같이 변경 가능한 객체에 넣는 방식을 사용한다면 이런 문제를 겪게 된다.**

혹시, 컨스트럭터에 메서드를 bind 해 놓으면 문제를 해결 할 수 있지 않을까? 

```javascript
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showMessage() {
    alert('Followed ' + this.props.user);
  }

  handleClick() {
    setTimeout(this.showMessage, 3000);
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

아니다. 이 방법은 어떠한 문제도 해결하지 않는다. 기억하라. 문제는 컴포넌트가 this.props에서 읽어오는 것이 너무 빠르다는 것 이었지 우리가 사용하는 문법의 문제가 아니었다.  **하지만, 우리가 자바스크립트 closure를 올바르게 사용한다면 문제는 사라질 것이다.**

closure를 사용하는 방식은 종종 꺼려진다. 시간이 지남에 따라 변화하는 값을 생각하기 [어렵기](https://wsvincent.com/javascript-closure-settimeout-for-loop/) 때문이다. 하지만 리액트에서는 props와 state는 변하지 않는다!(최소한 변하지 않게 하는것을 최대한 권장한다.) 이는 closure를 사용하기 어렵게 했던 문제를 해결한다. 

이는 만약 당신이 한번 props나 state를 지정한다면, 당신은 언제나 변하지 않는 그 값에 접근할 수 있다는 의미다. 

```javascript
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;
    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```


**당신은 props를 렌더가 되는 시점에 잡아 두었다.**

![피카츄](https://overreacted.io/fa483dd5699aac1350c57591770a49be/pokemon.gif)


이렇게 하여 어떤한 코드(showMessage를 포함하여)라도 특정 렌더에 해당하는 props를 바라볼수 있게 되었다. 리액트는 더이상 우리의 치즈를 옮기지 않는다. 

**우리는 어떠한 function이라도 이 코드 안에 추가할 수 있다. 이 함수들은 잘저장된 props와 state를 이용할 것이다.** closure가 우리를 구원했다. 

---

위의 [예시](https://codesandbox.io/s/oqxy9m7om5)는 옳다. 하지만 이상한 부분이 있다. 위처럼 코드를 쓸꺼면 왜 class를 써야하는 걸까? render안에서 function을 정의해서 사용하는데 말이다. 

사실 우리는 class라는 껍질을 치우고 코드를 더 단순하게 할 수 있다. 

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

이전의 방식과 같이 props는 붙잡혀서 전달된다. 리액트는 props를 인자로 전달한다. **this와 다르게 props 객체는 리액트에 의해 변경되지 않는다.**

props를 비구조화 할당 방식으로 받으면 더 명확해 진다. 

```javascript
function ProfilePage({ user }) {
  const showMessage = () => {
    alert('Followed ' + user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

부모 component가 ProfilePage를 다른 props로 렌더할 때 리액트는 ProfilePage function을 다시 실행 할 것이다. 하지만 우리가 이미 클릭한 이벤트 헨들러는 이전의 렌더와 그 유저 값에 귀속 되어 있다. 그리고 showMessage 콜백은 귀속된 그 값을 읽는다. 해당 렌더에 속해 있는 값들은 회손되지 않는다. 

이게 바로 이 [데모](https://codesandbox.io/s/pjqnl16lm7)에서 Sophie의 profile에서 follow를 클릭하하고 Sunil으로 profile을 바꾸면 ‘Followed Sophie’의 alert이 나타나는 이유다.

![팔로우 이미지](https://overreacted.io/84396c4b3982827bead96912a947904e/fix.gif)

이렇게 동작하는 것이 옳다.
---

이제 우리는 리액트에서 function과 class의 차이를 이해하게 되었다. 

> function component는 렌더된 값을 기억한다. 


훅을 사용하는 경우에도 같은 원칙이 state에 적용된다. 이 예제를 살펴보자 


```javascript
function MessageThread() {
  const [message, setMessage] = useState('');

  const showMessage = () => {
    alert('You said: ' + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

```
[여기](https://codesandbox.io/s/93m5mz9w24)서 데모를 확인할 수 있다. 

이 메시지 앱이 그렇게 좋은 UI를 가지고 있지는 않지만, 이 예시는 앞서 다룬것과 같은 포인트를 짚어준다. 만약 내가 특정 메시지를 보낸다면 component는 그 메시지에 대해서 헛갈려 하면 안된다. 이 function component에서 message는 클릭이벤트가 브라우져에서 일어난시점의 render에 속하는 state를 사용한다. 따라서 message는 내가 Send를 누른 시점의 입력값으로 정해진다. 

---

우리는 리액트에서 function이 props와 state를 잘 캡쳐 한다는 것을 한다. **하지만, 우리가 특정 렌더에 속한 props나 state가 아니라 최신의 값을 사용하고 싶으면 어떻게 될까?**  우리가 [“미래로부터 값을 읽고 싶다면”](https://dev.to/scastiel/react-hooks-get-the-current-state-back-to-the-future-3op2) 어떻게 될까?


class에서는 this.props 혹은 this.state를 사용한다. this는 변경 가능하다. 리액트는 this를 변경한다. function component에서는 “ref”를 통해 렌더되는 component에 공유되는 변경 가능한 값을 지정할 수 잇다. 

```javascript
function MyComponent() {
  const ref = useRef(null);
  // You can read or write `ref.current`.
  // ...
}
``` 

하지만, 이를 사용하기 위해서는 몇가지 관리가 더 해져야 한다. 

ref는 [인스턴스 필드와 같은 역할을 한다.](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables). 이것은 변경가능한 세상으로의 탈출구다. “DOM refs” 컨셉에 대해 익숙하신 분들도 있겠지만 여기서의 ref는 더 일반적인 개념이다. 무언가를 넣을 수 있는 박스와 같다고 생각하면 된다. 

심지어 보기에도 this.something과 something.current 는 비슷하게 생겼다. 이둘은 같은 개념을 나타낸다. 

기본적으로 리액트는 function component에서 최신 props나 state에 대한 refs를 만들지 않는다. 많은 경우 이는 필요하지 않으며 ref를 할당하는 것은 낭비다. 하지만 반드시 값의 변화를 따라가야 한다면 수동으로 할 수 있다. 

```javascript
function MessageThread() {
  const [message, setMessage] = useState('');
  const latestMessage = useRef('');
  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
  };

```

만약 showMessage안에서 message를 읽었다면 Send 버튼을 눌렀던 시점의 메시지를 보게 될 것이다. 하지만 message 대신 latestMessage.current를 읽음으로 인해 우리는 최신값을 얻을 수 있다.(버튼을 누른 뒤 타이핑을 계속 해도 말이다.)

[두가지 데모](https://codesandbox.io/s/ox200vw8k9)를 비교해보면 차이를 알 수 있을 것이다. ref는 렌더링의 일관성을 피할수 있는 방법이며 종종 유용하게 사용할 수 있다. 

일반적으로 렌더링 중에는 ref를 읽거나 세팅하는 것을 피해야 한다. 왜냐하면 그것들은 변조 가능하기 때문이다. 우리는 렌더링이 예측 가능하기를 원한다. 하지만, 우리가 특정 prop이나 state의 최신값을 원한다면, ref를 손수 갱신하는 과정이 짜증날 수 있다. 그렇다면 이런 방법을 시도해 볼 수 있다. 

```javascript
function MessageThread() {
  const [message, setMessage] = useState('');

  // Keep track of the latest value.
  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  });
  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };
```
([여기](https://codesandbox.io/s/yqmnz7xy8x)서 데모를 확인할 수 있다.)

effect안에서 값을 할당하기 때문에 ref값은 DOM이 업데이트 된 뒤에만 변한다. 이를 통해 Time Slicing and Suspense와 같은 변화하는 값에 의존하는 기능들이 잘 작동할 수 있다. 

Ref를 이처럼 사용해야 할 상황이 흔하지는 않다. props나 state를 기억하는 것이 보통 더 나은 방식이다. 하지만, interval이나 subscription과 같은 [imperative API](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)를 사용할때 유용할 수 있다. 어떠한 값이던지 ref를 통해 최신 값을 추적할 수 있다. props 이던지 state이던지, props가 모두 담긴 object이던지, 심지어 function 이어도 상관이 없다. 

이 패턴은 또한 최적화에 유용할 수 있다. 이를테면 useCallback identity가 너무 자주 바뀔 때 사용할 수 있다. 하지만 [reducer를 사용하는 것](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)이 종종 더 나은 [해결책](https://github.com/ryardley/hooks-perf-issues/pull/3)이다. 

이 포스트에서는 class에서 일상적으로 발생하는 고장난 패턴을 살펴보았고 closure가 어떻게 이 문제 해결을 돕는지를 살펴 보았다. 하지만 의존성 경로를 구체화 하여 Hooks를 최적화 하려고 할때, 지저분한 closure들과 함께 버그를 마주치게 될 것이다. 이는 closure가 문제라는 말일까? 나는 그렇게 생각하지 않는다. 

위에서 우리가 보았듯이 closure는 알아차리기 어려운 미묘한 문제를 해결할 수 있도록 돕는다. 비슷하게, [Concurrent Mode](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)에서도 정확하게 작동하는 코드를 더 쉽게 쓸 수 있도록 도와준다. 이것이 가능한 이유는 component 안의 로직이 렌더되는 시점의 정확한 props와 state 를 닫기 때문이다.

모든 부분에서 **“지저분한” closure 문제는 function은 변하지 않는다거나 props는 항상 같다는 잘못된 가정에서 비롯되는 것 같다.** 내가 이번 글에서 설명한 것 처럼 이는 옳지 않은 말이다. 

function은 props와 state마다 종결된다. 따라서 그들이 어떤 시점에 실행 되었느냐가 중요하다. 이는 버그가 아니라 function component의 기능이다. function은 useEffect나 useCallback의 의존성 경로에서 제외되어서는 안된다는 말이다. (이를 제대로 고치는 해결책은 보통 useReducer를 쓰거나 useRef를 쓰는것이다. 둘중 어느것을 쓰는것이 좋을지에 대해서는 추후 다루도록 하겠다.)

우리가 function을 사용하려 리액트 코드를 짤 때는, 우리는 [코드를 최적화 하는 것](https://github.com/ryardley/hooks-perf-issues/pull/3)과 [어떤 값이 시간이 지남에 따라 바뀔 수 있는지](https://github.com/facebook/react/issues/14920)에 대한 생각을 조정할 필요가 있다.

[Fredrik이 말한 것](https://mobile.twitter.com/EphemeralCircle/status/1099095063223812096) 처럼

>Hook을 사용하는데 있어 최고의 멘탈 모델은 “어떤 값이라도 언제든지 변할 수 있는 것 처럼” 코드를 짜는 것이다. 

function역시 이 멘탈모델에서 예외가 아니다. 리액트 학습 교제에서 이 멘탈모델이 상식이 되는 것은 시간이 좀 걸릴것이다. Class 기반 마인드셋에서 다소 조정이 필요하기 때문이다. 이 아티클이 새로운 시선으로 리액트를 바라보는데 도움이 되었으면 한다. 

리액트 function은 항상 값을 캡쳐한다. 우리는 이제 그 이유를 안다.


![포켓몬](https://overreacted.io/fc3bddf6d4ca14bc77917ac0cfad3608/pikachu.gif)


function과 class는 완전히 다른 포켓몬인 것이다.
