const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs', 
    host: '/', 
    port: '3030'
});

const getMedia = async () => {
    try {
        return await navigator.mediaDevices.getUserMedia({audio: true, video: true});    
    }
    catch(e) {
        console.log('error', e);
    }
}


getMedia().then(stream => {
    addVideoStream(myVideo, stream);
    // Answer call from new user
    peer.on('call', call => {
        console.log('answering call from new user');
        call.answer(stream);
        const video = documnent.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        })
    })

    // Pass stream to socket
    // Clients receive notif that a new user has joined the room
    socket.on('user-connected', (userId) => { // userId is new user
        console.log('new user is ', userId);
        connectToNewUser(userId, stream);
})
})

// Open peer connections
peer.on('open', id => {
    // Send to server that a user has joined room
    console.log('A user has joined');
    socket.emit('join-room', ROOM_ID, id);

})

const connectToNewUser = (userId, stream) => {
    console.log(`new user ${userId} joined`);
    // Call other user using peer
    var call = peer.call(userId, stream);
    const video = document.createElement('video'); // create video for the other user and add them to your stream
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
}
// Connect video element with stream 
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}