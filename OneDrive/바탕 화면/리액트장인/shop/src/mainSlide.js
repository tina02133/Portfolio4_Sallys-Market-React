import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontAwsome import
import {faForward,faBackward} from "@fortawesome/free-solid-svg-icons"

// 메인 페이지 이미지 슬라이드 컴포넌트
// 각각 div  dp 슬라이드 이미지 4개 삽입 후, float 효과 주고
// vw 100% 로 해서 자바스크립트로 슬라이드 효과 주도록 하자
let MainSlide = function MainSlide(){

    let showPhoto = 1;
    return(
       <>
            <div style={{overflow : 'hidden'}}>
                <div id="main-bg" className="main-bg">
                    <div className='slide-box'>
                        <p className="img-on-text">이제 <span style={{color:"bisque"}}>식단 관리</span>도<br/>한손마켓에서!<br/>
                        <span className="sale-text">5/1~5/31 한달간 샐러드 구매 시 10% 할인!</span>
                        </p>
                        <img src={require('./img/야채.jpg')}/>
                    </div>
                    <div className='slide-box'>
                        <p className="img-on-text">전자 기기 구매도<br/>한손마켓에서!<br/>
                        <span className="sale-text">요즘 제일 핫한 전자기기 악세서리 보러가기</span>
                        </p>
                        <img src={require('./img/전자기기.jpg')}/>
                    </div>
                    <div className='slide-box'>
                        <div className="slide-img-box">
                            <img src={require('./img/도시락.jpg')}/>
                        </div>
                        <div className="slide-text-box">
                            <p>가정의 달 한달 간,<br/> 2만원으로 가득 담자!<br/>
                            <span className="sale-text">5/1~5/31 한달간 샐러드 구매 시 10% 할인!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-btn">
            <FontAwesomeIcon icon={faBackward} className="faBackward" onClick={()=>{
                // 지금 사진이 1번이면 2번 사진 보여주고
                // 지금 사진이 2번이면 3번 사진 보여줘 
                if(showPhoto ==1)
                {
                    document.getElementById('main-bg').style.transform = 'translateX(0vw)';
                }else if(showPhoto ==2){
                    document.getElementById('main-bg').style.transform = 'translateX(-100vw)';
                    showPhoto--;

                }else if(showPhoto ==3){
                    document.getElementById('main-bg').style.transform = 'translateX(-200vw)';
                    showPhoto--;         
                }
            }} />
            <FontAwesomeIcon icon={faForward} className="faForward" onClick={()=>{
                // 지금 사진이 1번이면 2번 사진 보여주고
                // 지금 사진이 2번이면 3번 사진 보여줘 
                if(showPhoto ==1)
                {
                    document.getElementById('main-bg').style.transform = 'translateX(-100vw)';
                    showPhoto +=1;
                }else if(showPhoto==2){
                    document.getElementById('main-bg').style.transform = 'translateX(-200vw)';
                    showPhoto +=1;
                }else if(showPhoto==3){
                    document.getElementById('main-bg').style.transform = 'translateX(-200vw)';
                    // showPhoto +=1;
                }
            }}/>
            </div>
        </> 
    )
} 
export default MainSlide;