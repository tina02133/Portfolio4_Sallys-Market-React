import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container,Nav} from 'react-bootstrap';
import data from './data.js';
import { useState } from 'react';
import {Routes, Route, Link } from 'react-router-dom'
import Detail from './detail';

function App(){ 

  // import한 상품 data state에 저장하기
  let [shoe] = useState(data);
  

  return (
    <div className="App">
       <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* Link 사용하여 버튼 클릭 시 원하는 페이지로 이동하기 */}
      <Link to="/">메인페이지</Link>
      <Link to="/detail">상세페이지</Link>
      {/* Router 사용하여 페이지 나누기  */}
      <Routes>
        <Route path="/" element={
          <>
             <div className="main-bg"></div>
             <div className="container">
               <div className="row">
                 {/* map 반복문 사용 시 {} 로 묶어주기 
                     ()안의 a는 해당 반복회차의  shoe 데이터를 의미.
                     i는 반복하며 올라가는 고유의 수 ex) 0, 1, 2
                 */}
                 {
                   shoe.map(function(a, i){
                   return(
                     <Product shoe = {shoe[i]} i = {i}/>
                   )
                 })
               }
               </div>
             </div>
          </>
        }></Route>
        <Route path='/detail' element={
          <Detail/>
          }>
        </Route>
      </Routes>
    </div>
  );
}

// 상품목록 컴포넌트 만들기 
function Product(props){
  return(
    <div className="col-md-4">
    <img src={"https://codingapple1.github.io/shop/shoes"+ (props.i+1) + ".jpg"} width="80%"/>
    <h4>{props.shoe.title}</h4>
    <p>{props.shoe.content}</p>
    <p>{props.shoe.price}</p>
  </div>
  )
}

export default App;
