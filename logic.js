audio = new Audio('music.mp3');
audioGameOver = new Audio('gameover.mp3');

const increseX = 5;
let buildingSpeed = 2;
const robo = document.querySelector('.robo');
const building = document.querySelector('.building');
const gameContainer = document.querySelector('.game-container');
let score = 0;
audio.play();

function speedIncrease() {
    if(buildingSpeed < 7){
    buildingSpeed = buildingSpeed + 0.5;
   }
}
setInterval(speedIncrease, 4300)
 
function buildingAnimation() {
     let leftValue = Number.parseInt(building.style.left);

     let backGroundLeft = Number.parseInt(gameContainer.style.backgroundPositionX);
     // console.log(backGroundLeft)
        // gameContainer.style.backgroundPositionX = backGroundLeft - (buildingSpeed * 2) + 'px';

        if(leftValue<=0){
            leftValue = 100;
        }
        building.style.left = leftValue -  buildingSpeed + '%';
        console.log(buildingSpeed);
}
setInterval(buildingAnimation, 100)

function pause () {
    // clearInterval(buildingAnimation);
    console.log('you have clicked')
}
document.onkeydown = function (e) {
    // console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        robo.classList.add('roboAni');
        setTimeout(() => {
            robo.classList.remove('roboAni')
        }, 1100);
    }
    if(e.keyCode == 39 || e.keyCode == 37){
        let leftValue = Number.parseInt(robo.style.left);
        if((e.keyCode == 37 && leftValue<=0) || (e.keyCode == 39 && leftValue>=80))return;
        robo.style.left = leftValue + (e.keyCode  == 37 ? -increseX : increseX)+ '%';
    }
};

function collusionDetect() {
    const buildingLeft = Number.parseInt(building.style.left);
    const roboLeft = Number.parseInt(robo.style.left);
    const roboBottom = Number.parseInt(getComputedStyle(robo).bottom);
    const buildingHeight = Number.parseInt(getComputedStyle(building).height);
    
    // console.log(buildingHeight);
    // console.log(roboBottom);
    // console.log(buildingLeft - roboLeft); 
   if((Math.abs(buildingLeft - roboLeft) < 3.5) && roboBottom < buildingHeight){
    // console.log('collide');
    clearInterval(colustionInterval);
    // let heading = document.querySelector('.name-heading');
    // heading.innerText = 'Game Over-Reload to Start again!'
    audioGameOver.play();
    alert('You lose');
    location.reload();
   }
   // if(buildingLeft - roboLeft < 5){
   //      let scoreSpan = document.querySelector('.score-span');
   //      score = score + 1;
   //      scoreSpan.innerText = 'Score : ' + score;
   // }

}
// collusionDetect();
const colustionInterval = setInterval(collusionDetect, 100);

function updateScore(argument) {
    const buildingLeft = Number.parseInt(building.style.left);
    const roboLeft = Number.parseInt(robo.style.left);
    let scoreSpan = document.querySelector('.score-span');
    if(Math.abs(buildingLeft - roboLeft) < 25){
        score = score + 1;
        scoreSpan.innerText =(score < 10) ?  'Score : ' + "0" + score :  'Score : ' + score;
   }
}
setInterval(updateScore, 1500);

// document.onkeydown = function (e) {
//     if(e.keyCode == 32){
//        console.log('space')
//     let pauseRobo = document.querySelector('.robo').classList.toggle('roboAni');
//     let pausebuilding = document.querySelector('.building').classList.toggle('buildingAnimation');
//     }
// } 
        

    

    // e.keyCode == 37 ; true ya false
    // 39 true
    // 0 false