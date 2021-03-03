
    var player;

    const startBtn = document.querySelector('.video__play');
    const videoSplash = document.querySelector('.video__splash');
    const videoSplashPlayBtn = document.querySelector('.video__splash-play-btn');
    const playerContainer = document.querySelector('.video__player');
    const videoDuration = document.querySelector('.video__time-duration');
    const videoCurrentTime = document.querySelector('.video__time-completed');
    const videoPlaybackBar = document.querySelector('.video__playback-bar');
    const videoPlaybackDot = document.querySelector('.video__playback-dot');

    var eventsInit = e => {
        startBtn.addEventListener('click', () => {

            if (!playerContainer.classList.contains('video__player--active')) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        });

        videoPlaybackBar.addEventListener('click', e => {
            const clickedPos = e.layerX;
            const barWidth = videoPlaybackBar.clientWidth;
            
            const newBtnPosPercent = (clickedPos / barWidth) * 100;
            const newBtnPosSec = (player.getDuration() / 100) * newBtnPosPercent;

            videoPlaybackDot.style.left = `${newBtnPosPercent}%`;

            player.seekTo(newBtnPosSec);
        });

        videoSplashPlayBtn.addEventListener('click', () => {
            player.playVideo();
        });
    }

    const formatTime = timeSec => {
        const roundTime = Math.round(timeSec);

        const minutes = addZero(Math.floor(roundTime / 60));
        const seconds = addZero(roundTime - minutes * 60);

        function addZero(num) {
            return num < 10 ? `0${num}` : num;
        }

        return `${minutes}:${seconds}`;
    }

    const onPlayerReady = () => {
        let interval;
        const durationSec = player.getDuration() - 1;

        videoDuration.textContent = formatTime(durationSec);

        if(typeof interval !== "undefined") {
            clearInterval(interval);
        }

        interval = setInterval(() => {
            const completedSec = player.getCurrentTime();
            const completedPercent = completedSec / durationSec * 100;
            videoPlaybackDot.style.left = `${completedPercent}%`;
            videoCurrentTime.textContent = formatTime(completedSec);
        }, 1000);
    }

    const onPlayerStateChange = e => {
        /*
        -1 (воспроизведение видео не начато)
        0 (воспроизведение видео завершено)
        1 (воспроизведение)
        2 (пауза)
        3 (буферизация)
        5 (видео подают реплики).
        */

        switch (e.data) {
            case 0:
                playerContainer.classList.remove('video__player--active');
                startBtn.classList.remove('video__play--active');
                videoSplash.classList.remove('video__splash--active');
                break;

            case 1:
                playerContainer.classList.add('video__player--active');
                startBtn.classList.add('video__play--active');
                videoSplash.classList.add('video__splash--active');
                break;

            case 2:
                playerContainer.classList.remove('video__player--active');
                startBtn.classList.remove('video__play--active');
                videoSplash.classList.remove('video__splash--active');
                break;
        }
    };

    function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'gvYNxcZQ3B4',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
    }

    eventsInit();

