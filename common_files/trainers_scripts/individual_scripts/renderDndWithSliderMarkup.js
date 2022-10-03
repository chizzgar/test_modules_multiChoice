import {
  onSoundIconClick,
  shuffleCards,
  scaleImage,
  dragAppend,
  dropAppend,
  onBtnLeftClick,
  onBtnRightClick,
  showArrows
} from "../common_scripts/common_scripts.js";


export function renderDndWithSliderMarkup(dropCards, dragCards, task) {
  let draggingItem;
  let elemBelow;

  let sliderSetStates = {
    sliderItemWidth: null,
    sliderSize: null,
    sliderWrapperSize: null,
    sliderShift: 0
  }

  const soundDataAttribute = "drop-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false
  };
  let maxQuantity = 0;

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
    sliderSetStates.sliderSize = dragBox.scrollWidth;
    sliderSetStates.sliderItemWidth = dragBox.children[0].clientWidth;
    showArrows(sliderSetStates, leftBtn, rightBtn);
  };

  sliderSetStates.sliderWrapperSize = dragBox.offsetParent.clientWidth;

  task.addEventListener("pointerdown", mouseDown);
  reloadTaskBtn.addEventListener("click", onBtnResetClick);
  checkingTaskBtn.addEventListener("click", onBtnTestClick);

  leftBtn.addEventListener("click", onBtnLeftClickHandler);
  rightBtn.addEventListener("click", onBtnRightClickHandler);

  dropBox.addEventListener("click", onDropBoxClick);

  function onDropBoxClick(event) {
    if (!event.target.classList.contains("withSlider_dropPicture")) return;
    scaleImage(event.target);
  }

  function onBtnLeftClickHandler() {
    onBtnLeftClick(sliderSetStates, dragBox, leftBtn, rightBtn)
  }

  function onBtnRightClickHandler() {
    onBtnRightClick(sliderSetStates, dragBox, leftBtn, rightBtn)
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
    sliderSetStates.sliderShift = 0;
    sliderSetStates.sliderSize = dragBox.scrollWidth;
    showArrows(sliderSetStates, leftBtn, rightBtn);
    dragBox.style.left = `${sliderSetStates.sliderShift}px`;
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
                      <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}=${picture.id}>
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
            <div ${soundDataAttribute}=${picture.tag} class="withSlider_dropPlace_imageBox" style="width: 100%; "></div>
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
          `           <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}=${picture.id}>
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

  const audioFiles = task.querySelectorAll(".withSlider_dndIWS_audio");
  const audioIcons = task.querySelectorAll(".buttonPlayPausePlayPause_wrap");
  [...audioIcons].forEach((el) => {
    el.addEventListener("click", onAudioClick);
  });

  function onAudioClick(e) {
    onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute)
  }

}
