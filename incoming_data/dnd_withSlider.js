(() => {
  // массив входящих картинок для поля куда переносятся картинки (максимум 5-6 элементов),
  // в поле tag указывается ключевое слово для сопаставления поля для сбрасывания и картинки для сбрасывания
  const dropCards = [
    {
      id: 1,
      name: "birch",
      src: "", //'Images_1/DOH_3-4_7_1_2.png',
      tag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст loermipsum ksjhfjn wajhfjkn awjkefhujkam juahf;iwj",
    },
    {
      id: 2,
      name: "oak",
      src: "Images_1/DOH_3-4_7_1_3.png",
      tag: "oak",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    // {
    //   id: 3,
    //   name: 'maple',
    //   src: 'Images_1/DOH_3-4_7_1_4.png',
    //   tag: 'maple',
    //   audioSrc: 'sound/dnd_withSlider/007.mp3',
    //   text: ''
    // }
  ];
  //массив входящих картинок для поля откуда картинки будут переноситься(любое количество)(максимум по 3 шт на дро при 4 и более дропах, при 3 и менее - по 6 штук на дроп)
  //в поле tag указывается ключевое слово для сопаставления поля для сбрасывания и картинки для сбрасывания
  const dragCards = [
    {
      id: 1,
      name: "mapleLeaf1",
      src: "Images_1/DOH_3-4_7_1_6.png",
      tag: "maple",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 2,
      name: "birchLeaf1",
      src: "Images_1/DOH_3-4_7_1_7.png",
      tag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 3,
      name: "mapleLeaf2",
      src: "Images_1/DOH_3-4_7_1_8.png",
      tag: "maple",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 4,
      name: "oakLeaf2",
      src: "Images_1/DOH_3-4_7_1_9.png",
      tag: "oak",
      audioSrc: "sound/dnd_withSlider/008.mp3",
      text: "текст джлавмылдаьм ждышлвоа дфло",
    },
    {
      id: 5,
      name: "birchLeaf1",
      src: "Images_1/DOH_3-4_7_1_10.png",
      tag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    {
      id: 6,
      name: "oakLeaf3",
      src: "Images_1/DOH_3-4_7_1_11.png",
      tag: "oak",
      audioSrc: "sound/dnd_withSlider/008.mp3",
      text: "текст",
    },
    {
      id: 7,
      name: "birchLeaf2",
      src: "Images_1/DOH_3-4_7_1_12.png",
      tag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    {
      id: 8,
      name: "mapleLeaf3",
      src: "Images_1/DOH_3-4_7_1_13.png",
      tag: "maple",
      audioSrc: "sound/dnd_withSlider/009.mp3",
      text: "текст",
    },
  ];
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const task = document.getElementById("task-1");

  renderDndWithSliderMarkup(dropCards, dragCards, task);
})();
