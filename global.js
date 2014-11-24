// Master
// |
// |____ Global
//      |
//      |____ Mobule
//      |
//      |____ Page


// ::: Nom du projet  ::: //
// ---------------------- //

// Construction d'un enfant de l'objet Master
Global = Object.create( Master );

// Ajouter le nom de l'objet
Global.objName = 'Global';

// Liste des variables (ne sera pas accéssible dans le parent mais si dans ses enfants)
// Global.varProjectName = 'dataVarChild';
// Global.imgPath =        '/grandfrais/charte/base/img/';


// Ajouter la meme liste de media-queries que dans le le CSS
Global.mediaQueries = {
    onlySmall:  'only screen and (max-width: 480px)',
    medium:     'only screen and (min-width: 481px)',
    onlyMedium: 'only screen and (min-width: 480px) and (max-width: 992px)',
    large:      'only screen and (min-width: 992px)'
}


/**
 * Init plugins onready
 * =====================
 */
Global.initPluginOnReady = function () {

    // exemple
    if( jQuery().placeholder )
        $('input[placeholder]').placeholder();
        
};
Global.initMethod('initPluginOnReady', 'onready');


/**
 * Centrer le background 
 * =====================
 * @return nothing
 */
Global.centerBackground = function () {

    if( !this.device('onlySmall') )
        return false;

    var $back = $( document.getElementById('back-img') ),
        backSize = this.device('onlyMedium') ? 750 : 1490, 
        decalage;

    if( backSize >= this.wWind ) 
    {
        decalage = ( this.wWind - backSize) / 2;
        $back.css('marginLeft', decalage);
    }
    else {
        $back.css('marginLeft', 0);
    }
};
Global.initMethod('centerBackground', 'onload');
Global.initMethod('centerBackground', 'onresize');