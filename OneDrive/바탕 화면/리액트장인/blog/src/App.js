import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

  let post = '강남 우동 맛집';
  // a 자리에  state 이름 자유롭게 작명하고 사용 가능
  // state 쓰는 이유는 state 변경이 일어날을때 state 가 포함된 모든 html을 재렌더링 해주기 때문이다.
  let [글제목,글바꿈] = useState(['남자코트추천', '강남 우동맛집', '파이썬 독학']);

  // destructuring 문법
  // array 안에 있는 데이터들을 변수로 쉽게 저장하고 싶을 때 쓰는 문법
    // 각각의 변수에 각각의 데이터 저장 가능
  let [name, age] = ['Kim', 20]
  
  // state 만들 때 2개까지 작명 가능. 
  // 두번째는 state 변경을 도와주는 함수
  let [따봉,따봉변경] = useState([0,0,0]);

  //모달 상태 변수 만들기
  let [modal, setModal] = useState(false);

  //클릭한 제목에 따라 같은 제목의 모달창 띄우기
  let [title, setTitle] = useState(0);

  // 글발행칸 입력값 담을 state
  let [입력값, 입력값변경 ] = useState('');

  return (
    <div className="App">
     <div className='black-nav'>
      <h4>블로그임</h4>
     </div>
     {/* map 함수를 이용한 반복문 */}
     {
     글제목.map(function(a,i){
      return (
        <div className='list'>
        <h4 onClick={()=>{
         setModal(true);
         setTitle(i); 
        }
        }>{글제목[i]}<span onClick={()=> {
          let 따봉카피 = [...따봉];
          따봉카피[i] = 따봉카피[i] + 1;
          따봉변경(따봉카피)}}>👍</span>{따봉[i]}</h4>
        <button onClick={()=> {
          let copy = [...글제목];
          copy[0] = '여자코트추천';
          글바꿈(copy);
        }}>버튼</button>
        <p>2월 17일 발행</p>
        <button onClick={()=>{
          let 글제목카피 = [...글제목];
          글제목카피.splice(i,1);
          글바꿈(글제목카피);
        }}>삭제</button>
     </div>
      )
     })
    }
        <input onChange={(e)=>{
          입력값변경(e.target.value);
        }}></input>
        <button onClick={()=>{
          let 글제목카피 = [...글제목];
          // unshift() => 배열 요소 맨 앞에 요소 추가
          글제목카피.unshift(입력값);
          글바꿈(글제목카피);
      }}>글발행</button>
        {/* props 사용하기 
            <자식컴토넌트 작명 = {state 이름}  
          */}
        {
          modal==true ? <Modal 글제목 = {글제목} 글바꿈 = {글바꿈} title = {title}  /> : null
        }
    </div>
  );

  // 자식컴포넌트 만드는 function 에서 props 라는 파라미터 등록 후
  // props.작명 사용 
  function Modal(props){
    return(
      <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={
        ()=>{
          props.글바꿈(['여자코트추천', '강남맛집추천', '파이썬독학']);
        }
      }>글수정</button>
    </div>
    )
  }
}

export default App;
