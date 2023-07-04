console.log("Welcome to Spotify");


let songIndex = 0;
// by default phla gaana chlega
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
// HTML collection islea array from use hua



let songs = [
    {songName: "Aankho se Batana (Heartbreak Version)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Aankh Marey - Simmba", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Oh Ho Ho Ho - Sukhbir Randhawa", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Prem ki naiyya - Pritam", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Pehli Dafa - Atif Aslam", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Amplifier - Imran Khan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Let me love you - Justin Beiber", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Arcade - Duncan Laurence", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Industry Baby - Lil Nas X ", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Fairytale - Alexander Rybak", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]


// naam and photo aa gye ab and access bhi h
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 



// Handle play/pause click -- cz phle play to ho jae song
// 2 case ya toh play ho song ya nhi
// gif is id -- jisse opacity on and off
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// audio element m time update -- not master play
// update seekbar ki kitne % chl chuki hai ye (parseInt se int val mil rhi)
audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})


// seekbar change -- audio bhi change ho
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


// sb 10 icon ko play bna dega -- aap koisa bhi chla skte
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// play button in list name chl jae uske liye hai
// HTML se lo islea array from  use hua
// e jiss pr click hua
// target se vo mil jaega jis pr click hua
// click krte hi unn 10 meh se -- play ho jaana chahiye
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        // jonsa song play krna
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        // play hote hi opacity 1 (upar vale ki click)
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    // aage click -- toh niche naam bhi change ho jae
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})