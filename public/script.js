const videoGrid = document.getElementById('video-grid');
console.log(videoGrid);
const myVideo = document.createElement('video');
myVideo.muted = true;

const getMedia = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        return stream;
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

getMedia().then(stream => {
    addVideoStream(myVideo, stream);
})
