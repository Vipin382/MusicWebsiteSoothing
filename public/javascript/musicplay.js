let audio = document.querySelector("audio");
let seeker = document.querySelectorAll(".seeker");
let varTime = document.querySelector(".varTime");
let totalTime = document.querySelector(".totalTime");
let ranger = document.querySelector(".ranger");
let bar = document.querySelectorAll(".bar");
let totalLengthOfTime = "";

// song info variables
let imgart = document.querySelector(".imgart");
let playicon = document.querySelector(".play");
let sngName = document.querySelector(".sngName");
let sngAlbum = document.querySelector(".sngAlbum");
let playPauseicon = document.querySelector("#contplay");
var prev=0;
function playpausemusic(){
    if(audio.paused){
        audio.play();
        imgart.classList.add("rot");
        for(var i=0;i<bar.length;i++){bar[i].classList.add("anime");}
        playPauseicon.innerHTML ="pause";
        iconchange(pos);
    }else{
        imgart.classList.remove("rot");
        audio.pause();
        for(var i=0;i<bar.length;i++){bar[i].classList.remove("anime");}
        playPauseicon.innerHTML ="play_arrow";
        iconchange(pos);
    }
}
function buzz(index){
    var name = songList[index].name;
    console.log(name);
    pos = index;
    var imgsrc = songList[index].src;
    var albumname = songList[index].album;
    var songsrc = songList[index].songsrc;
    songPlay(name,imgsrc,albumname,songsrc,index);
}
function songPlay(name,imgsrc,albumname,songsrc,index){
    imgart.src = imgsrc;
    sngName.innerHTML = name;
    sngAlbum.innerHTML = albumname;
    let barvisual = document.querySelectorAll(("#barsvisual"+index));
    let playPauseimg = document.querySelector(("#playsngs"+index));
    let letsPlayicon = document.querySelector(("#letsPlayicon"+index));
    if(audio.src==songsrc){}else{audio.src=songsrc}
    if(audio.paused){
        audio.play();
        imgart.classList.add("rot");
        for(var i=0;i<bar.length;i++){bar[i].classList.add("anime");}
        for(var i=0;i<barvisual.length;i++){barvisual[i].classList.add("anime");}
        playPauseimg.innerHTML ="pause";
        playPauseicon.innerHTML ="pause";
        letsPlayicon.innerHTML = "pause";
    }else{
        audio.pause();
        imgart.classList.remove("rot");
        for(var i=0;i<bar.length;i++){bar[i].classList.remove("anime");}
        for(var i=0;i<barvisual.length;i++){barvisual[i].classList.remove("anime");}
        playPauseimg.innerHTML ="play_arrow";
        playPauseicon.innerHTML ="play_arrow";
        letsPlayicon.innerHTML = "play_arrow";
    }

}
function iconchange(index){
    let playPauseimg = document.querySelector(("#playsngs"+index));
    let letsPlayicon = document.querySelector(("#letsPlayicon"+index));
    let barvisual = document.querySelectorAll(("#barsvisual"+index));
    if(audio.paused){
        playPauseimg.innerHTML ="play_arrow";
        playPauseicon.innerHTML ="play_arrow";
        letsPlayicon.innerHTML = "play_arrow";
        for(var i=0;i<barvisual.length;i++){barvisual[i].classList.remove("anime");}
    }else{
        playPauseimg.innerHTML ="pause";
        playPauseicon.innerHTML ="pause";
        letsPlayicon.innerHTML = "pause";
        for(var i=0;i<barvisual.length;i++){barvisual[i].classList.add("anime");}
    }
    prev = index;
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