import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState 와 비슷한 용도임
let user = createSlice({
    name: 'user',
    initialState: 'kim',

    // state 변경함수
    reducers : {
        changeName(state){
            return 'john kim'
        }
    }
})

// 만든 변경합수 export 하는 법
export let {changeName} = user.actions


// 장바구니 state
let stock = createSlice({
    name: 'stock',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers : {

        // 여기서의 state는 state 안 데이터 자체를 의미.
        changeCount(state, action){
        let id = state.findIndex((a)=>{return a.id===action.payload});
        state[id].count += 1;
        },
        addCart(state, action){
            state.push(action.payload)

        }
    }
})

//변경 함수 export
export let {changeCount, addCart} = stock.actions;

export default configureStore({
    reducer: {
        // 만든 redux 등록하기
        // 작명 : redux명.reducer
        user: user.reducer,
        stock: stock.reducer
    }
}) 