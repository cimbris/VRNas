const header = document.querySelector("#header");
const list = header.querySelector("#menuList");
const burger = header.querySelector("#burger");

header.addEventListener("click", (e) => {
    if (e.target.closest("#burger")) {
        list.classList.toggle("active");
        burger.classList.toggle("active");
    }
});
