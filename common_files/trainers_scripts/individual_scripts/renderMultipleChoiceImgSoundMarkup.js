function renderMultipleChoiceImgSoundMarkup(
  arrayOfElements,
  rightAnswer,
  taskWrapper
) {
  let currentSound;
  let isPlaying = false;

  const arrayLength = arrayOfElements.length;
  const rightAnswersLength = arrayOfElements.filter(
    (el) => el.tag === rightAnswer
  ).length;

  const listContainer = taskWrapper.querySelector(
    ".multiChoicePictureSoundList"
  );

  const btnReset = taskWrapper.querySelector(".resetButton");
  const btnTest = taskWrapper.querySelector(".checkButton");

  const controlsBox = taskWrapper.querySelector(".show-answer-controls");

  const infoBox = taskWrapper.querySelector(".show-answer-info");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  listContainer.addEventListener("click", matchingHandler);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  const audioFiles = taskWrapper.querySelectorAll(".multipleChoice_3-audio");

  [...audioFiles].forEach((el) =>
    el.addEventListener("ended", (e) => {
      e.target
        .closest(".buttonPlayPausePlayPause_wrap")
        .classList.remove("buttonPlayPause--active");
      isPlaying = true;
      resetSound(currentSound);
    })
  );

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

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((item) => {
        let widthItem;
        let heightItem;
        if (arrayLength > 10) {
          widthItem = `"width: calc(100% / 5 - 10px)"`;
          heightItem = "multiChoicePictureSoundCard_small";
        } else if (arrayLength > 8 && arrayLength <= 10) {
          widthItem = `"width: calc(100% / 5 - 20px)"`;
          heightItem = "multiChoicePictureSoundCard_middle";
        } else if (arrayLength > 6 && arrayLength <= 8) {
          widthItem = `"width: calc(100% / 4 - 20px)"`;
          heightItem = "multiChoicePictureSoundCard_middle";
        } else if (arrayLength > 4 && arrayLength <= 6) {
          widthItem = `"width: calc(100% / 3 - 20px)"`;
          heightItem = "multiChoicePictureSoundCard_middle";
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`;
          heightItem = "multiChoicePictureSoundCard_big";
        }

        const isTitle =
          item.title &&
          `<div class='multiChoicePictureSoundTitle'>${item.title}</div>`;

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" sound-data="${item.name}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="multipleChoice_3-audio" id="${item.name}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `<div class="multiChoicePictureSoundCard multiChoicePictureSoundCard_contur oneMultiChoice_border" data=${item.tag} style=${widthItem}>
                  <div class='multiChoicePictureSoundImageBox ${heightItem}' style="background-image: url(${item.src})">
                      <div class="zoom_open_button_white multipleChoice_3-enlarge_picture" title="Увеличить картинку">
                          <div class="icon_zoomPicture whiteZoomImg"></div>
                       </div>
                  </div>

                  ${isSound}
                  ${isTitle}
                </div>
                `;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...listContainer.children].forEach((item) => {
      item.classList.remove("targetChoice_color");
      item.classList.remove("wrongChoice_answered");
      item.classList.remove("rightChoice_answered");
      item.classList.add("multiChoicePictureSoundCard_contur");
    });
    checkingAnswerReset();
    resetSound(currentSound);
    removeActiveSoundCardClass();
    isPlaying = true;

    listContainer.addEventListener("click", matchingHandler);
  }

  function onBtnTestClick() {
    let winCount = 0;

    const selectedItems = [...listContainer.children].filter((el) =>
      el.classList.contains("targetChoice_color")
    );

    selectedItems.forEach((item) => {
      if (item.attributes.getNamedItem("data").value === rightAnswer) {
        winCount += 1;
        addRightChoiceClass(item);
      } else {
        winCount -= 1;
        addWrongChoiceClass(item);
      }
      item.classList.remove("multiChoicePictureSoundCard_contur");
      item.classList.remove("targetChoice_color");
    });
    if (winCount === rightAnswersLength) {
      checkingAnswerPositive();
    } else checkingAnswerNegative();

    resetSound(currentSound);
    removeActiveSoundCardClass();
    isPlaying = true;

    listContainer.removeEventListener("click", matchingHandler);
  }

  function matchingHandler(e) {
    let matchedItem;
    if (e.target.classList.contains("multipleChoice_3-enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }
    const isImgEl =
      e.target.classList.contains("multiChoicePictureSoundCard") ||
      e.target.classList.contains("buttonPlayPausePlayPause_wrap") ||
      e.target.classList.contains("multiChoicePictureSoundTitle") ||
      e.target.classList.contains("multiChoicePictureSoundImageBox");

    if (!isImgEl) {
      return;
    }

    if (
      e.target.classList.contains("multiChoicePictureSoundImageBox") ||
      e.target.classList.contains("multiChoicePictureSoundTitle")
    ) {
      matchedItem = e.target.parentElement;
    } else matchedItem = e.target;

    if (matchedItem.classList.contains("targetChoice_color")) {
      matchedItem.classList.remove("targetChoice_color");
    } else {
      // removeActiveSoundCardClass();
      addCheckClass(matchedItem);
      // resetSound(currentSound);
    }

    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      findSoundAndPlayPause("sound-data", e.target);
    }
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

  function resetSound(currentSound) {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      currentSound = null;
    }
  }
  function findSoundAndPlayPause(attrName, target) {
    const findedSound = [...audioFiles].find(
      (el) => el.id === target.attributes.getNamedItem(attrName).value
    );

    if (currentSound && currentSound.id === findedSound.id && !isPlaying) {
      currentSound.pause();
      isPlaying = true;
      removeActiveSoundCardClass();

      target.classList.remove("buttonPlayPause--active");
    } else if (
      currentSound &&
      currentSound.id === findedSound.id &&
      isPlaying
    ) {
      currentSound.play();
      isPlaying = false;

      target.classList.add("buttonPlayPause--active");
    } else {
      removeActiveSoundCardClass();

      target.classList.add("buttonPlayPause--active");
      resetSound(currentSound);
      isPlaying = false;

      currentSound = findedSound;
      currentSound.play();
    }
  }

  function removeActiveSoundCardClass() {
    const currentActiveSound = taskWrapper.querySelector(
      ".buttonPlayPausePlayPause_wrap.buttonPlayPause--active"
    );

    if (currentActiveSound) {
      currentActiveSound.classList.remove("buttonPlayPause--active");
    }
  }
  function checkingAnswerPositive() {
    controlsBox.classList.add("chek_answer_rightChoice_color");
    infoBox.innerHTML =
      '<div class="answer_indicator">&#128516;&nbsp;&nbsp;Молодец!</div>';
  }
  function checkingAnswerNegative() {
    controlsBox.classList.add("chek_answer_wrongChoice_color");
    infoBox.innerHTML =
      '<div class="answer_indicator">&#128528;&nbsp;&nbsp;Попробуй&nbsp;еще!</div>';
  }
  function checkingAnswerReset() {
    controlsBox.classList.remove("chek_answer_wrongChoice_color");
    controlsBox.classList.remove("chek_answer_rightChoice_color");

    infoBox.firstElementChild !== null &&
      infoBox.removeChild(infoBox.firstElementChild);
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
    // document.body.style.overflow = "hidden";

    modal.addEventListener("pointerdown", () => {
      modal.remove();
      // document.body.style.overflow = "visible";
    });
    document.body.append(modal);
  }
}
