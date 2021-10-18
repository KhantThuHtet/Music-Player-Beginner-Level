let trackContainer = document.querySelector(".trackContainer");
let currentAndTotalTime = document.querySelector(".currentAndTotalTime");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector('.progressBar');
let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");
let previousBtn = document.querySelector(".previous");
let nextBtn = document.querySelector(".next");
let audioTag = document.getElementById("audio-tag");
let trackNo = 0;
let currentPlayingIndex = 0;

let trackList = [
  {
    name: "./assets/video/Apologize.mp4",
    title: "Apologize Timbaland - ft. OneRepublic",
  },
  {
    name: "./assets/video/Bad_Liar.mp4",
    title: "Bad Liar - Imagine Dragon",
  },
  {
    name: "./assets/video/device.mp4",
    title: "လှည့်စားလိုက် - Phyu Phyu Kyaw Thein (Cover By Ko Htett)",
  },
  {
    name: "./assets/video/last_sunday.mp4",
    title: "Last Sunday - Unknown Artist",
  },
  {
    name: "./assets/video/remember.mp4",
    title: "Remember Our Summer - FrogMonster (动态歌词/Lyrics)",
  },
];

trackList.map((el, index) => {
  
  trackNo++;
  let trackTag = document.createElement("div");
  trackTag.classList.add("trackTag");
  let trackContent = document.createTextNode(`${trackNo}. ` + el.title);
  trackTag.appendChild(trackContent);
  trackContainer.appendChild(trackTag);

  trackTag.addEventListener("click", () => {
    currentPlayingIndex = index;
    let curretTrackName = el.name;
    audioTag.src = curretTrackName;
    audioTag.play();
    isPlaying = true;
    playPauseBtn(isPlaying);
  });
  
});

let trackDuration = "00:00";
let duration;
audioTag.addEventListener('loadeddata', ()=>{
  duration = Math.floor(audioTag.duration);
  trackDuration = showTime(duration);
});
let trackCurrentTime;
let currentTime;
audioTag.addEventListener('timeupdate', ()=>{
  currentTime = Math.floor(audioTag.currentTime);
  trackCurrentTime = showTime(currentTime);
  currentAndTotalTime.textContent =trackDuration + ' / ' + trackCurrentTime;
  let progressBarWidth = (500/duration) * currentTime;
  progress.style.width = progressBarWidth + 'px';
})

const showTime = (x)=>{
  let seconds = Math.floor(x % 60);
  let minutes = Math.floor(x / 60);

  let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
  let minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
  return minutesText + ':' + secondsText;
}


let isPlaying = false;
playBtn.addEventListener('click', ()=>{
  isPlaying = true;
  
  if (audioTag.currentTime == 0) {
    audioTag.src = trackList[currentPlayingIndex].name;
    audioTag.play();
  } else{
    audioTag.play();
  }
  
  playPauseBtn(isPlaying);
});
pauseBtn.addEventListener('click', ()=>{
  isPlaying = false;
  audioTag.pause();
  playPauseBtn(isPlaying);
});

let playPauseBtn = (isPlaying)=>{
  if (isPlaying) {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  } else {
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
}


previousBtn.addEventListener('click', ()=>{
  if (currentPlayingIndex == 0) {
    return;
  }
  currentPlayingIndex -= 1;
  let songIdToPlay = trackList[currentPlayingIndex].name;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  playPauseBtn(isPlaying);
})
nextBtn.addEventListener('click', ()=>{
  if (currentPlayingIndex == trackList.length-1) {
    return;
  }
  currentPlayingIndex += 1;
  let songIdToPlay = trackList[currentPlayingIndex].name;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  playPauseBtn(isPlaying);
})