const headList = document.querySelector("#headList");
const items = document.querySelectorAll(".head-list__item");

const click = (e) => {
    const isBtn = e.target.closest("[data-btn]");
    const block = isBtn.closest(".head-list__item");

    items.forEach((item) => {
        item.classList.remove("active");
    });

    if (isBtn) {
        if (isBtn.classList.contains("active")) {
            block.classList.remove("active");
            isBtn.classList.remove("active");

            return;
        }
        const buttons = headList.querySelectorAll("[data-btn]");
        buttons.forEach((button) => {
            button.classList.remove("active");
        });
        isBtn.classList.toggle("active");
        block.classList.toggle("active");
    }
};

headList.addEventListener("click", click);
