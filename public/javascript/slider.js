let images = ['BackgroundImg/pixel.jpg','BackgroundImg/pixel2.jpg','BackgroundImg/pixel3.jpg','BackgroundImg/pixel4.jpg','BackgroundImg/pixel5.jpg','BackgroundImg/pixel6.jpg',
'BackgroundImg/pixel7.jpg',
'BackgroundImg/pixel8.jpg','BackgroundImg/pixel9.jpg']
let index = 0;
function change(){
    document.querySelector(".imgsrc").src = images[index];
    index>7?index=0:index++;
}
window.onload = ()=>{
    setInterval(change,3000);
}