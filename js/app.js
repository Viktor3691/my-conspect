/**
 * app.js — логика конспекта
 */
(function () {
  "use strict";

  // ====== Переключение темы ======
  window.setTheme = function (t) {
    document.body.setAttribute("data-gmT", t);
    try {
      localStorage.setItem("conspect_theme", t);
    } catch (e) {}

    // Показать/скрыть нужную иконку
    document.querySelectorAll('[data-e="sich"]').forEach((el) => {
      el.style.display = el.dataset.mType === t ? "none" : "inline-block";
    });
  };

  // ====== Восстановление темы ======
  let saved = "D";
  try {
    saved = localStorage.getItem("conspect_theme") || "D";
  } catch (e) {}
  window.setTheme(saved);

  // ====== Авто-подсветка активной ссылки в меню ======
  const cur = location.pathname.split("/").pop();
  document.querySelectorAll('[data-e="subb"] a').forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.endsWith(cur)) {
      a.setAttribute("data-mCurr", "T");
    }
  });

  // ====== Пример использования загрузчика ======
  // Если понадобится подключить внешнюю библиотеку — раскомментируйте:
  // ScriptLoader.load(
  //   "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js",
  //   "PrismQueue",
  //   function () {
  //     document
  //       .querySelectorAll("pre code")
  //       .forEach((b) => Prism.highlightElement(b));
  //   },
  // );
})();
