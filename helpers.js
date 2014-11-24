/* * *
 * Avoid `console` errors in browsers that lack a console
 * @extract of https://github.com/h5bp/mobile-boilerplate
 */
(function(){var method;var noop=function(){};var methods=['assert','clear','count','debug','dir','dirxml','error','exception','group','groupCollapsed','groupEnd','info','log','markTimeline','profile','profileEnd','table','time','timeEnd','timeStamp','trace','warn'];var length=methods.length;var console=(window.console=window.console||{});while(length--){method=methods[length];if(!console[method]){console[method]=noop;}}}());

/* * *
 * Normalized hide address bar for iOS & Android
 * @see https://gist.github.com/scottjehl/1183357
 */
(function(win){var doc=win.document;if(!location.hash&&win.addEventListener){window.scrollTo(0,1);var scrollTop=1,getScrollTop=function(){return win.pageYOffset||doc.compatMode==="CSS1Compat"&&doc.documentElement.scrollTop||doc.body.scrollTop||0;},bodycheck=setInterval(function(){if(doc.body){clearInterval(bodycheck);scrollTop=getScrollTop();win.scrollTo(0,scrollTop===1?0:1);}},15);win.addEventListener("load",function(){setTimeout(function(){if(getScrollTop()<20){win.scrollTo(0,scrollTop===1?0:1);}},0);});}})(this);

/* * *
 * MBP - Mobile boilerplate helper functions
 * @extract of https://github.com/h5bp/mobile-boilerplate
 */
(function(document) {window.MBP=window.MBP||{};
    // Prevent default scrolling on document window (à vérirfier)
    MBP.preventScrolling=function(){document.addEventListener('touchmove',function(e){if(e.target.type==='range'){return;}e.preventDefault();},false);};
    // Prevent iOS Safari from zooming the viewport when form inputs receive focus (à vérifier)
    MBP.preventZoom=function(){var formFields=document.querySelectorAll('input,select,textarea');var contentString='width=device-width,initial-scale=1,maximum-scale=';var i = 0;var fieldLength=formFields.length;var setViewportOnFocus=function(){MBP.viewportmeta.content=contentString+'1';};var setViewportOnBlur=function(){MBP.viewportmeta.content = contentString + '10';};for(;i<fieldLength;i++){formFields[i].onfocus=setViewportOnFocus;  formFields[i].onblur=setViewportOnBlur;}};})(document);