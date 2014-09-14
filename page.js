
// ::: Page (sera un nouveau fichier JS) ::: //
// ----------------------------------------- //

// Convention de nommage: @see envieDeFraises.master
// Méthodologie et arborescence: @see envieDeFraises.global

var Page = Object.create(Global);
Page.objName = 'Page';
o = Page;

// Liste des variables (ne sera pas accéssible dans les parents)
// o.$elemHomeSlider = null;

// Définition d'une méthode
o.methodPageLoad = function() {

    // Commencer par la condition
    if( !$('.testClass').length )
        return false;

    o.consoleIE( o.varProjectName );
};
o.initMethod(o.objName, 'methodPageLoad', 'onload'); // Ajout de la méthode à la liste des méthodes à charger onload

// Définition d'une méthode
o.methodPageResize = function() {

    // Commencer par la condition
    if( document.getElementById('action') === null )
        return false;

    o.consoleIE( 'test' );
};
o.initMethod(o.objName, 'methodPageResize', 'onresize'); // Ajout de la méthode à la liste des méthodes à charger onload