import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName , changeCount} from './store';

function Cart() {

  // 이렇게 하면 store에 저장되어 있던 모든 state 가 변수에 저장됨
  let cart = useSelector((state) => { return state })
  console.log(cart.stock)
  let dispatch = useDispatch() 
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {/* map  반복문으로 데이터 갯수만큼 행 만들어주기 */}
        {
          cart.stock.map((a, i) => {
            return (<tr>
              <td>{i+1}</td>
              <td>{cart.stock[i].name}</td>
              <td>{cart.stock[i].count}</td>
              <td>
                <button onClick={()=>{
                  // state 변경 함수 사용 시  dispatch 로 감싸야함 
                  dispatch(changeCount(cart.stock[i].id))
                }}>+</button>
              </td>
            </tr>
            )
          })
        }
      </tbody>
    </Table>
  )

}

export default Cart;