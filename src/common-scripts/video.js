const playerWrap = document.querySelector("#playerWrapper");

const player = (e) => {
    const isBtn = e.target.closest("#videoBtn");
    if (isBtn) {
        const video = document.querySelector("#video");

        if (video) {
            video.play();
            playerWrap.classList.add("playing");
        }
    }
};

playerWrap.addEventListener("click", (e) => player(e));
