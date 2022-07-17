// ==UserScript==
// @name         Page HTML Saver
// @namespace    http://yellowapps.22web.org
// @version      0.1
// @description  Позволяет сохранить изменённую с помощью кода элемента страницу
// @author       YellowApps
// @match        http://*/*
// @icon         http://yellowapps.22web.org/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    let w; (window.unsafeWindow)?(w = window.unsafeWindow):(w = window); if(w.self != w.top) return;

    let pageID = 'savedPage_'+btoa(encodeURIComponent(w.location.href.split('?')[0])).replaceAll('=', '');

    if(w.localStorage[pageID]) w.document.documentElement.innerHTML = decodeURIComponent(atob(w.localStorage[pageID]));

    w.onkeypress = (e)=>{
        if((e.ctrlKey || e.metaKey) && e.key == '\x13'){
            w.localStorage[pageID] = btoa(encodeURIComponent(w.document.documentElement.innerHTML));
            alert('Страница сохранена!');
        }
        if((e.ctrlKey || e.metaKey) && e.key == '\x11'){
            w.localStorage.removeItem(pageID);
            alert('Сохранённая страница удалена!');
        }
    }
})();