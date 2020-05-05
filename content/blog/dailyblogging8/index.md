---
title: Daily Study Logging8 - react, redux
date: "2020-04-28T13:09:32.169Z"
description: 리액트로 쇼핑몰 만들기 - redux로 상태 옮기기 
tags: ["knowledge", "studylog", "react"] 
---
[커밋로그](https://github.com/Jesscha/react-shoppingmall/commit/8166ffcec7ee36aedfa84f312b9f7d5dee2b4633)

오늘의 작업은 directory 컴포넌트 내부의 state를 redux로 옮겨 놓는 작업이다. 

이 state를 이 컴포넌트 안에서만 사용하면 이대로 두어도 아무런 문제가 없겠지만, 이 state를 다른 곳에서도 사용하고자 하기에 이를 redux로 옯겨 심어 보자 

제일 먼저 해야 하는 것인 directory라는 리듀서를 만드는 것이다. 

`directory.js`에 INITIAL_STATE를 원래 디렉토리로 지정해 준다. 그리고 `directoryReducer`에 `INITAIL_STATE`를 리턴 하도록 지정한다. 어떤 액션으로 이걸 바꾸거나 하지 않을 것이기 때문에 따로 액션을 지정하지 않고 default만을 놓는다. 

```javascript
const INITIAL_STATE = {
    sections: [
        {
          title: 'hats',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 1,
          linkUrl: 'shop/jackets'
        },
        {
          title: 'jackets',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 2,
          linkUrl: 'shop/jackets'
        },
        {
          title: 'sneakers',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          id: 3,
          linkUrl: 'shop/sneakers'
        },
        {
          title: 'womens',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          size: 'large',
          id: 4,
          linkUrl: 'shop/womens'
        },
        {
          title: 'mens',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          size: 'large',
          id: 5,
          linkUrl: 'shop/mens'
        }
      ]
    }

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch ( action.type) {
        default:
            return state; 
    }
}

export default directoryReducer; 
```

그리고 해당 state에도 reselect를 사용하여 다른 state가 이 state에 영향을 받지 않게 만든다. 

```javascript
import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
) 
```
그 뒤 rootReducer에 directory reducer를 추가해 준다. 

```javascript
const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer
    cart: CartReducer,
    directory: directoryReducer
})
```

마지막으로 기존 directory 컴포넌트를 함수형 컴포넌트로 바꾸고 mapStateToProps를 통해서 section이라는 state를 selector를 통해 만들어주면 된다. 

```javascript
const Directory = ({sections}) => (
      <div className="directory-menu">
        {
          this.state.sections.map(({ id, ...sectionProps }) => {
          sections.map(({ id, ...sectionProps }) => {
            return (
            <MenuItems key={id} {...sectionProps} />
          )}
          )}
      </div>
    )
  }
}

export default Directory; 
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory); 
```


지금까지 해 왔던 것의 반복이지만, 새로운 state를 redux에 차근차근 넣어보니 지식이 정리가 더 잘 되는 느낌이다. 