// Master
// |
// |____ Global
//      |
//      |____ Home
//      |
//      |____ Product


// ::: Nom du projet  ::: //
// ---------------------- //

// Construction d'un enfant de l'objet Master
window[prefixNamespace + 'Global'] = Object.create( window[prefixNamespace + 'Master'] );

// "o" sera l'alias de l'objet MyGlobal
o = window[prefixNamespace + 'Global'];

// Garde en mémoire le nom de l'objet
o.objName = prefixNamespace + 'Global';

// Liste des variables (ne sera pas accéssible dans le parent mais si dans ses enfants)
// o.varProjectName = 'dataVarChild';
// o.imgPath =        '/grandfrais/charte/base/img/';


/**
 * Init plugins onready
 * =====================
 */
o.initPluginOnReady = function () {

    if( jQuery().placeholder )
        $('input[placeholder]').placeholder();
        
};
o.initMethod(o.objName, 'initPluginOnReady', 'onready');


/**
 * LazyLoad plugin init 
 * =====================
 * @see : http://www.appelsiini.net/projects/lazyload
 */
o.initLazyLoad = function () {

    if( !jQuery().lazyload )
        return false;

    // Chargement des images au chargement
    $("img.lazy").lazyload({ 
        skip_invisible : false,
        threshold: 1000 // change les images même 1000px au dessus du bas du document, donc tout le temps
    });

    // Chargement des images au scroll
    $("img.lazy-scroll").lazyload({ 
        event : "scroll"
    });

    // DEBUG
    if( o.debug ) { 
        $('img.lazy').load(function() {
            o.consoleDegug('...'+ $(this).attr('src').substr(-33) + ' => chargé on load', 'green');
        });
        $('img.lazy-scroll').load(function() {
            o.consoleDegug('...'+ $(this).attr('src').substr(-33) + ' => chargé on scroll', 'green');
        });
    }
};
// o.initMethod(o.objName, 'initLazyLoad', 'onload');


/**
 * Centrer le background 
 * =====================
 * @return nothing
 */
o.centerBackground = function () {

    if( !o.device('small') )
        return false;

    var $back = $('#back-img img'),
        backSize = o.device('onlyMedium') ? 750 : 1490, 
        decalage;

    if( backSize >= o.wWind ) 
    {
        decalage = ( o.wWind - backSize) / 2;
        $back.css('marginLeft', decalage);
    }
    else {
        $back.css('marginLeft', 0);
    }
};
o.initMethod(o.objName, 'centerBackground', 'onload');
o.initMethod(o.objName, 'centerBackground', 'onresize');