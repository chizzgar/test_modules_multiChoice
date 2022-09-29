export function renderSlideShow_1(sliderContent, taskId) {
  const taskWrapper = document.querySelector(`#${taskId}`);
  const leftBtn = taskWrapper.querySelector(".gallery_arrow_left");
  const rightBtn = taskWrapper.querySelector(".gallery_arrow_right");
  const sliderBox = taskWrapper.querySelector(".slideShow_1_Content");
  const actualSlideNum = taskWrapper.querySelector(
    ".slideShow_1_Counter-actual"
  );
  const allSlideNum = taskWrapper.querySelector(".slideShow_1_Counter");

  const cardsMarkup = createPictureCardsMarkup(sliderContent);
  sliderBox.insertAdjacentHTML("beforeend", cardsMarkup);

  const slideBoxImages = taskWrapper.querySelectorAll(".slideShow_1_Box");

  allSlideNum.textContent = sliderContent.length;
  leftBtn.classList.add("noDisplayElement");

  const slideshowParameters = {
    currentShowImg: slideBoxImages[0], // первый слайд
    counter: 1, // начальный счетчик
  };

  actualSlideNum.textContent = slideshowParameters.counter;

  leftBtn.addEventListener("click", onBtnLeftClick);
  rightBtn.addEventListener("click", onBtnRightClick);

  sliderBox.addEventListener("click", onSliderContentClick);

  function onSliderContentClick(e) {
    if (e.target.classList.contains("slideShow_1_ImgBox")) {
      scaleImage(e.target);
    }
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        const isVisible = index === 0 ? "" : "visually-hidden";

        const isSoundOne =
          picture.audioSrc &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play slideShow_1_audio_image" drop-data="${picture.id}${taskId}">
          <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
          <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
          <audio class="slideShow_1_audio" id="${picture.id}${taskId}" src=${picture.audioSrc} style="display:none !important">
                Your browser does not support the <code>audio</code> element.
              </audio>
        </div>`;

        const isText =
          picture.text && `<div class="slideShow_1_Text">${picture.text}</div>`;

        return `<div class='slideShow_1_Box ${isVisible}'>
                    <div class='slideShow_1_ImgBox' style='background-image: url(${picture.imgSrc})'></div>
                    ${isSoundOne}
                    ${isText}
                    </div>
                    `;
      })
      .join("");
  }
  const audioFiles = taskWrapper.querySelectorAll(".slideShow_1_audio");
  const audioIcons = taskWrapper.querySelectorAll(
    ".buttonPlayPausePlayPause_wrap"
  );

  [...audioIcons].forEach((el) => {
    el.addEventListener("click", onSoundIconClick);
  });

  let currentAudio;
  let currentAudioIcon;
  let isPlaying = false;

  function onSoundIconClick(e) {
    if (currentAudio && currentAudioIcon !== e.target) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      isPlaying = false;
      currentAudioIcon.classList.remove("buttonPlayPause--active");
    }

    e.stopPropagation();
    const audio = [...audioFiles].find(
      (el) => el.id === e.target.getAttribute("drop-data")
    );

    currentAudioIcon = e.target;
    currentAudio = audio;
    isPlaying ? audio.pause() : audio.play();
    e.target.classList.toggle("buttonPlayPause--active");
    audio.onplaying = function () {
      isPlaying = true;
    };
    audio.onpause = function () {
      isPlaying = false;
    };
    audio.onended = function () {
      e.target.classList.remove("buttonPlayPause--active");
      isPlaying = false;
      currentAudio = null;
      currentAudioIcon = null;
    };
  }

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

  function onBtnLeftClick(e) {
    resetSound(currentAudio);

    changeSlideMoveLeft(
      slideshowParameters, // данные для слайда
      actualSlideNum, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      leftBtn, // кнопка влево, которую скрыть
      rightBtn // кнопка вправо, которую скрыть
    );
  }

  function resetSound(currentSound) {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      currentSound = null;
      currentAudioIcon.classList.remove("buttonPlayPause--active");
    }
  }

  function onBtnRightClick(e) {
    resetSound(currentAudio);
    changeSlideMoveRight(
      slideshowParameters, // данные для слайда
      actualSlideNum, //блок, куда пишется цифра
      slideBoxImages, // массив слайдов
      leftBtn, // кнопка влево, которую скрыть
      rightBtn // кнопка вправо, которую скрыть
    );
  }

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
      img.src = targetEl.imgSrc;
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
    modal.addEventListener("click", () => {
      modal.remove();
    });
    document.body.append(modal);
  }
}

export default renderSlideShow_1
