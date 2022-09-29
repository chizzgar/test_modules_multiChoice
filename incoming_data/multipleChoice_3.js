import renderMultipleChoiceImgSoundMarkup from "../common_files/trainers_scripts/individual_scripts/individual_scripts.js";
(() => {
  // массив входящих картинок (минимум 4, максимум 15 элементов),
  //поле title заполняется по необходимости, если заголовка у картинки нет, то ставится ''
  //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
  // поле name должно быть уникально, по нему идет воспроизведение звуков
  //в поле tag заполняется принадлежность к правильному/неправильному ответу

  const arrayOfElements = [
    {
      id: 1,
      name: "fruits",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_1.fc6646c7.png",
      tag: "wrong",
      audioSrc: "",
      title: "",
    },
    {
      id: 2,
      name: "vegetables",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_2.9500f353.png",
      audioSrc: "",
      tag: "right",
      title: "",
    },
    {
      id: 3,
      name: "candies",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_3.7d5ad98d.png",
      audioSrc: "",
      tag: "wrong",
      title: "",
    },
    {
      id: 4,
      name: "biscuits",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_4.d7b2671d.png",
      audioSrc: "",
      tag: "wrong",
      title: "",
    },
    {
      id: 5,
      name: "fruits",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_5.720ae862.png",
      tag: "wrong",
      audioSrc: "",
      title: "",
    },
    {
      id: 6,
      name: "vegetables",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_6.24aa76d0.png",
      audioSrc: "",
      tag: "right",
      title: "",
    },
    {
      id: 7,
      name: "candies",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_7.71ee141a.png",
      audioSrc: "",
      tag: "wrong",
      title: "",
    },
    {
      id: 8,
      name: "biscuits",
      src: "Images_1/multipleChoice_3/DO_3-4_22_2_8.88a64fe6.png",
      audioSrc: "",
      tag: "wrong",
      title: "",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "right";
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskWrapper = document.getElementById("task-5");
  // здесь указывается имя папки, где хранятся все картинки к заданиям
  const imageFolder = "Images_1";
  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMultipleChoiceImgSoundMarkup(
    arrayOfElements,
    rightAnswer,
    taskWrapper,
    imageFolder
  );
})();
