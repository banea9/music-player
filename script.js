const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
//songs
const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;

loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playAudio() {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(event) {
  console.log(event);
  const { duration, currentTime } = event.srcElement;
  let progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//Event Listeners

playBtn.addEventListener("click", playAudio);

prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)