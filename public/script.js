const videoGrid = document.getElementById('video-grid');
console.log(videoGrid);
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream;

// Use navigator to get video 
// navigator.mediaDevices.getUserMedia({ // return promise
//     audio: true,
//     video: true
// })
// .then(stream => {
//     myVideoStream = stream;
//     addVideoStream(myVideo, stream);
// }) 
// .catch(e => {
//     console.log('error', e);
// })

const getMedia = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        addVideoStream(myVideo, stream);
    }
    catch(e) {
        console.log('error', e);
    }
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

getMedia();