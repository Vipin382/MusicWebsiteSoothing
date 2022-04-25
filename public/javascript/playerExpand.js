document.getElementById("check1").addEventListener('change',()=>{
    document.querySelector(".player").classList.toggle('active');
    document.querySelector(".info").classList.toggle('active');
    document.querySelector(".control").classList.toggle('active');
    document.querySelector(".expand").classList.toggle('active');
});