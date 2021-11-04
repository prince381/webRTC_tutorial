document.addEventListener('DOMContentLoaded', () => {

    const localVideo = document.querySelector('.local-vid'),
        remoteVideo = document.querySelector('.remote'),
        startWebcamButton = document.querySelector('.start'),
        closeWebcamButton = document.querySelector('.end'),
        tabs = document.querySelector('.tabs'),
        tabPages = document.querySelector('.tab-pages'),
        toMakePageButton = document.querySelector('.make'),
        toJoinPageButton = document.querySelector('.join'),
        copyButton = document.querySelector('.copy'),
        startCallButton = document.querySelector('.startCall');

    closeWebcamButton.classList.add('disabled')

    toJoinPageButton.addEventListener('click',() => {
        toJoinPageButton.style.color = 'cyan';
        toMakePageButton.style.color = '#eee';
        tabs.classList.add('shift-line')
        tabPages.classList.add('shifted')
    })

    toMakePageButton.addEventListener('click',() => {
        toMakePageButton.style.color = 'cyan';
        toJoinPageButton.style.color = '#eee';
        tabs.classList.remove('shift-line')
        tabPages.classList.remove('shifted')
    })

    let localStream, remoteStream, peer;

    const configuration = {
        iceServers: [
            {
                "urls": ["stun:stun.l.google.com:19302", 
                "stun:stun1.l.google.com:19302", 
                "stun:stun2.l.google.com:19302"]
            }
        ]
    }

    const constraints = {
        audio: {
            echoCancellation: true
        },
        video: {
            width: {min: 600, ideal: 1024, max: 1440},
            height: {min: 480, ideal: 720, max: 1080}
        }
    }

    async function startStream() {
        try {
            localStream = await navigator.mediaDevices.getUserMedia(constraints)
            localVideo.srcObject = localStream;

            localVideo.addEventListener('loadedmetadata', () => {
                localVideo.play()
                startWebcamButton.disabled = true;
                startWebcamButton.classList.add('disabled')
                closeWebcamButton.disabled = false;
                closeWebcamButton.classList.remove('disabled')
            })

        } catch(err) {
            console.log(err)
        }
    }

    function stopStream() {
        for (let track of localStream.getTracks()) {
            track.stop()
        }

        localStream = null;
        localVideo.srcObject = null;
        startWebcamButton.disabled = false;
        startWebcamButton.classList.remove('disabled')
        closeWebcamButton.disabled = true;
        closeWebcamButton.classList.add('disabled')
    }

    startWebcamButton.addEventListener('click',startStream)
    closeWebcamButton.addEventListener('click',stopStream)

})