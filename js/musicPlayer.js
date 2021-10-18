let trackContainer = document.querySelector(".trackContainer");
let audioTag = document.querySelector(".audio-tag");
let currentAndTotalTime = document.querySelector(".currentAndTotalTime");
let progressWidth = document.querySelector(".progress");
let previous = document.querySelector(".previous");
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let next = document.querySelector(".next");
let currentPlayingTrack = 0;
let isPlaying = false;

let trackObj = [
  { name: "Apologize.mp4", title: "Apologize - Timbaland ft. OneRepublic" },
  { name: "Bad_liar.mp4", title: "Bad Liar - Imagine Dragons" },
  {
    name: "device.mp4",
    title: "Device - Phyu Phyu Kyaw Thein - Covered by Ko Htet",
  },
  { name: "last_sunday.mp4", title: "Last Sunday - Unknown artist" },
  {
    name: "remember.mp4",
    title: "Remember Our Summer - FrogMonster (动态歌词/Lyrics)",
  },
];

let trackTag;

for (let i = 1; i <= trackObj.length; i++) {
  
  trackTag = document.createElement("div");
  trackTag.classList.add("trackTag");
  trackContainer.appendChild(trackTag);
  trackTag.textContent = i + ". " + trackObj[i - 1].title;
  let trackName = trackObj[i - 1].name;
  trackTag.addEventListener("click", () => {
    currentPlayingTrack = i - 1;
    audioTag.src = `./assets/video/${trackName}`;
    audioTag.play();
  });
}

let durationText = "00:00";
let duration;
audioTag.addEventListener("loadeddata", () => {
  duration = audioTag.duration;
  console.log(duration);
  durationText = showTime(duration);
});
let currentTime;
audioTag.addEventListener("timeupdate", () => {
  currentTime = audioTag.currentTime;
  console.log(Math.floor(currentTime));
  let currentTimeText = showTime(currentTime);
  currentAndTotalTime.textContent = durationText + " / " + currentTimeText;
  progress(duration);
});

function progress() {
  progressBarWidth = (500 / duration) * currentTime;
  progressWidth.style.width = progressBarWidth + "px";
}
function showTime(x) {
  let seconds = Math.floor(x % 60);
  let minutes = Math.floor(x / 60);
  let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
  let minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
  return minutesText + ":" + secondsText;
}
play.addEventListener("click", () => {
  isPlaying = true;
  console.log(currentPlayingTrack);
  if (audioTag.currentTime == 0) {
    console.log(trackObj[currentPlayingTrack]);
    currentTrackName = trackObj[currentPlayingTrack].name;
    
    audioTag.src = `./assets/video/${currentTrackName}`;
    audioTag.play();
    if (isPlaying) {
      pause.style.display = "inline";
      play.style.display = "none";
    }
  } else {
    audioTag.play();
    if (isPlaying) {
      pause.style.display = "inline";
      play.style.display = "none";
    }
  }
});
pause.addEventListener("click", () => {
  isPlaying = true;
  audioTag.pause();
  if (isPlaying) {
    pause.style.display = "none";
    play.style.display = "inline";
  }
});

previous.addEventListener("click", () => {
  console.log(currentPlayingTrack)
  if (currentPlayingTrack === 0) {
    return;
  }
  currentPlayingTrack -= 1;
  audioTag.src = `./assets/video/${trackObj[currentPlayingTrack].name}`;
  console.log(audioTag);
  audioTag.play();
  isPlaying = true;
  if (isPlaying) {
    pause.style.display = "inline";
    play.style.display = "none";
  }
});

next.addEventListener("click", () => {
  if (currentPlayingTrack === trackObj.length-1) {
    return;
  }
  currentPlayingTrack += 1;
  audioTag.src = `./assets/video/${trackObj[currentPlayingTrack].name}`;
  console.log(audioTag.src);
  audioTag.play();
  isPlaying = true;
  if (isPlaying) {
    pause.style.display = "inline";
    play.style.display = "none";
  }
});
