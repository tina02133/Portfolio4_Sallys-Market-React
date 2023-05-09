import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
import data from './data.js';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './detail.js';
import axios from 'axios'
import Cart from './cart.js'
import MainSlide from './mainSlide';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontAwsome import
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons"

function App() {

  // localStorage 에 저장하기
  // localStorage  에는 array / object 자료형을 저장불가.
  // 따라서 JSON 형태로 바꿔주어 저장해야 함
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])


  // import한 상품 data state에 저장하기
  let [shoe, shoe변경] = useState(data);
  let navigate = useNavigate();

  // 더보기 버튼 클릭 횟수 담을 state 
  // 클릭 횟수에 따라 ajax 요청할 데이터 구분 위해서.
  // 3번 클릭 시, 더이상 보여줄 상품 없다고 알림 띄우기

  let [클릭, 클릭변경] = useState(0);

  // localStorage 에 있는 상품 가져오기 
  // 여기서 최근본상품은 data.js 에 들어있는 제품의  id 값 배열임
  let 최근본상품 = JSON.parse(localStorage.getItem('watched'));
  console.log(최근본상품);



  return (
    <div className="App">
      <div class="alert alert-warning" onClick={() => { navigate('/event') }}>지금 주문 시 20% 할인 쿠폰 증정!</div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="navbar-brand" onClick={() => { navigate('/') }}>이름뭐로하지</Navbar.Brand>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title="Menu" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => { navigate('/cart') }}>장바구니</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate('/event') }}>
                  진행중인 이벤트
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                size="lg"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 최근 본 상품 div */}
      <div className='watched'>
        <div className='cart-count'>
          cart
        </div>
        <div className='watched-item'>
          최근 본 상품
        </div>
        {
          shoe.map((a, i) => {
            // 최근본상품 이라는 배열에 a.id 값이 포함되어 있다면
            if (최근본상품.includes(a.id)) {
              // a.img 내놔라
              return <div className='watched-img'>
                <img src={a.img}></img>
              </div>
            }
          })
        }
      </div>
      {/* Router 사용하여 페이지 나누기  */}

      <Routes>
        <Route path="/" element={
          <>
            {/* ★★★★ 우선은 메인페이지 메인이미지 슬라이드 컴포넌트로 만들자 */}
            <MainSlide />
            <div className='main-ment'>
              <p>이 상품 어때요?</p>
            </div>
            <div className="container">
              {/* ★★★★상품 이미지 마켓컬리 클론해서 하도록 하자, data.js파일에 이미지 요소 따로 등록해서 끌어오자 */}
              <div className="row">
                {/* map 반복문 사용 시 {} 로 묶어주기 
                     ()안의 a는 해당 반복회차의  shoe 데이터를 의미.
                     i는 반복하며 올라가는 고유의 수 ex) 0, 1, 2
                 */}
                {
                  shoe.map(function (a, i) {
                    return (
                      <Product shoe={shoe[i]} i={i} />
                    )
                  })
                }
              </div>
              {/* 상품 더보기 버튼임 */}
              <button onClick={() => {
                //클릭 했을 때 클릭  state 에 숫자 추가 
                클릭변경(클릭 + 1);
                axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                  // console.log(결과.data)
                  let copy = [...shoe, ...결과.data];
                  shoe변경(copy);
                })
                  .catch(() => {
                    console.log('실패함')
                  })
              }}>더보기</button>
            </div>
          </>
        }></Route>
        {/* detail 상세페이지 여러개 만들때 :id 파라미터 이용하기 */}
        <Route path='/detail/:id' element={<Detail data={data} />}></Route>
        {/* 404페이지 */}
        <Route path='*' element={<div>없는 페이지입니다</div>}></Route>
        {/* nested routes */}
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<h4>첫 주문 시 양배추즙 서비스</h4>}></Route>
          <Route path='two' element={<h4>생일 기념 쿠폰</h4>}></Route>
        </Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  );
}


//Event => 이벤트 정보 컴포넌트 만들기
function Event() {
  return (
    <>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </>
  )
}


// 상품목록 컴포넌트 만들기 
function Product(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4  product-box">
      <div className='overlay' onClick={() => {
        navigate('/detail/' + props.i);

        //최근에 본 상품 localStorage 에 추가하기
        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.push(props.shoe.id);
        watched = new Set(watched);
        watched = Array.from(watched);
        localStorage.setItem('watched', JSON.stringify(watched));

      }}>
        <div className='overlay-black'>
          <p>구매하러 가기!</p>
        </div>
      </div>
      {/* 이미지 담는 박스 */}
      <div className='img-box'>
        {/* 이미지 */}
        <img src={props.shoe.img} width="80%" />
      </div>
      <hr />
      {/* 제품 이름 박스 */}
      <div className='text-box'>
        <h4>{props.shoe.title}</h4>
        {/* <p>{props.shoe.content}</p> */}
        <p>{props.shoe.price}원</p>
      </div>
    </div>
  )
}

export default App;
