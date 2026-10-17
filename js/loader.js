/**
 * Универсальный асинхронный загрузчик скриптов.
 * @param {string} url         — ссылка на .js файл
 * @param {string} globalName  — имя глобальной функции-очереди
 * @param {Function} [onReady] — колбэк после загрузки
 * @returns {Function}         — прокси-функция для вызовов в очереди
 */
(function (w, d) {
  "use strict";

  function loadScript(url, globalName, onReady) {
    // 1. Создаём (или переиспользуем) функцию-очередь
    if (!w[globalName]) {
      const queueFn = function () {
        (queueFn.q = queueFn.q || []).push(arguments);
      };
      queueFn.q = [];
      queueFn.l = Date.now();
      w[globalName] = queueFn;
    }

    // 2. Защита от повторной вставки
    const existing = d.querySelector('script[src="' + url + '"]');
    if (existing) {
      if (typeof onReady === "function") {
        if (existing.dataset.loaded === "1") onReady(w[globalName]);
        else existing.addEventListener("load", () => onReady(w[globalName]));
      }
      return w[globalName];
    }

    // 3. Создаём тег <script>
    const s = d.createElement("script");
    s.async = true;
    s.src = url;

    // 4. Обработчики результата
    s.onload = function () {
      s.dataset.loaded = "1";
      if (typeof onReady === "function") {
        try {
          onReady(w[globalName]);
        } catch (e) {
          console.error("[loader]", e);
        }
      }
    };
    s.onerror = function () {
      console.error("[loader] Не удалось загрузить:", url);
    };

    // 5. Вставляем в <head>
    d.head.appendChild(s);

    return w[globalName];
  }

  // Публичный API
  w.ScriptLoader = { load: loadScript };
})(window, document);
