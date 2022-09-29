//import renderSlideShow_1 from "../common_files/trainers_scripts/individual_scripts/individual_scripts.js";

(() => {
  // массив входящих данных(картинка, звук, текст)
  // количество слайдов любое
  // поле text, audioSrc заполняются по необходимости,
  // если данные для полей отсутствуют, то оставлять ''
  // поля answerTag и id должны быть уникальными, т.к. по ним происходит воспроизведение звуков
  // если звуки отсутствуют, то поле answerTag также оставить пустым ''
  const sliderContent = [
    {
      id: 1,
      imgSrc: "Images_1/selectSoundOnSlide/DOH_3-4_25_2_13.png",
      audioSrc: "sound/selectSoundOnSlide/005.mp3",
      text: "Вы вошли в автобус с задней площадки и увидели, что у передней двери стоят ваши друзья. Надо ли поздороваться с ними, если надо, то как это сделать?",
    },
    {
      id: 2,
      imgSrc: "Images_1/selectSoundOnSlide/DOH_3-4_25_2_14.png",
      audioSrc: "sound/selectSoundOnSlide/007.mp3",
      text: "На улице разговаривают несколько человек. Мальчик увидел среди них соседку и, проходя мимо, вежливо сказал: «Здравствуйте, Вера Ивановна!» Какую ошибку допустил мальчик?",
    },
    {
      id: 3,
      imgSrc: "Images_1/selectSoundOnSlide/DOH_3-4_25_2_15.png",
      audioSrc: "sound/selectSoundOnSlide/009.mp3",
      text: "Ты идёшь с товарищем по улице. Он поздоровался с неизвестным тебе человеком, приостановился. Надо ли поздороваться и тебе?",
    },
    {
      id: 4,
      imgSrc: "Images_1/selectSoundOnSlide/DOH_3-4_25_2_16.png",
      audioSrc: "sound/selectSoundOnSlide/011.mp3",
      text: "Два мальчика столкнулись в дверях при входе в кабинет и никак не могут разойтись. Кто из них должен уступить дорогу?",
    },
  ];

  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "slodeShow_1_task-1";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSlideShow_1(sliderContent, taskId);
})();
