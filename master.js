/*_________________________________________________________
|
|   Convention de nommage
|__________________________________________________________
|
|   Objet
|       => commence par une Majuscules (ex: "Master") 
|   method (une méthode est une fonction d'un objet global)
|       => en minuscule (ex: "load")
|   $objet (objet jQuery)
|       => commence par dollar "$"
|   variable (variable interne à une fonction)
|       => en minuscule (ex: var name)
|
|   Il existe 2 manières d'appeler les méthodes:
|       - Master.load     
|       - Master[ 'load' ]
|
|__________________________________________________________*/

// Si conflit avec "$", les remplacer tous par "$j":
// $j = jQuery.noConflict();

// Polyfill de Object.create pour IE8 et inf
if (!Object.create) {
  Object.create = (function(){
    function F(){}
    return function(o){
      if (arguments.length != 1) {
          throw new Error('Object.create implementation only accepts one parameter.');
      }
      F.prototype = o;
        return new F();
    };
  })();
}


// ::: Master ::: //
// -------------- //
    
Master = { 

    // Variables de l'objet
    // --------------------
    // @use: Master.varMaster
    debug:             true,
    wWind:             $(window).width(),
    hWind:             $(window).height(),
    posTop:            0,
    posBottom:         0,
    // touch:             Modernizr.touch,
    ie8:               $('html').hasClass('lte9') ? true : false,

    // Array qui contiendra les méthodes et leurs objet à charger au document.ready (ex: Master.windowSize), document.load, document.resize et document.scroll
    onready:  [],
    onload:   [],
    onresize: [],
    onscroll: [],

    objName: 'Master',

    // Où cacher les élements et variables
    cache:    {
        $window: $(window)
    }, 
    
    // Vérifie que la variable caché éxiste et n'est pas null
    isCached: function(varName) {

        if( this.cache[varName] !== undefined )
            return true;
        else
            this.consoleDegug('La variable '+ varName +' n\a pas été caché', 'red');
    },

    // Permet d'appeler lors d'un évenement (onload, onresize...) toutes les méthodes listé dans l'array correspondante
    callMethod: function(nameArrayOfMethod) {

        for (var i = 0, len = this[ nameArrayOfMethod ].length; i < len; i++) 
        {
            var globalName = this[ nameArrayOfMethod ][i][0],
                methodName = this[ nameArrayOfMethod ][i][1],
                consoleMsj = (i+1)+' - '+ nameArrayOfMethod +' : '+ globalName +'.'+ methodName;

            this.consoleDegug(consoleMsj, 'orange');
            window[ globalName ][ methodName ]();
        }
    },

    /**
     * Ajoute la méthode à l'array correspondante (qui servira à charger cette méthode)
     * --------------------------------------------------------------------------------
     * @param  {string} method => nom de la méthode
     * @param  {string} action => event (load, resize or scroll) ; load par défaut
     */
    initMethod: function(method, action) {

        if( typeof window[ this.objName ] === 'undefined' )
            this.consoleDegug('! The object "'+ this.objName +'" doesn\'t exists', 'red');

        if( typeof window[ this.objName ][ method ] === 'undefined' )
            this.consoleDegug('! The method "'+ method +'" doesn\'t exists', 'red');

        if( typeof action === 'undefined') 
            action = 'onload';

        if( action !== 'onready' && 
            action !== 'onload' && 
            action !== 'onresize' && 
            action !== 'onscroll' ) 
        {
            this.consoleDegug('Action should be onready, onload, onresize or onscroll, not "'+ action +'"', 'red');
        }
        else {
            this[action].push( new Array(this.objName, method) ); // ex: ajoute l'array ['Master', 'methodMaster'] à l'array "loadMethod"
        }
    }
};


// Met en cache la taille de la fenêtre (sera actualisé au resize)
Master.windowSize = function() {

    Master.wWind = Master.cache.$window.width();
    Master.hWind = Master.cache.$window.height();
};
Master.initMethod('windowSize', 'onresize');


// Met en cache la position du scroll (sera actualisé au scroll)
Master.getPostionScroll = function() {

    Master.posTop = Master.cache.$window.scrollTop();
    Master.posBottom = Master.posTop + Master.hWind;
};
Master.initMethod('getPostionScroll', 'onscroll');


/**
 *  Détecte si on est sur "tel" device
 *  ==================================
 *  @param   {string}  device => pass media queries or device you want to detect
 *  @return  {bolean} 
 */
Master.device = function(device) {

    switch ( device ) 
    {
        case 'ios':
            if( navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ) 
                return true;
            break;
        case 'ipad':
            if( navigator.userAgent.toLowerCase().indexOf("ipad") > -1  ) 
                return true;
            break;
        case 'iphone':
            if( navigator.userAgent.toLowerCase().indexOf("iphone") > -1 ) 
                return true;
            break;
        case 'safari':
            if( Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 )
                return true;
            break;
        default: 
            if( matchMedia( this.mediaQueries[ device ] ).matches )
                return true;
            else
                return false;
        break;
    }
};

/** Cette méthode précédente utilise mathcMedia, 
 *      on peut ainsi utiliser les médias queriers dans le JS
 *  =========================================================
 * @see : https://github.com/paulirish/matchMedia.js
 * @exemple :
 *          if( matchMedia('all and (orientation:landscape)').matches )
 *              alert('landscape');
 */


// Custom "console.log" avec couleur (active seulement si debug == true)
Master.consoleDegug = function(msj, color, strong) {

    if( Master.debug )
        console.log('%c' + msj, 'color: '+ color);
};


// Console pour IE8-
Master.consoleIE = function(text) {

    var debugId = 'debugIE';

    if( Master.ie8 && document.getElementById( debugId ) === null ) 
        $('body').prepend('<div id="'+ debugId +'"><h2><strong>Debug Internet explorer : </strong></h2><ol></ol></div>');

    $( document.getElementById( debugId ) ).find('ol').append('<li>'+ text +'</li>');
};


// ::: Events ::: //
// -------------- //           

/* NOTE : $(document).ready() permet de définir les instructions javascript à exécuter dès que le html et le script qui contient l’appel à $(document).ready() est chargé. Cette fonction n’attend pas la fin du chargement de tous les éléments de la page (css, images, autres js…).
$(window).load() permet de définir les instuctions à exécuter une fois que l’ensemble des éléments de la page sont chargés : html, css, scripts, images.*/

$(function() { // === $(document).ready()

    Master.callMethod('onready');
});

Master.cache.$window.on('load', function() {  

    Master.callMethod('onload');
});

Master.cache.$window.on('resize', function() {  

    Master.callMethod('onresize');
});

Master.cache.$window.on('scroll', function() {  

    Master.callMethod('onscroll');
});