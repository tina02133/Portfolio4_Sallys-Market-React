import { Table, Button, Form } from 'react-bootstrap'
// React redux
import { useDispatch, useSelector } from 'react-redux';
// redux에서 정의한 state변경 함수 import
import { changeName, changeCountPlus, changeTotalPlus, changeCountMinus, changeTotalMinus, removeCart } from './store';
import { useEffect, useState } from 'react';

function Cart() {

  // 이렇게 하면 redux(store.js)에 저장되어 있던 모든 state 가 변수에 저장됨
  let cart = useSelector((state) => { return state })
  console.log(cart.stock)
  let dispatch = useDispatch()

  // 장바구니에 담긴 모든 제품의 총 금액 담을 state 
  let [totalPrice, setTotalPrice] = useState('');
  // useEffect쓰는 이유 ==>
  // React 는 state 가 변경되는 순간 페이지가 자동으로 리렌더링 됨
  //  react 는 비동기 처리 이기때문에 state 변경과정에 있어서 순서 오류가 날 수 있음
  // useEffect를 사용함으로서 페이지가 mount 및 update될 시에 hook 을 걸어 오류를 방지하기 위함.
  // user가 장바구니에서 수량 버튼 클릭 시, 
  // 즉시 redux (store.js)에 반영되도록 state 변경함수를 사용하였고,
  // 장바구니페이지(cart.js)에서 state 가 변경됨으로서 
  useEffect(() => {
    // 장바구니에 담긴 모든 제품의 총 금액을 담을 변수
    let allItemTotal = 0;
    cart.stock.map((a, i) => {
      allItemTotal += cart.stock[i].total;
      setTotalPrice(allItemTotal)
    })
  })

  return (
    <>
      <h2 className='cartName'>장바구니</h2>
      <hr></hr>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>수량</th>
            <th>금액</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* store.js 에 저장되어 있는 장바구니 데이터 map  반복문으로 뽑아내고 테이블 형태로 뿌려주기 */}
          {
            cart.stock.map((a, i) => {
              return (<tr className='table-tr'>
                {/* 번호 */}
                <td>{i + 1}</td>
                {/* 제품 이미지 */}
                <td className='table-img'><img src={cart.stock[i].img}></img></td>
                {/* 제품명 */}
                <td>{cart.stock[i].name}</td>
                {/* 제품 수량 */}
                <td>
                  <div className="d-inline-flex">
                    <button className="count-btn" onClick={() => {
                      // 수량이 0밑으로 내려가지 못하도록
                      {
                        if (cart.stock[i].count <= 0)
                          return false
                      }
                      // state 변경 함수 사용 시  dispatch 로 감싸야함 
                      dispatch(changeCountMinus(cart.stock[i].id))
                      dispatch(changeTotalMinus(cart.stock[i].id))
                    }}>-</button>
                    {/* 수량 부분 */}
                    <Form.Control className="count-box"
                      type="text"
                      placeholder={cart.stock[i].count}
                      aria-label="Disabled input example"
                      disabled
                      readOnly
                    />
                    {/*  수량 + 버튼 */}
                    <button className="count-btn" onClick={() => {
                      // state 변경 함수 사용 시  dispatch 로 감싸야함 
                      dispatch(changeCountPlus(cart.stock[i].id))
                      dispatch(changeTotalPlus(cart.stock[i].id))
                    }}>+</button>
                  </div>
                </td>
                <td>{cart.stock[i].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                {/* 제품 삭제 버튼 */}
                <td>
                  <button className="remove-btn" onClick={()=>{
                    dispatch(removeCart(cart.stock[i].id))
                  }}>삭제</button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
      </Table>
      <div className='order-box'>
        <div className='total'>
          <p>총 금액 : <span className='total-price'>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span></p>
        </div>
        <Button className='order-btn'>주문하기</Button>
      </div>
    </>
  )
}

export default Cart;