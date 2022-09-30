// увеличение картинки

function scaleImage(targetEl) {
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.bottom = 0;
    modal.style.right = 0;
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.zIndex = 100;
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.flexDirection = "column";
    modal.style.alignItems = "center";

    let div = document.createElement("div");
    div.style.width = "50%";
    div.style.height = "80%";
    div.style.textAlign = "center";
    let img = document.createElement("img");
    if (targetEl.tagName === "IMG") {
        img.src = targetEl.src;
    } else {
        img.src = targetEl.style.backgroundImage.slice(5, -2);
    }
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";

    div.append(img);
    modal.append(div);
    let close = document.createElement("div");
    close.classList.add("icon_close_button", "close_icon_white");

    close.style.marginLeft = "calc(100% - 25px)";
    close.style.cursor = "pointer";

    div.append(close);
    modal.addEventListener("pointerdown", () => {
        modal.remove();
    });
    document.body.append(modal);
}

// вывод и сброс результатов проверки в панели

function checkingAnswerPositive(controlsBox, infoBox) {
    controlsBox.classList.add("chek_answer_rightChoice_color");
    infoBox.innerHTML =
        '<div class="answer_indicator">&#128516;&nbsp;&nbsp;Молодец!</div>';
}

function checkingAnswerNegative(controlsBox, infoBox) {
    controlsBox.classList.add("chek_answer_wrongChoice_color");

    infoBox.innerHTML =
        '<div class="answer_indicator">&#128528;&nbsp;&nbsp;Попробуй&nbsp;еще!</div>';
}

function checkingAnswerReset(controlsBox, infoBox) {
    controlsBox.classList.remove("chek_answer_wrongChoice_color");
    controlsBox.classList.remove("chek_answer_rightChoice_color");

    infoBox.firstElementChild !== null &&
        infoBox.removeChild(infoBox.firstElementChild);
}

// управление индикацией проверенных элементов

function removeActiveCardClass(card) {
    card.classList.remove("targetChoice_color");
    card.classList.remove("rightChoice_answered");
    card.classList.remove("wrongChoice_answered");
}

function addCheckClass(card) {
    card.classList.add("targetChoice_color");
}

function addRightChoiceClass(card) {
    card.classList.add("rightChoice_answered");
}

function addWrongChoiceClass(card) {
    card.classList.add("wrongChoice_answered");
}


// управление звуком
// пример объекта
/*
 const soundDataAttribute =  "drop-data";
 let soundSetStates = {
  currentAudio: null,
  currentAudioIcon: null,
  isPlaying: false
};
*/
function onSoundIconClick(soundSet, allAudioFiles, audioAttribute) {
    return function (e) {
        if (soundSet.currentAudio && soundSet.currentAudioIcon !== e.target) {
            soundSet.currentAudio.pause();
            soundSet.currentAudio.currentTime = 0;
            soundSet.isPlaying = false;
            soundSet.currentAudioIcon.classList.remove("buttonPlayPause--active");
        }

        e.stopPropagation();
        const audio = [...allAudioFiles].find(
            (el) => el.id === e.target.getAttribute(audioAttribute)
        );

        soundSet.currentAudioIcon = e.target;
        soundSet.currentAudio = audio;
        soundSet.isPlaying ? audio.pause() : audio.play();
        e.target.classList.toggle("buttonPlayPause--active");
        audio.onplaying = function () {
            soundSet.isPlaying = true;
        };
        audio.onpause = function () {
            soundSet.isPlaying = false;
        };
        audio.onended = function () {
            e.target.classList.remove("buttonPlayPause--active");
            soundSet.isPlaying = false;
            soundSet.currentAudio = null;
            soundSet.currentAudioIcon = null;
        };

    }
}

function resetSound(soundSet) {
    if (soundSet.currentAudio && soundSet.currentAudioIcon) {
        soundSet.currentAudio.pause();
        soundSet.currentAudio.currentTime = 0;
        soundSet.isPlaying = false;
        soundSet.currentAudioIcon.classList.remove("buttonPlayPause--active");
    }
}
// рандомайзер объектов
function getRandomPositionToCard(card) {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
}
function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

// кнопки слайдера
/*
let sliderSetStates = {
  sliderItemWidth: null,
  sliderSize: null,
  sliderWrapperSize: null,
  sliderShift: 0
}


  leftBtn.addEventListener("click", () => onBtnLeftClick(sliderSetStates, dragBox, leftBtn, rightBtn), false);
  rightBtn.addEventListener("click", () => onBtnRightClick(sliderSetStates, dragBox, leftBtn, rightBtn), false);
*/

function getBlocksSizes(sliderSet, dragContainer) {
    sliderSet.sliderSize = dragContainer.scrollWidth;
    sliderSet.sliderItemWidth = dragContainer.children[0].clientWidth;
}

function onBtnLeftClick(sliderSet, dragContainer, leftButton, rightButton) {
    getBlocksSizes(sliderSet, dragContainer);

    if (sliderSet.sliderShift < 0) {
        sliderSet.sliderShift += sliderSet.sliderItemWidth;

        dragContainer.style.left = `${sliderSet.sliderShift}px`;
    }
    showArrows(sliderSet, leftButton, rightButton);
}

function onBtnRightClick(sliderSet, dragContainer, leftButton, rightButton) {

    getBlocksSizes(sliderSet, dragContainer);

    if (sliderSet.sliderShift > -sliderSet.sliderSize + sliderSet.sliderWrapperSize) {
        sliderSet.sliderShift -= sliderSet.sliderItemWidth;
        dragContainer.style.left = `${sliderSet.sliderShift}px`;
    }
    showArrows(sliderSet, leftButton, rightButton);
}

function showArrows(sliderSet, leftButton, rightButton) {
    if (sliderSet.sliderShift === 0) {
        leftButton.classList.add("noDisplayElement");
    } else leftButton.classList.remove("noDisplayElement");

    if (sliderSet.sliderShift <= -sliderSet.sliderSize + sliderSet.sliderWrapperSize) {
        rightButton.classList.add("noDisplayElement");
    } else rightButton.classList.remove("noDisplayElement");
}

// кнопки слайдшоу
// пример объекта
/*
 const slideshowParameters = {
    currentShowImg: slideBoxImages[0], // первый слайд
    counter: 1, // начальный счетчик
  };
*/
function changeSlideMoveLeft(
    slideshowParameters, // данные для слайда
    numberOfSlide, //блок, куда пишется цифра
    arrayOfSlides, // массив слайдов
    leftBtn, // кнопка влево, которую скрыть
    rightBtn // кнопка вправо, которую скрыть
) {
    if (slideshowParameters.counter > 1) {
        slideshowParameters.counter -= 1;
        slideshowParameters.currentShowImg.classList.add("visually-hidden");

        slideshowParameters.currentShowImg =
            arrayOfSlides[slideshowParameters.counter - 1];

        slideshowParameters.currentShowImg.classList.remove("visually-hidden");
        numberOfSlide.textContent = slideshowParameters.counter;
        rightBtn.classList.remove("noDisplayElement");
    }

    if (slideshowParameters.counter === 1) {
        leftBtn.classList.add("noDisplayElement");
    }
}

function changeSlideMoveRight(
    slideshowParameters, // данные для слайда
    numberOfSlide, //блок, куда пишется цифра
    arrayOfSlides, // массив слайдов
    leftBtn, // кнопка влево, которую скрыть
    rightBtn // кнопка вправо, которую скрыть
) {
    if (slideshowParameters.counter < arrayOfSlides.length) {
        slideshowParameters.counter += 1;

        leftBtn.classList.remove("noDisplayElement");

        slideshowParameters.currentShowImg.classList.add("visually-hidden");

        slideshowParameters.currentShowImg =
            arrayOfSlides[slideshowParameters.counter - 1];

        slideshowParameters.currentShowImg.classList.remove("visually-hidden");

        numberOfSlide.textContent = slideshowParameters.counter;
    }

    if (slideshowParameters.counter === arrayOfSlides.length) {
        rightBtn.classList.add("noDisplayElement");
    }
}

// сброс стилей и append
function changeStyles(draggingElem) {
    draggingElem.style.position = "relative ";
    draggingElem.style.zIndex = null;
    draggingElem.style.top = null;
    draggingElem.style.left = null;
}

function dragAppend(dropPlace, draggingElem, findIdx) {
    const referenceElement = [...dropPlace.children][findIdx];
    dropPlace.insertBefore(draggingElem, referenceElement);
    changeStyles(draggingElem);
}

function dropAppend(dropPlace, draggingElem) {
    dropPlace.appendChild(draggingElem);
    changeStyles(draggingElem);
}
