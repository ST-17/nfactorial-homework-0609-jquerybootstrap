let btn = document.getElementById('pauseBtn');
let video = document.getElementById('videoMilan');

let audio = document.getElementById('audio');
let btnAudio = document.getElementById('pauseAudio');

let mute = document.getElementById('muteAudio');

let full = document.getElementById('fullTime');
let current = document.getElementById('currentTime');

let barSize = 200;
let bar = document.getElementById('defaultBar');
let progBar = document.getElementById('progressBar');


audio.addEventListener('loadedmetadata', function(){
    var duration = audio.duration;
    var min = parseInt(duration/60);
    if(min < 10 && min > 0){
        min = '0' + min;
    }
    var sec = parseInt(duration%60);
    if(sec < 10 && sec > 0){
        sec = '0' + sec;
    }
    full.innerHTML = `${min}:${sec}`;
},false);

function update(){
    if(!audio.ended){
        let playedMin = parseInt(audio.currentTime/60);
        if(playedMin < 10 && playedMin > 0){
            playedMin = '0' + playedMin;
        }
        let playedSec = parseInt(audio.currentTime%60);
        if(playedSec < 10){
            playedSec = '0' + playedSec;
        }
        current.innerHTML = `${playedMin}:${playedSec}`;

        
        let size = parseInt(audio.currentTime*barSize/audio.duration);
        progBar.style.width = size + "px";
    }else{
        current.innerHTML = '0:00';
        btnAudio.innerHTML = '<i class="fas fa-play-circle" style="font-size: 30px"></i>';

        progBar.style.width = "0px";
        window.clearInterval(updateTime);
    }
}

function playPause(){
    if(video.paused){
        video.play();
        btn.innerHTML = '<i class="fa fa-pause-circle"></i>';
    }else{
        video.pause();
        btn.innerHTML = '<i class="fa fa-play-circle"></i>';
    }
}

function playPauseAudio(){
    if(audio.paused){
        audio.play();
        btnAudio.innerHTML = '<i class="fas fa-pause-circle" style="font-size: 30px"></i>';
        updateTime = setInterval(update,500);
    }else{
        audio.pause();
        btnAudio.innerHTML = '<i class="fas fa-play-circle" style="font-size: 30px"></i>';
        window.clearInterval(updateTime);
    }
}

function muteAudio(){
    if(audio.volume == 1){
        audio.volume = 0;
        mute.innerHTML = '<i class="fas fa-volume-mute" style="font-size: 30px"></i>';
    }else{
        audio.volume = 1;
        mute.innerHTML = '<i class="fas fa-volume-up" style="font-size: 30px"></i>';
    }
}

bar.addEventListener('click',clickedBar,false);

function clickedBar(e){
    if(!audio.ended){
        let mouseX = e.pageX - bar.offsetLeft;
        let newTime =  mouseX*audio.duration/barSize;

        audio.currentTime = newTime;
        progBar.style.width = mouseX + 'px';
    }
}