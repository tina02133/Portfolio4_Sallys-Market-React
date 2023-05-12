import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Nav, Table, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "./store";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


function Detail(props) {

  let state = useSelector((state) => { return state })
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // 경로에서 param 네이밍을 id 로 했으니, 변수명을 동일하게 통일해주어야 함 
  let { id } = useParams();


  let foundItem = props.data.find(function (x) {
    return x.id == id;
  })

  // 렌더링 2초 이후 div 사라지는 동적인 ui 구현을 위해 state 에 ui 상태값 넣어놓기
  let [box, setBox] = useState(true);

  //갯수 버튼 조작에 의한 제품 itemCount 담을 state
  let [itemCount, setItemCount] = useState(1);

  // 갯수 버튼 조작에 의한 제품 총 가격을 담을 state
  let [itemTotalPrice, setItemTotalPrice] = useState(foundItem.price);

  // tab 변경 저장 state 
  let [tab, setTab] = useState(0);

  // component 의 라이프사이클 
  // mount / update 시마다 실행될 코드
  // 이부분에선 return 함수 사용할 필요 없음, 그냥 단순히 'setBox' 이라는 함수 실행하고 끝이니까.
  useEffect(() => {
    // 렌더링 2초 이후 div 사라지는 코드 
    let a = setTimeout(() => {
      setBox(false);
    }, 3000, [])

    // 제품 갯수 및 금액 변경
    // react 특성상 비동기 이기 때문에 제렌더링 과정에서 오류가 생길 수 있음 
    setItemTotalPrice(foundItem.price*itemCount);

    // clear up function
    // ==> mount 시 실행되는 것이 아닌 unmount 시 실행됨 
    return () => {
      clearTimeout(a)
    }
  });

  // 제품가격
  let price = foundItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="container">
      {/* <StackingExample className="ex"/> */}
      {/* {
        box == true
          ? <div className="alert alert-warning">
            <p>2초 이내 구매 시 10 % 할인</p>
          </div>
          : null
      } */}
      <div className="row">
        {/* 이미지 부분 */}
        <div className="col-md-6 img-info">
          <img src={foundItem.img} width="70%" />
        </div>
        {/* 가격 및 주문하기 버튼 부분 */}
        <div className="col-md-6 item-info">
          <h3 className="pt-5 item-title">{foundItem.title}</h3>
          <p className="item-price">{price}원</p>
          <hr></hr>
          {/* 원산지 및 배송정보 div */}
          <div className="ship-info">
            <p>원산지 : 한국</p>
            <hr></hr>
            <p>배송비 : 무료</p>
          </div>
          {/* 주문할 상품 갯수 div */}
          <div className="d-inline-flex">
            {/* 갯수 버튼 클릭할 때 마다 총 가격 바뀔 수 있도록 구현하기 */}
            {/* 갯수 빼기 버튼 */}
            <button className="count-btn" onClick={()=>{
              {
                // itemCount이 음수로 넘어갈 경우 함수 실행되지 않도록 하기.
                if(itemCount<=0)
                return false;
              }
              // state 변경함수로 state 변경
              setItemCount(itemCount-1)
              // itemCount 변경 이후 itemTotalPrice 변경은 useEffect 를 이용하여 hook 걸어줌으로써 변경하도록 처리.
              // 이유는 제렌더링 시 비동기적인 이유로 오류 생기지 않게 하기 위해서임

            }}>-</button>
            {/* itemCount 보여주는 input */}
            <Form.Control className="count-box"
              type="text"
              placeholder={itemCount}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
            {/* 갯수 더하기 버튼 */}
            
            <button className="count-btn" onClick={()=>{
              setItemCount(itemCount+1)
              // itemCount 변경 이후 itemTotalPrice 변경은 useEffect 를 이용하여 hook 걸어줌으로써 변경하도록 처리.
              // 이유는 제렌더링 시 비동기적인 이유로 오류 생기지 않게 하기 위해서임
            }}>+</button>
          </div>
          <hr/>
          {/* 갯수에 따른 총 가격 표시 부분 */}
          <p className="item-total-price">총 가격 : <span style={{color:"red"}}>{itemTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span></p>
          {/* 주문하기 버튼 클릭 시 장바구니 state 에 추가되도록 하기 */}
          <button className=" item-order-btn" onClick={() => { navigate('/cart'); dispatch(addCart({ id: foundItem.id, img: foundItem.img, name: foundItem.title, count: itemCount,price : foundItem.price, total : itemTotalPrice })) }}>주문하기</button>
        </div>
      </div>
      {/* tab 3개 부분 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { setTab(0) }} eventKey="link0">상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { setTab(1) }} eventKey="link1">배송 및 교환/반품</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { setTab(2) }} eventKey="link2">후기</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} foundItem={foundItem} />
    </div>
  )
}

function TabContent({ tab, foundItem }) {

  let [fade, setFade] = useState('')

  // tab state 가 변경이 일어날때마다 fade 라는 state를 end 로 바꿔주세요~
  useEffect(() => {

    setTimeout(() => { setFade('end') }, 100)
    return () => {
      setFade('')
    }
  }, [tab])

  return (
    <div className={'start ' + fade}>
      {[
        // 상세정보
        <div className="detail-info">
          <h3>[{foundItem.title}] <br /> 상세정보입니다</h3>
          <div className="detail-info-img"><img src={foundItem.img}></img></div>
        </div>,
        // 배송정보
        <div className="detail-info">
          <h4>배송기간 안내</h4>
          <p>기본 : 2~5일 소요(상품에 따라 다를 수 있으며 순차적으로 발송해드립니다)<br />
            배송지연 상품 : 5~7일 이상 소요<br />
            갑작스럽게 배송이 지연되는 경우 개별적으로 연락 드립니다
          </p>
          <h4>교환/반품 안내</h4>
          <p>
            수령 후 7일 이내에 QNA에 문의 해주신 후, 빠른 반송 부탁드립니다.<br />
            한손마켓의 지정 택배사 우체국을 통하여 반송 바랍니다.
          </p>
          <h4>회사위치</h4>
          <img src={require("./img/지도.png")} />
        </div>,
        //후기 
        <div className="detail-info">
          <Table striped bordered hover size="m" className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>아이디</th>
                <th>내용</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>tina02133</td>
                <td>맛도 있고 포장도 꼼꼼하게 와서 너무 좋았어요!</td>
                <td>2023.05.12</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>역시 칼배송!! 하루만에 도착! 최고입니다 굿굿</td>
                <td>2021.08.11</td>
              </tr>
              <tr>
                <td>2</td>
                <td>눈누난나</td>
                <td>ㅋㅋㅋㅋ항상 시키는거지만 매번 감탄하면서 먹습니다.</td>
                <td>2020.12.25</td>
              </tr>
            </tbody>
          </Table></div>][tab]}
    </div>
  )

}
export default Detail

function StackingExample() {
  return (
    <ToastContainer className="position-static">
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}