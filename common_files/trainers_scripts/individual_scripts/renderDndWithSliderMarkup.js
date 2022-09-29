// export function renderDndWithSliderMarkup(dropCards, dragCards, task) {
function renderDndWithSliderMarkup(dropCards, dragCards, task) {
  let draggingItem;
  let elemBelow;
  let sliderItemWidth;
  let sliderSize;
  let sliderShift = 0;
  let maxQuantity = 0;
  console.log(123);

  const dropBox = task.querySelector(".withSlider_dropPlaceWrapper");
  const dragBox = task.querySelector(".withSlider_slider_box");
  const leftBtn = task.querySelector(".arrowButton_left_event");
  const rightBtn = task.querySelector(".arrowButton_right_event");
  const reloadTaskBtn = task.querySelector(".reloadTask");
  const checkingTaskBtn = task.querySelector(".checkingTask");
  const chek_answerTxt = task.querySelector(".chek_answer");
  const checkTask = task.querySelector(".checkTask");

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(shuffleCards([...dropCards]))
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...dragCards]))
  );

  window.onload = () => {
    sliderSize = dragBox.scrollWidth;
    sliderItemWidth = dragBox.children[0].clientWidth;
    showArrows();
  };

  let sliderWrapperSize = dragBox.offsetParent.clientWidth;

  task.addEventListener("pointerdown", mouseDown);
  reloadTaskBtn.addEventListener("click", onBtnResetClick);
  checkingTaskBtn.addEventListener("click", onBtnTestClick);

  leftBtn.addEventListener("click", onBtnLeftClick);
  rightBtn.addEventListener("click", onBtnRightClick);

  dropBox.addEventListener("click", onDropBoxClick);

  function onDropBoxClick(event) {
    if (!event.target.classList.contains("withSlider_dropPicture")) return;
    scaleImage(event.target);
  }

  function showArrows() {
    if (sliderShift === 0) {
      leftBtn.classList.add("is-disabled");
    } else leftBtn.classList.remove("is-disabled");

    if (sliderShift <= -sliderSize + sliderWrapperSize) {
      rightBtn.classList.add("is-disabled");
    } else rightBtn.classList.remove("is-disabled");
  }

  function onBtnLeftClick() {
    if (sliderShift < 0) {
      sliderShift += sliderItemWidth;
      dragBox.style.left = `${sliderShift}px`;
    }
    sliderSize = dragBox.scrollWidth;
    sliderItemWidth = dragBox.children[0].clientWidth;
    showArrows();
  }

  function onBtnRightClick() {
    console.log("right");
    if (sliderShift > -sliderSize + sliderWrapperSize) {
      sliderShift -= sliderItemWidth;
      dragBox.style.left = `${sliderShift}px`;
    }
    sliderSize = dragBox.scrollWidth;
    sliderItemWidth = dragBox.children[0].clientWidth;
    showArrows();
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      if (item.children.length > 1) {
        [...item.children[1].children].forEach((el) => {
          let randomPos = Math.floor(Math.random() * 12);
          el.style.order = randomPos;
          el.classList.remove("rightChoice_answered");
          el.classList.remove("wrongChoice_answered");
          dragBox.appendChild(el);
        });
      }
    });
    sliderShift = 0;
    sliderSize = dragBox.scrollWidth;
    showArrows();
    dragBox.style.left = `${sliderShift}px`;
    /*controlsBox.style = '';
    infoBox.textContent = '';*/
    checkTask.classList.remove("chek_answer_rightChoice_color");
    checkTask.classList.remove("chek_answer_wrongChoice_color");
    chek_answerTxt.firstElementChild !== null &&
      chek_answerTxt.removeChild(chek_answerTxt.firstElementChild);
    draggingItem = null;
    task.addEventListener("pointerdown", mouseDown);
  }
  function onBtnTestClick() {
    let winVar = 0;
    [...dropBox.children].forEach((item) => {
      if (item.children[1].children.length > 0) {
        [...item.children[1].children].forEach((el) => {
          if (
            item.children[1].attributes.getNamedItem("drop-data").value ===
            el.attributes.getNamedItem("drag-data").value
          ) {
            winVar += 1;
            el.classList.add("rightChoice_answered");
          } else el.classList.add("wrongChoice_answered");
        });
      }
    });
    task.removeEventListener("pointerdown", mouseDown);
    if (winVar === dragCards.length) {
      chek_answerTxt.innerHTML =
        '<div class="answer_indicator">&#128516;&nbsp;&nbsp;Молодец!</div>';
      checkTask.classList.add("chek_answer_rightChoice_color");
      checkTask.classList.remove("chek_answer_wrongChoice_color");
    } else {
      chek_answerTxt.innerHTML =
        '<div class="answer_indicator">&#128528;&nbsp;&nbsp;Попробуй&nbsp;еще!</div>';
      checkTask.classList.add("chek_answer_wrongChoice_color");
      checkTask.classList.remove("chek_answer_rightChoice_color");
    }
  }

  const arrayOfDropElementsLength = dropCards.length;
  switch (arrayOfDropElementsLength) {
    case 2:
      maxQuantity = 8;
      break;
    case 3:
      maxQuantity = 6;
      break;
    case 4:
      maxQuantity = 4;
      break;
    case 5:
      maxQuantity = 2;
      break;
    case 6:
      maxQuantity = 2;
      break;

    default:
      break;
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    /*if (event.target.classList.contains('buttonPlayPausePlayPause_wrap')) {
      return;
    }*/
    if (event.target.classList.contains("withSlider_dragPicture")) {
      draggingItem = event.target.parentElement;
    } else if (event.target.classList.contains("withSlider_dragPicture_box")) {
      draggingItem = event.target;
    } else if (event.target.classList.contains("withSlider_dragPicture_text")) {
      draggingItem = event.target.parentElement;
    } else return;

    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

    draggingItem.style.cursor = "grabbing";
    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)

    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
    // ЛИМИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: task.offsetTop,
      right: task.offsetWidth + task.offsetLeft,
      bottom: task.offsetHeight + task.offsetTop,
      left: task.offsetLeft,
    };

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    //elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    let clickWithoutMove = true;

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);
        moveAt(event.pageX, event.pageY);
      }

      moveAt(event.pageX, event.pageY);
      let newLocation = {
        x: limits.left,
        y: limits.top,
      };
      if (event.pageX > limits.right) {
        newLocation.x = limits.right;
      } else if (event.pageX > limits.left) {
        newLocation.x = event.pageX;
      }
      if (event.pageY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (event.pageY > limits.top) {
        newLocation.y = event.pageY;
      }

      clickWithoutMove = false;
      moveAt(newLocation.x, newLocation.y);

      if (!event.composedPath().includes(draggingItem)) {
        window.addEventListener("pointerup", moveOut);
      }
      if (event.composedPath().includes(draggingItem)) {
        window.removeEventListener("pointerup", moveOut);
      }

      draggingItem.style.visibility = "hidden";
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.style.visibility = "visible";

      if (!elemBelow) return;
    }
    document.addEventListener("pointermove", onMouseMove);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      dragAppend(dragBox, draggingItem, findIdx);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup(event) {
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (!clickWithoutMove) {
        if (
          elemBelow.classList.contains("withSlider_dropPlace_imageBox") &&
          elemBelow.children.length < maxQuantity
        ) {
          dropAppend(elemBelow, draggingItem);
        } else if (
          elemBelow.classList.contains("withSlider_dragPicture") &&
          elemBelow.parentElement.parentElement.tagName !== "BODY" &&
          !elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_slider_box"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("buttonPlayPausePlayPause_wrap") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_dropPlace_imageBox"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("withSlider_dragPicture_text") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "withSlider_dropPlace_imageBox"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else {
          dragAppend(dragBox, draggingItem, findIdx);
        }
      } else if (event.target.classList.contains("withSlider_dragPicture")) {
        scaleImage(event.target);
      }

      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }
  // функция для смены стилей
  function changeStyles(draggingElem) {
    draggingElem.style.position = "relative ";
    draggingElem.style.zIndex = null;
    draggingElem.style.top = null;
    draggingElem.style.left = null;
  }

  // функция для возврата элемента в первоначальную область
  function dragAppend(dropPlace, draggingElem, findIdx) {
    const referenceElement = [...dropPlace.children][findIdx];
    dropPlace.insertBefore(draggingElem, referenceElement);
    changeStyles(draggingElem);
    //sliderShift = 0;
    sliderSize = dragBox.scrollWidth;
    showArrows();
    dragBox.style.left = `${sliderShift}px`;
  }

  // функция для размещения элемента в области, куда его перетаскивают
  function dropAppend(dropPlace, draggingElem) {
    dropPlace.appendChild(draggingElem);
    changeStyles(draggingElem);
    sliderSize = dragBox.scrollWidth;
    showArrows();
  }

  //console.log(widthPic)
  function createDropPictureCardsMarkup(pictures) {
    let widthPic = 100 / dropCards.length - 2;
    return pictures
      .map((picture) => {
        const isImage =
          picture.src &&
          `<img
                   class="withSlider_dropPicture"
                   src=${picture.src}
                   alt=${picture.name}

                   draggable="false"
                   />`;
        const isSound =
          picture.audioSrc &&
          `
                      <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" drop-data=${picture.id}>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                        <audio class="withSlider_dndIWS_audio" id=${picture.id} src=${picture.audioSrc} style="display:none !important">
                              Your browser does not support the <code>audio</code> element.
                            </audio>
                      </div>`;
        const isText =
          picture.text &&
          `<div class="withSlider_dropPicture_text" style="text-align: center">${picture.text}</div>`;

        return `<div class="withSlider_dropPlace" style="width: ${widthPic}%;">
            <div class="withSlider_dropPicture_box"  style="width: 100%;">
               ${isImage}
               ${isSound}
               ${isText}
            </div>
            <div drop-data=${picture.tag} class="withSlider_dropPlace_imageBox" style="width: 100%; "></div>
              </div>
                                  `;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isImage =
          picture.src &&
          `<img
                   class="withSlider_dragPicture"
                   src=${picture.src}
                   alt=${picture.name}

                   draggable="false"
                   />`;
        const isSound =
          picture.audioSrc &&
          `           <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" drop-data=${picture.id}>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                        <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                        <audio class="withSlider_dndIWS_audio" id=${picture.id} src=${picture.audioSrc} style="display:none !important">
                              Your browser does not support the <code>audio</code> element.
                            </audio>
                      </div>`;
        const isText =
          picture.text &&
          `<div class="withSlider_dragPicture_text" style="text-align: center">${picture.text}</div>`;
        return `<div
                class="withSlider_dragPicture_box oneMultiChoice_border"
                draggable="false"
                drag-data=${picture.tag}
              >
               ${isImage}
               ${isSound}
               ${isText}
              </div>

                                  `;
      })
      .join("");
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
  const audioFiles = task.querySelectorAll(".withSlider_dndIWS_audio");
  const audioIcons = task.querySelectorAll(".buttonPlayPausePlayPause_wrap");

  [...audioIcons].forEach((el) => {
    el.addEventListener("click", onSoundIconClick);
  });
  /*[...audioFiles].forEach((el) =>
    el.addEventListener("ended", (e) => {
      e.target.parentElement.classList.remove("animatingSoundIconPlay");
      e.target.parentElement.classList.remove("staticSoundIconPause");

      isPaused = false;
    })
  );*/

  /*function onSoundIconClick(e) {
    let isPlaying = false;
    e.stopPropagation()
    //findSoundAndPlayPause("drop-data", e.target);
    const audio = [...audioFiles].find(
      (el) => el.id === e.target.getAttribute('drop-data')
    );
    isPlaying ? audio.pause() : audio.play();
    e.target.classList.toggle('buttonPlayPause--active');
    audio.onplaying = function () {
      isPlaying = true;
    };
    audio.onpause = function () {
      isPlaying = false;
    };
    audio.onended = function () {
      e.target.classList.remove('buttonPlayPause--active');
      isPlaying = false;
    };
    //findedSound.play()
  }*/

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
    close.classList.add(`icon_close_button`);
    close.classList.add(`close_icon_white`);
    close.style.marginLeft = "100%";
    close.style.cursor = "pointer";

    div.append(close);
    document.body.style.overflow = "hidden";
    modal.addEventListener("pointerdown", () => {
      modal.remove();
      document.body.style.overflow = "visible";
    });
    document.body.append(modal);
  }
}

export default renderDndWithSliderMarkup;
