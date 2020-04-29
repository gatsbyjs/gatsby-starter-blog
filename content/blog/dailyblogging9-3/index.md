---
title: Daily Study Logiing9.3 - react, redux
date: "2020-04-29T16:09:32.169Z"
description: 리액트로 쇼핑몰 만들기 - redux로 상태 옮기기 
tags: ["knowledge", "studylog", "react"] 
---
[커밋로그](https://github.com/Jesscha/react-shoppingmall/commit/418383d5f61eca9471c1007a0cbb9583391960f8)


어제 작업의 페턴과 거의 동일한 작업 이지만, 이번에는 collections 데이터가 아니라 shop 데이터를 리덕스에 옮겨 닮는다. 연습이 완벽함을 만드니까 같은 일을 반복하는 것에도 의미가 있다.


shopdata를 담기 위한 리듀서를 만든다. 이 리듀서는 특별한 액션을 받을 거는 아니니까 default로 state를 리턴한다.

```javascript
import SHOP_DATA from './shop.data';


const INITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }

}

export default shopReducer; 

```

이 리듀서를 root reducer에 연결한다. 

```javascript
const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer,
    directory: directoryReducer,
    shop: shopReducer
})
```

셀렉터를 만든다. 

```javascript
import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
) 
```

셀렉터를 컴포넌트에 연결한다.

```javascript


const ShopPage =  ({collections}) => {
    return (<div className="shop-page">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            )) 
        }
        </div>)
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});


export default connect(mapStateToProps)(ShopPage);

```

이렇게 하면 이전과 같은 기능을 하지만 state 관리를 리덗에서 하게 할 수 있다. 

리덕스에 상태 관리를 추가하려면

1. 리듀서를 만들고 
2. 루트 리듀서에 연결하고 
3. 셀렉터를 만들고 
4. 셀렉터를 컴포넌트에 연결한다. 

의 절차를 따른다는 것을 기억하자
