(function() {
  /**
   * Служебная функция для заполнения диапазона слайдера цветом.
   * @param {number} from - начальное значение в %% диапазона.
   * @param {number} to - конечное значение в %% диапазона.
   * @param {HTMLElement} controlSlider - Элемент управления слайдером
   */
  const fillSlider = (from, to, controlSlider) => {
    const sliderColor = '#ffffff';
    const rangeColor = '#25daa5';
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
  };

  /* Код компонента пишите ниже */


})();
