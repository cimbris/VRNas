class Slider {
    sliderElement = null;
    lenta = null;
    sliderAmount = 0;
    currentSlideCounter = 0;
    currentSlideWidth = 0;
    paginationList = null;
    startPoint = 0;
    endPoint = 0;
    minMove = 50;

    constructor(selector, arrowsStatus) {
        this.selector = selector;
        this.arrows = arrowsStatus;
        this._initial();
    }

    _initial() {
        this.sliderElement = document.querySelector(this.selector);

        const wrapperHidden = this.#wrapperCreator();
        this.sliderElement.append(wrapperHidden);
        console.log(this.arrows);

        if (this.arrows) {
            const { leftArrow, rightArrow } = this.#arrowsCreator();
            this.sliderElement.append(leftArrow, rightArrow);
        }

        const paginationWrapper = this.#paginationCreator();
        this.sliderElement.append(paginationWrapper);

        this.paginationList =
            this.sliderElement.querySelectorAll("[data-pagination]");

        this.#eventHandler();
    }

    #eventHandler() {
        this.sliderElement.addEventListener("click", (e) => {
            const isRightArrow = e.target.closest('[data-arrow="right"]');
            const isLeftArrow = e.target.closest('[data-arrow="left"]');
            const isPaginationBtn = e.target.closest("[data-pagination]");

            if (isPaginationBtn) {
                this.#pagination(isPaginationBtn);
                this.#slideMotion();
            }

            if (isRightArrow) {
                this.#directionChoice("right");
            } else if (isLeftArrow) {
                this.#directionChoice("left");
            }
        });

        this.sliderElement.addEventListener("mousedown", (e) =>
            this.startHandler(e)
        );
        this.sliderElement.addEventListener("mouseup", (e) =>
            this.endHandler(e)
        );
        this.sliderElement.addEventListener("touchstart", (e) =>
            this.startHandler(e)
        );
        this.sliderElement.addEventListener("touchend", (e) =>
            this.endHandler(e)
        );
    }

    swipe() {
        const currentMove = this.startPoint - this.endPoint;
        if (Math.abs(currentMove) > this.minMove) {
            if (currentMove > 0) {
                this.#directionChoice("right");
            } else {
                this.#directionChoice("left");
            }
        }
    }

    startHandler(e) {
        this.startPoint = e.type.includes("mouse")
            ? e.clientX
            : e.touches[0].clientX;
    }

    endHandler(e) {
        this.endPoint = e.type.includes("mouse")
            ? e.clientX
            : e.changedTouches[0].clientX;
        this.swipe();
    }

    #styleHandler(btnIndex) {
        const activeBtn = this.paginationList[btnIndex];

        for (let i = 0; i < this.paginationList.length; i++) {
            this.paginationList[i].classList.remove("active");
        }

        activeBtn.classList.add("active");
    }

    #pagination(btn) {
        const paginationArray = Array.from(this.paginationList);
        const btnIndex = paginationArray.indexOf(btn);

        this.currentSlideCounter = btnIndex;

        return paginationArray;
    }

    #slideMotion() {
        this.lenta.style.transform = `translateX(-${this.currentSlideCounter * this.currentSlideWidth}px)`;

        this.#styleHandler(this.currentSlideCounter);
    }

    #directionChoice(direction) {
        if (direction == "right") {
            this.currentSlideCounter =
                this.currentSlideCounter < this.sliderAmount - 1
                    ? this.currentSlideCounter + 1
                    : 0;
        } else if (direction == "left") {
            this.currentSlideCounter =
                this.currentSlideCounter > 0
                    ? this.currentSlideCounter - 1
                    : this.sliderAmount - 1;
        }
        this.#slideMotion();
    }

    #wrapperCreator() {
        const wrapperHidden = document.createElement("div");
        wrapperHidden.classList.add("wrapper-hidden");
        this.lenta = document.createElement("div");
        this.lenta.classList.add("lenta");
        this.sliderAmount = this.sliderElement.children.length;
        this.currentSlideWidth = this.sliderElement.children[0].offsetWidth;
        this.lenta.append(...this.sliderElement.children);
        wrapperHidden.append(this.lenta);
        return wrapperHidden;
    }

    #arrowsCreator() {
        const leftArrow = document.createElement("button");
        leftArrow.classList.add(...["arrow", "arrow-left"]);
        leftArrow.setAttribute("data-arrow", "left");

        const rightArrow = document.createElement("button");
        rightArrow.classList.add(...["arrow", "arrow-right"]);
        rightArrow.setAttribute("data-arrow", "right");

        return { leftArrow, rightArrow };
    }

    #paginationCreator() {
        const paginationWrapper = document.createElement("div");
        paginationWrapper.classList.add("pagination-wrapper");

        for (let i = 0; i < this.sliderAmount; i++) {
            const paginationBtn = document.createElement("button");
            const labelBtn = document.createElement("label");

            if (i === 0) {
                paginationBtn.classList.add("active");
            }
            paginationBtn.classList.add("pagination-btn");
            labelBtn.classList.add("label-btn");
            paginationBtn.setAttribute("data-pagination", "");
            labelBtn.append(paginationBtn);
            paginationWrapper.append(labelBtn);
        }

        return paginationWrapper;
    }
}

const ourSlider = new Slider("#slider", false);
console.log(ourSlider);
