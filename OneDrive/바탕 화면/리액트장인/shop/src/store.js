import { configureStore, createSlice } from '@reduxjs/toolkit'

// 장바구니 state
let stock = createSlice({
    name: 'stock',
    initialState: [

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

//변경 함수 export하기
export let {changeCount, addCart} = stock.actions;

export default configureStore({
    reducer: {
        // 만든 redux 등록하기
        // 작명 : redux명.reducer
        stock: stock.reducer
    }
}) 