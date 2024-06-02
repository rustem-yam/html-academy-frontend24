(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue("pagination"),
    loop: !!getUrlValue("loop"),
  };

  /* Код компонента пишите ниже */
  const prevBtn = document.querySelector(".slider-toggle--prev");
  const nextBtn = document.querySelector(".slider-toggle--next");
  const numberPagination = document.querySelector(".slider-pagination");
  if (settings.pagination) {
    numberPagination.classList.add("slider-pagination--shown");
  }
  const paginationItems = document.querySelectorAll(".slider-pagination-item");
  const sliderItems = document.querySelectorAll(".slider-item");
  let currentSlide = document.querySelector(".slider-item--current");

  if (settings.loop) {
    prevBtn.disabled = false;
  }

  function findIndex(nodeList, node) {
    for (var i = 0; i < nodeList.length; i++) {
      if (nodeList[i] === node) {
        return i;
      }
    }
    return -1;
  }

  const siblingSlideCheck = () => {
    if (!currentSlide.previousElementSibling) {
      prevBtn.disabled = true;
    }
    if (currentSlide.nextElementSibling) {
      nextBtn.disabled = false;
    }
    if (!currentSlide.nextElementSibling) {
      nextBtn.disabled = true;
    }
    if (currentSlide.previousElementSibling) {
      prevBtn.disabled = false;
    }
  };
  const prevBtnHandler = () => {
    currentSlide.classList.remove("slider-item--current");
    if (settings.loop) {
      let index = findIndex(sliderItems, currentSlide);
      if (index === 0) {
        index = sliderItems.length;
      }
      currentSlide = sliderItems[--index];
      currentSlide.classList.add("slider-item--current");
    } else {
      currentSlide.previousElementSibling.classList.add("slider-item--current");
      currentSlide = currentSlide.previousElementSibling;
      siblingSlideCheck();
    }
    paginationItems.forEach((item) => (item.disabled = false));
    paginationItems[findIndex(sliderItems, currentSlide)].disabled = true;
  };
  const nextBtnHandler = () => {
    currentSlide.classList.remove("slider-item--current");
    if (settings.loop) {
      let index = findIndex(sliderItems, currentSlide);
      if (index === sliderItems.length - 1) {
        index = -1;
      }
      currentSlide = sliderItems[++index];
      currentSlide.classList.add("slider-item--current");
    } else {
      currentSlide.nextElementSibling.classList.add("slider-item--current");
      currentSlide = currentSlide.nextElementSibling;
      siblingSlideCheck();
    }
    paginationItems.forEach((item) => (item.disabled = false));
    paginationItems[findIndex(sliderItems, currentSlide)].disabled = true;
  };
  prevBtn.addEventListener("click", prevBtnHandler);
  nextBtn.addEventListener("click", nextBtnHandler);

  for (let i = 0; i < paginationItems.length; i++) {
    paginationItems[i].addEventListener("click", () => {
      currentSlide.classList.remove("slider-item--current");
      currentSlide = sliderItems[i];
      currentSlide.classList.add("slider-item--current");
      paginationItems.forEach((item) => (item.disabled = false));
      paginationItems[i].disabled = true;
      if (!settings.loop) siblingSlideCheck();
    });
  }
})();
