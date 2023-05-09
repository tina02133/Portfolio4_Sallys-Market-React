import { configureStore, createSlice } from '@reduxjs/toolkit'

// 장바구니 state
let stock = createSlice({
    name: 'stock',
    initialState: [

    ],
    reducers: {

        // 여기서의 state는 state 안 데이터 자체를 의미.
        addCart(state, action) {
            state.push(action.payload)
        },
        removeCart(state, action){
            let 찾은인덱스 = state.findIndex((a)=>{
                return a.id === action.payload;  
            })
            state.splice(찾은인덱스,1);
        },
        changeCountPlus(state, action) {
            // cart.js 에서 수량버튼 클릭 시 넘겨받은 제품 id받음.
            // 넘겨받은 id 와 일치하는 장바구니 state 제품을 찾음  
            let 찾은인덱스 = state.findIndex((a) => { return a.id === action.payload });
            state[찾은인덱스].count += 1;
        },
        // 장바구니에서 수량 변경 시 반영될 제품당 총금액 변경 함수
        changeTotalPlus(state, action) {
            let 찾은인덱스 = state.findIndex((a) => { return a.id === action.payload })
            state[찾은인덱스].total += state[찾은인덱스].price;
        },
        changeCountMinus(state, action) {
            // cart.js 에서 수량버튼 클릭 시 넘겨받은 제품 id받음.
            // 넘겨받은 id 와 일치하는 장바구니 state 제품을 찾음  
            let 찾은인덱스 = state.findIndex((a) => { return a.id === action.payload });
            state[찾은인덱스].count -= 1;
        },
        changeTotalMinus(state, action) {
            let 찾은인덱스 = state.findIndex((a) => { return a.id === action.payload })
            state[찾은인덱스].total -= state[찾은인덱스].price;
        }
    }
})


//변경 함수 export하기
export let { changeCountPlus, addCart, changeTotalPlus,changeCountMinus, changeTotalMinus,removeCart } = stock.actions;

export default configureStore({
    reducer: {
        // 만든 redux 등록하기
        // 작명 : redux명.reducer
        stock: stock.reducer
    }
}) 