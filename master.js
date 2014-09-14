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
|   "o" alias de "this" dans les objets enfants
        (équivalent au "self" qui est déconseillé)
|       => o.parentMethod()
|   
|
|   Il existe 2 manières d'appeler les méthodes:
|       - Master.load     
|       - Master[ 'load' ]
|
|__________________________________________________________*/

// Si conflit avec "$", les remplacer tous par "$j":
// $j = jQuery.noConflict();

/*_________________________________________________________
|
|   Liste des objets globales (qui contient des méthodes)
|__________________________________________________________
|
|
|   Un objet est une variable accésible sur tout le site
|      (pouvant provenir d'un fichier différent), 
|      contenant des variables (comme "prenom") ou des 
|      méthodes comme "load". (ne pas cofondre avec les 
|      objets jQuery (qui commence par "$")) :
|   => pour les appeler dans l'objet: this.load()
|   => pour les appeler en dehors: Master.load()
|
|   Une objet hérite de ses parents, donc si besoin 
|      d'une méthode ou d'une variable d'un objet parent,
|      "this" fonctionne :
|   => this.varParent ou plus sûr: o.varParent (o est un alias)
|
|__________________________________________________________*/

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
    
var Master = { 

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

    // Array qui contiendront les méthodes et leurs objet à charger au document.ready (ex: Master.windowSize), load, resize et scroll
    onready:  [],
    onload:   [],
    onresize: [],
    onscroll: [],

    // Où cacher les élements et variables
    cache:    {
        $window: $(window)
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
     * @param  {string} object => nom de l'objet
     * @param  {string} method => nom de la méthode
     * @param  {string} action => event (load, resize or scroll) ; load par défaut
     */
    initMethod: function(object, method, action) {

        if( typeof window[object] === 'undefined' )
           this.consoleDegug('! The object "'+ object +'" doesn\'t exists', 'red');

        if( typeof window[object][ method ] === 'undefined' )
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
            this[action].push( new Array(object, method) ); // ex: ajoute l'array ['Master', 'methodMaster'] à l'array "loadMethod"
        }
    }
};


// Garde en mémoire le nom de l'objet
Master.objName = 'Master';

// "o" sera l'alias de l'objet Global
o = Master; 


/**
 * Add JavaScript Foundation Utilities
 * ===================================
 * @desc: ajout la liste de "utilities" du framework Foundation à l'objet Master
 * @see : http://foundation.zurb.com/docs/javascript-utilities.html
 * @todo : remove unnecessary utilities
 */
Foundation.inherit(o, 'S debounce throttle data_options image_loaded random_str');


// Save sizes in globals variables
o.windowSize = function() {

    o.wWind = o.cache.$window.width();
    o.hWind = o.cache.$window.height();
};
o.initMethod(o.objName, 'windowSize', 'onresize');


// Save position scroll in globals variables
o.getPostionScroll = function() {

    o.posTop = o.cache.$window.scrollTop();
    o.posBottom = o.posTop + o.hWind;
};
o.initMethod(o.objName, 'getPostionScroll', 'onscroll');


/**
 *  Détecte si on est sur "tel" device
 *  ==================================
 *  @param   {string}  device => use media queries listed in CSS or ios, ipad, iphon and safari
 *  @return  {bolean} 
 */
o.device = function(device) {

    switch ( device) 
    {
        case 'small':
            if( matchMedia(Foundation.media_queries.small).matches )
                return true;
            break;
        case 'medium':
            if( matchMedia(Foundation.media_queries.medium).matches )
                return true;
            break;
        case 'onlyMedium':
            if( matchMedia(Foundation.media_queries.medium).matches && !matchMedia(Foundation.media_queries.large).matches )
                return true;
            break;
        case 'large':
            if( matchMedia(Foundation.media_queries.large).matches )
                return true;
            break;
        case 'xlarge':
            if( matchMedia(Foundation.media_queries.xlarge).matches )
                return true;
            break;
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
            return false;
    }
};

/** Cette méthode utilise mathcMedia, on peut ainsi utiliser les médias dans le JS
 *  ==============================================================================
 * @see : https://github.com/paulirish/matchMedia.js
 * @exemple :
 *          if( matchMedia('all and (orientation:landscape)').matches )
 *              alert('landscape');
 */



// Custom "console.log" with colors
o.consoleDegug = function(msj, color, strong) {

    if( o.debug)
        console.log('%c' + msj, 'color: '+ color);
};


// Console pour IE8 et inf
o.consoleIE = function(text) {

    var debugId = 'debugIE';

    if( o.ie8 && document.getElementById( debugId ) === null ) 
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

o.cache.$window.on('load', function() {  

    Master.callMethod('onload');

    if( o.device('onlyMedium') )
        alert('onlyMedium');
});

/**
 * Throttle prevents a function from being executed more than once every n milliseconds
 * ====================================================================================
 * @see : http://foundation.zurb.com/docs/javascript-utilities.html#delay 
 * @demo : (sur autre navigateur que chrome) http://louisremi.github.io/jquery-smartresize/demo/index.html
 */
o.cache.$window.on('resize', Foundation.utils.throttle(function(e){

    Master.callMethod('onresize');
}, 150));

o.cache.$window.on('scroll', function() {  

    Master.callMethod('onscroll');
});
