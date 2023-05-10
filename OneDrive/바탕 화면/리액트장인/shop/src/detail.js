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
  // let num = props.data[id].id;

  let 찾은상품 = props.data.find(function (x) {
    return x.id == id;
  })

  // 렌더링 2초 이후 div 사라지는 동적인 ui 구현을 위해 state 에 ui 상태값 넣어놓기
  let [박스상태, 박스상태변경] = useState(true);

  //갯수 버튼 조작에 의한 제품 수량 담을 state
  let [수량, 수량변경] = useState(1);

  // 갯수 버튼 조작에 의한 제품 총 가격을 담을 state
  let [총금액, 총금액변경] = useState(찾은상품.price);

  // 탭 변경 저장 state 
  let [탭, 탭변경] = useState(0);

  // component 의 라이프사이클 
  // mount / update 시마다 실행될 코드
  // 이부분에선 return 함수 사용할 필요 없음, 그냥 단순히 '박스상태변경' 이라는 함수 실행하고 끝이니까.
  useEffect(() => {
    // 렌더링 2초 이후 div 사라지는 코드 
    let a = setTimeout(() => {
      박스상태변경(false);
    }, 3000, [])

    // 제품 갯수 및 금액 변경
    // react 특성상 비동기 이기 때문에 제렌더링 과정에서 오류가 생길 수 있음 
    총금액변경(찾은상품.price*수량);

    // clear up function
    // ==> mount 시 실행되는 것이 아닌 unmount 시 실행됨 
    return () => {
      clearTimeout(a)
    }
  });

  return (
    <div className="container">
      {/* <StackingExample className="ex"/> */}
      {/* {
        박스상태 == true
          ? <div className="alert alert-warning">
            <p>2초 이내 구매 시 10 % 할인</p>
          </div>
          : null
      } */}
      <div className="row">
        {/* 이미지 부분 */}
        <div className="col-md-6 img-info">
          <img src={찾은상품.img} width="70%" />
        </div>
        {/* 가격 및 주문하기 버튼 부분 */}
        <div className="col-md-6 item-info">
          <h3 className="pt-5 item-title">{찾은상품.title}</h3>
          <hr></hr>
          <p className="item-price">{찾은상품.price}원</p>
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
                // 수량이 음수로 넘어갈 경우 함수 실행되지 않도록 하기.
                if(수량<=0)
                return false;
              }
              // state 변경함수로 state 변경
              수량변경(수량-1)
              // 수량 변경 이후 총금액 변경은 useEffect 를 이용하여 hook 걸어줌으로써 변경하도록 처리.
              // 이유는 제렌더링 시 비동기적인 이유로 오류 생기지 않게 하기 위해서임

            }}>-</button>
            {/* 수량 보여주는 input */}
            <Form.Control className="count-box"
              type="text"
              placeholder={수량}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
            {/* 갯수 더하기 버튼 */}
            
            <button className="count-btn" onClick={()=>{
              수량변경(수량+1)
              // 수량 변경 이후 총금액 변경은 useEffect 를 이용하여 hook 걸어줌으로써 변경하도록 처리.
              // 이유는 제렌더링 시 비동기적인 이유로 오류 생기지 않게 하기 위해서임
            }}>+</button>
          </div>
          <hr/>
          {/* 갯수에 따른 총 가격 표시 부분 */}
          <p className="item-total-price">총 가격 : {총금액}원</p>
          {/* 주문하기 버튼 클릭 시 장바구니 state 에 추가되도록 하기 */}
          <button className="btn btn-warning item-order-btn" onClick={() => { navigate('/cart'); dispatch(addCart({ id: 찾은상품.id, img: 찾은상품.img, name: 찾은상품.title, count: 수량,price : 찾은상품.price, total : 총금액 })) }}>주문하기</button>
        </div>
      </div>
      {/* 탭 3개 부분 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { 탭변경(0) }} eventKey="link0">상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { 탭변경(1) }} eventKey="link1">배송 및 교환/반품</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="tab-nav-link" onClick={() => { 탭변경(2) }} eventKey="link2">후기</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} 찾은상품={찾은상품} />
    </div>
  )
}

function TabContent({ 탭, 찾은상품 }) {

  let [fade, setFade] = useState('')

  // 탭 state 가 변경이 일어날때마다 fade 라는 state를 end 로 바꿔주세요~
  useEffect(() => {

    setTimeout(() => { setFade('end') }, 100)
    return () => {
      setFade('')
    }
  }, [탭])

  return (
    <div className={'start ' + fade}>
      {[
        // 상세정보
        <div className="detail-info">
          <h3>[{찾은상품.title}] <br /> 상세정보입니다</h3>
          <div className="detail-info-img"><img src={찾은상품.img}></img></div>
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
          </Table></div>][탭]}
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