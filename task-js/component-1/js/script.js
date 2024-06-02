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
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue("tabs_limit") || 0,
  };

  /* Код компонента пишите ниже */
  const tabs = document.querySelectorAll(".accordeon-item-title");
  let openedTabsCount = 0;
  const openedTabs = [];
  const toggleClassName = "accordeon-item--open";

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    tab.addEventListener("click", () => {
      if (tab.parentNode.classList.contains(toggleClassName)) {
        tab.parentNode.classList.remove(toggleClassName);
        openedTabs.splice(i, 1);
        openedTabsCount -= 1;
        console.log(openedTabsCount);
      } else {
        if (!settings.tabsLimit || openedTabsCount < settings.tabsLimit) {
          tab.parentNode.classList.add(toggleClassName);
          openedTabs.push(i);
          openedTabsCount += 1;
          console.log(openedTabsCount);
        } else {
          tabs[openedTabs.shift()].parentNode.classList.remove(toggleClassName);
          tab.parentNode.classList.add(toggleClassName);
          openedTabs.push(i);
          openedTabsCount += 1;
          console.log(openedTabsCount);
        }
      }
    });
  }
})();
