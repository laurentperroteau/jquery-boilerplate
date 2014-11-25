// Master
// |
// |____ Global
//      |
//      |____ Mobule


// ::: Nom du projet  ::: //
// ---------------------- //

// Construction d'un enfant de l'objet Master
Global = Object.create( Master );

// Ajouter le nom de l'objet
Global.objName = 'Global';


// Liste des variables (ne sera pas accéssible dans le parent mais si dans ses enfants)
Global.cache.$back = $( document.getElementById('back-img') );


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

    // Commencer par la condition
    if( !this.device('onlySmall') )
        return false;

    // On vérifie que la variable est bien en cache
    //     avant de l'utiliser
    if( this.isCached('$back') )
    {   
        var backSize = this.device('onlyMedium') ? 750 : 1490, 
            decalage;

        if( backSize >= this.wWind ) 
        {
            decalage = ( this.wWind - backSize) / 2;
            this.cache.$back.css('marginLeft', decalage);
        }
        else {
            this.cache.$back.css('marginLeft', 0);
        }
    }
};
Global.initMethod('centerBackground', 'onload');
Global.initMethod('centerBackground', 'onresize');