let player = document.querySelector(".player");
let check1 = document.querySelector(".exp");
let audio = document.querySelector("audio");
let bar = document.querySelectorAll(".bar");
let seeker = document.querySelectorAll(".seeker");
let varTime = document.querySelector(".varTime");
let totalTime = document.querySelector(".totalTime");
let ranger = document.querySelector(".ranger");
let imgart = document.querySelector(".imgart");
let sngName = document.querySelector(".sngName");
let sngAlbum = document.querySelector(".sngAlbum");
let totalLengthOfTime = "";
function playMusic(index){
    let playPauseimg = document.querySelector(".play"+index);
    if(audio.paused){
        audio.play();
        imgart.classList.add("rot");
        for(var i=0;i<bar.length;i++){bar[i].classList.add("anime");}
        playPauseimg.innerHTML ="pause";
    }else{
        imgart.classList.remove("rot");
        audio.pause();
        for(var i=0;i<bar.length;i++){bar[i].classList.remove("anime");}
        playPauseimg.innerHTML ="play_arrow";
    }
}
audio.addEventListener("timeupdate",(e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    seeker[0].style.width = `${progressWidth}%`;
    //update total time
    let audioDuration = audio.duration;
    let totalMin = Math.floor(audioDuration/60);
    let totalSec = Math.floor(audioDuration%60);
    if(totalSec<10){
        totalSec = `0${totalSec}`;
    }
    totalTime.innerHTML = `${totalMin}:${totalSec}`;
    totalLengthOfTime = `${totalMin}:${totalSec}`;
    //updating current time
    let currMin = Math.floor(currentTime/60);
    let currSec = Math.floor(currentTime%60);
    if(currSec<10){
        currSec = `0${currSec}`;
    }
    varTime.innerHTML = `${currMin}:${currSec}`
});
ranger.addEventListener("click",(e)=>{
    let progressWidthval = ranger.clientWidth;
    let clickedoffSetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickedoffSetX/progressWidthval)*songDuration;
});
function trendPlay(index){
    audio.src = songList[index].songsrc;
    imgart.src = songList[index].src;
    sngName.innerHTML = songList[index].name;
    sngAlbum.innerHTML = songList[index].album;
    playMusic(index);
}
function letsPlayMusic(index){
    audio.src = songList[index].songsrc;
    imgart.src = songList[index].src;
    sngName.innerHTML = songList[index].name;
    sngAlbum.innerHTML = songList[index].album;
    if(audio.paused){
        document.querySelector(`${"#letsPlayicon"+index}`).innerHTML ="pause";
        document.querySelector(`${"#itemrange"+index}`).innerHTML = totalLengthOfTime;
        let bar1 = document.querySelectorAll(`${"#barsvisual"+index}`);
        for(var i=0;i<bar1.length;i++){bar1[i].classList.add("anime");}
        audio.play();
    }else{
        for(var i=0;i<bar1.length;i++){bar1[i].classList.remove("anime");}
        document.querySelector(`${"#letsPlayicon"+index}`).innerHTML ="play_arrow";
        audio.pause();
    }
}



