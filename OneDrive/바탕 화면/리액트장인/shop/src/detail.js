import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Nav } from "react-bootstrap"

function Detail(props) {

  // 경로에서 param 네이밍을 id 로 했으니, 변수명을 동일하게 통일해주어야 함 
  let { id } = useParams();
  // let num = props.data[id].id;

  let 찾은상품 = props.data.find(function (x) {
    return x.id == id;
  })

  // 렌더링 2초 이후 div 사라지는 동적인 ui 구현을 위해 state 에 ui 상태값 넣어놓기
  let [박스상태, 박스상태변경] = useState(true);

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

    // clear up function
    // ==> mount 시 실행되는 것이 아닌 unmount 시 실행됨 
    return () => {
      clearTimeout(a)
    }
  });

  return (
    <div className="container">
      {
        박스상태 == true
          ? <div className="alert alert-warning">
            <p>2초 이내 구매 시 10 % 할인</p>
          </div>
          : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} width="80%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  )
}

function TabContent({탭}){
  // if(props.탭 == 0){
  //   return <div className="start end">내용0</div>
  // }else if(props.탭 == 1){
  //   return <div>내용1</div>
  // }else if(props.탭==2){
  //   return <div>내용2</div>
  // }

  let [fade, setFade] = useState('')

  // 탭 state 가 변경이 일어날때마다 fade 라는 state를 end 로 바꿔주세요~
  useEffect(()=>{

    setTimeout(()=>{setFade('end')},100)
    return()=>{
      setFade('')
    }
  }, [탭])

  return (
    <div className={'start ' + fade }>
      {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][탭]}
    </div>
  )

}
export default Detail