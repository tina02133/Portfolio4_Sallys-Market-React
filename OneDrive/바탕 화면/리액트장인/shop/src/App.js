import logo from './logo.svg';
import './App.css';
// React Bootstrap
import { Button, Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';
// 상품 데이터
import data from './data.js';
// React router
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
// 상품 상세페이지(detail.js) 컴포넌트
import Detail from './detail.js';
// Http 클라이언트 라이브러리 , 서버에 데이터 요청하기 위해 사용
import axios from 'axios'
// 장바구니 페이지 컴포넌트
import Cart from './cart.js'
// 메인페이지 메인슬라이드 컴포넌트
import MainSlide from './mainSlide';
// fontAwsome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons"

function App() {

  // localStorage 에 저장하기
  // localStorage  에는 array / object 자료형을 저장불가.
  // 따라서 JSON 형태로 바꿔주어 저장해야 함
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])


  // import한 상품 data state에 저장하기
  let [item, setItem] = useState(data);
  let navigate = useNavigate();

  // 더보기 버튼 click 횟수 담을 state 
  // click 횟수에 따라 ajax 요청할 데이터 구분 위해서.
  // 3번 click 시, 더이상 보여줄 상품 없다고 알림 띄우기

  let [click, setClick] = useState(0);

  // localStorage 에 있는 상품 가져오기 
  // 여기서 recentWatched은 data.js 에 들어있는 제품의  id 값 배열임
  let recentWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(recentWatched);

  // body 부분 시작
  return (
    <div className="App">
      {/* 메인페이지 상단 이벤트 배너 div */}
      <div class="alert alert-warning" className='alert' onClick={() => { navigate('/event') }}>지금 주문 시 20% 할인 쿠폰 증정! click!</div>
      {/* 메인페이지 Navbar */}
      <Navbar bg="light" expand="lg" className='nav'>
        {/* 웹페이지 로고 */}
        <Navbar.Brand className="navbar-brand" onClick={() => { navigate('/') }}>Sally's Market</Navbar.Brand>
        {/* 웹페이지 메뉴 */}
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
                size="m"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* recentWatched 컴포넌트 */}
      <RecentWatched className="" item={item} recentWatched={recentWatched} navigate={navigate} />

      {/* Router 사용하여 페이지 나누기  */}
      <Routes>
        <Route path="/" element={
          <>
            {/* recentWatched 컴포넌트 */}
            <RecentWatched className="" item={item} recentWatched={recentWatched} navigate={navigate} />
            <MainSlide />
            <div className='main-ment'>
              <p>이 상품 어때요?</p>
            </div>
            <div className='btn-box'>
              <button className='sort-btn' onClick={() => {
                let copy = [...item];
                // 가격 오름차순 정렬
                setItem(copy.sort(function (a, b) {
                  return a.price - b.price;
                }))
              }}>낮은가격순</button>
              <button className='sort-btn' onClick={() => {
                let copy = [...item];
                // 가격 내림차순 정렬
                setItem(copy.sort(function (a, b) {
                  return b.price - a.price;
                }))
              }}>높은가격순</button>
              <button className='sort-btn' onClick={() => {
                let copy = [...item];
                // 한글 가나다 순 정렬
                setItem(copy.sort(function (a, b) {
                  return a.title < b.title ? -1 : a.title > b.name ? 1 : 0;
                }))
              }}>가나다순</button>
            </div>
            <div className="container">
              <div className="row">
                {/* map 반복문 사용 시 {} 로 묶어주기 
                     ()안의 a는 해당 반복회차의  item 데이터를 의미.
                     i는 반복하며 올라가는 고유의 수 ex) 0, 1, 2
                 */}
                {
                  item.map(function (a, i) {
                    return (
                      <Product item={item[i]} i={i} />
                    )
                  })
                }
              </div>
              {/* 상품 더보기 버튼임 */}
              {/* <button onClick={() => {
                //click 했을 때 click  state 에 숫자 추가 
                setClick(click + 1);
                axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                  // console.log(결과.data)
                  let copy = [...item, ...결과.data];
                  setItem(copy);
                })
                  .catch(() => {
                    console.log('실패함')
                  })
              }}>더보기</button> */}
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


// 최근 본 상품 컴포넌트
function RecentWatched(props) {
  return (
    <>
      <div className='watched'>
        <div className='cart-count'>
          cart
        </div>
        <div className='watched-item'>
          최근 본 상품
        </div>
        {
          props.item.map((a, i) => {
            // recentWatched 이라는 배열에 a.id 값이 포함되어 있다면
            if (props.recentWatched.includes(a.id)) {
              // a.img 내놔라
              return <div className='watched-img' onClick={() => { props.navigate('/detail/' + a.id) }}>
                <img src={a.img}></img>
              </div>
            }
          })
        }
        <div className='down-btn'>
          ⬇️
        </div>
      </div>
    </>
  )
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
  // 제품가격
  let price = props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div className="col-md-3  product-box">
      <div className='overlay' onClick={() => {
        navigate('/detail/' + props.item.id);

        //최근에 본 상품 localStorage 에 추가하기
        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.push(props.item.id);
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
        <img src={props.item.img} width="80%" />
      </div>
      <hr />
      {/* 제품 이름 박스 */}
      <div className='text-box'>
        {/* 제품명 */}
        <h5>{props.item.title}</h5>
        {/* 제품가격 */}
        <p>{price}원</p>
      </div>
    </div>
  )
}

export default App;
