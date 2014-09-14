
Yupik jQuery Boilerplate
========================

### Personal experimentation, no guarantee that it works for you

Explication (in french) :

> Yupik jQuery est un squelette JavaScript modulaire orienté objet utilisant jQuery et le meilleur du framework Foundation.

<!--Yupik jQuery is a modular, object-oriented JavaScript skeleton using jQuery and the best of the Foundation framework. -->

### Quels avantages ?

* Chaque script est bien séparé, modulaire et réutilisable
* La gestion des évènements onready, onload, onresize et onscroll est simplifiée
* Chaque objet a son fichier et peux n’être appelé que selon un contexte

### Comment fonctionne t-il ?

* Un objet _Master_ contient le fonctionnement du squelette (et hérite de certaines [utilities](http://foundation.zurb.com/docs/javascript-utilities.html) de Foundation)
* Un objet _Global_ propre à chaque projet contiendra les méthodes utile à toute l’application
* Un objet (un fichier) pour tous les modules et les pages que l’on souhaite (ils hériteront des objets _Master_ et _Global_ mais pas des uns les autres)
* Chaque méthode est initialisable onready, onload, onresize ou onscroll, ainsi qu'en dehors de ce squelette : _MyObjet.methodName()_
* Le squelette est orienté _mobile first_ et contient la détection des médias queries
* Chaque objet est préfixé pour éviter les conflits

### Dépendances :

* jQuery
* La base de Foundation (juste le fichier foundation.js de la version 5.3.1), pas les plugins
* Un mini bout de CSS (celui des media queries de Foundation)
