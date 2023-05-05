// 메인 페이지 이미지 슬라이드 컴포넌트
// 각각 div  dp 슬라이드 이미지 4개 삽입 후, float 효과 주고
// vw 100% 로 해서 자바스크립트로 슬라이드 효과 주도록 하자
let MainSlide = function MainSlide(){

    let 지금사진 = 1;
    return(
       <>
            <div style={{overflow : 'hidden'}}>
                <div id="main-bg" className="main-bg">
                    <div className='slide-img'>
                        <img src={require('./img/야채.jpg')}/>
                    </div>
                    <div className='slide-img'>
                    <img src={require('./img/전자기기.jpg')}/>
                    </div>
                    <div className='slide-img'>
                        <img src={require('./img/야채.jpg')}/>
                    </div>
                    <div className='slide-img'>
                        <img src={require('./img/전자기기.jpg')}/>
                    </div>
                </div>
            </div>
            <div className="slide-btn">
            <button onClick={()=>{
                // 지금 사진이 1번이면 2번 사진 보여주고
                // 지금 사진이 2번이면 3번 사진 보여줘 
                if(지금사진 ==1)
                {
                    document.getElementById('main-bg').style.transform = 'translateX(0vw)';
                }else if(지금사진 ==2){
                    document.getElementById('main-bg').style.transform = 'translateX(-100vw)';
                    지금사진--;

                }else if(지금사진 ==3){
                    document.getElementById('main-bg').style.transform = 'translateX(-200vw)';
                    지금사진--;
                    
                }else if(지금사진 ==4){
                    document.getElementById('main-bg').style.transform = 'translateX(-300vw)';
                    지금사진--;
                }

            }}>이전</button>
            <button onClick={()=>{
                // 지금 사진이 1번이면 2번 사진 보여주고
                // 지금 사진이 2번이면 3번 사진 보여줘 
                if(지금사진 ==1)
                {
                    document.getElementById('main-bg').style.transform = 'translateX(-100vw)';
                    지금사진 +=1;
                }else if(지금사진==2){
                    document.getElementById('main-bg').style.transform = 'translateX(-200vw)';
                    지금사진 +=1;
                }else if(지금사진==3){
                    document.getElementById('main-bg').style.transform = 'translateX(-300vw)';
                    지금사진 +=1;
                }else if(지금사진==4){
                    document.getElementById('main-bg').style.transform = 'translateX(-300vw)';
                }
            }}>다음</button>
            </div>
        </> 
    )
} 

export default MainSlide;