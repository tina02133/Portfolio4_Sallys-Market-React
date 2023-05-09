import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeCountPlus, changeTotalPlus, changeCountMinus, changeTotalMinus, removeCart } from './store';
import { useEffect, useState } from 'react';

function Cart() {

  // 이렇게 하면 store에 저장되어 있던 모든 state 가 변수에 저장됨
  let cart = useSelector((state) => { return state })
  console.log(cart.stock)
  let dispatch = useDispatch()

  // 장바구니에 담긴 모든 제품의 총 금액 담을 state 
  let [총금액, 총금액변경] = useState('');

  // useEffect
  useEffect(() => {
    let 토탈액 = 0;
    cart.stock.map((a, i) => {
      토탈액 += cart.stock[i].total;
      총금액변경(토탈액)
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
                <td>{cart.stock[i].total}원</td>
                {/* 제품 삭제 버튼 */}
                <td>
                  <button onClick={()=>{
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
          <p>총 금액 : <span className='total-price'>{총금액}원</span></p>
        </div>
        <Button className='order-btn' variant="warning">주문하기</Button>
      </div>
    </>
  )
}

export default Cart;