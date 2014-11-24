
// ::: Module (exemple) ::: //
// ------------------------ //

// Convention de nommage: @see Master
// Méthodologie et arborescence: @see Global

Module = Object.create( Global );
Module.objName = 'Module';


// Liste des variables (ne sera pas accéssible dans les parents)
// Module.$elemHomeSlider = null;


Module.methodeOnMobile = function() {

    if( !this.device('onlySmall') )
        return false;

    console.log( 'Méthode de l\objet Module appelé depuis n\'importe ou seulement en mobile' );
};


// Depuis fichier extérieur
Module.methodeOnMobile();