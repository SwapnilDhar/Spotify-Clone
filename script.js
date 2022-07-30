console.log("Hello");
//Initialise the variables
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Die Hard", filePath: "songs/song1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Movies", filePath: "songs/song2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Summer Child", filePath: "songs/song3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Out Of Time", filePath: "songs/song4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Matilda", filePath: "songs/song5.mp3", coverPath: "covers/cover5.png" },
    { songName: "Left And Right", filePath: "songs/song6.mp3", coverPath: "covers/cover6.jpg" },
    { songName: "Comedy", filePath: "songs/song7.mp3", coverPath: "covers/cover7.png" }
]

songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Play/Pause Song
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener("timeupdate", () => {
    console.log("timeupdate");
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log("progress");
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        // console.log(e.target);
        makeAllPlays();
        let songIndex = parseInt(e.target.id);
        songIndex = songIndex + 1;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = "songs/song" + songIndex + ".mp3";
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >=7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = "songs/song" + songIndex + ".mp3";
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex<=0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = "songs/song" + songIndex + ".mp3";
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
