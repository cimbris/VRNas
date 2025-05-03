const header = document.querySelector("#header");

const headerScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 30) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
};

window.addEventListener("scroll", headerScroll);
