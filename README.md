
jQuery Boilerplate
========================

### Personal experimentation, no guarantee that it works for you

Explication (in french) :

> jQuery boilerplate est un squelette JavaScript modulaire orienté objet utilisant jQuery.

<!--jQuery boilerplate is a modular, object-oriented JavaScript skeleton using jQuery. -->

### Quels avantages ?

* Chaque script est bien séparé, modulaire et réutilisable
* La gestion des évènements onready, onload, onresize et onscroll est simplifiée
* Chaque objet a son fichier et peux n’être appelé que selon un contexte

### Comment fonctionne t-il ?

* Un objet _Master_ contient le fonctionnement du squelette
* Un objet _Global_ propre à chaque projet contiendra les méthodes utile à toute l’application
* Un objet (un fichier) pour tous les modules et les pages que l’on souhaite. Ils hériteront des objets _Master_ et _Global_ mais pas des uns les autres (mais vous pouvez créer un submodule qui rérite de son parent)
* Chaque méthode est initialisable onready, onload, onresize ou onscroll, ainsi qu'en dehors de ce squelette : _MyObjet.methodName()_
* Le squelette est orienté _mobile first_ et contient la détection des médias queries

### Dépendances :

* [matchMedia.js](https://github.com/paulirish/matchMedia.js/blob/master/matchMedia.js)
* Vous pouvez utilisez bower pour l'installer : ````bower install````

````html
<script src="bower_components/matchMedia/matchMedia.js"></script>
<script src="jquery-1.10.2.min.js"></script>
<script src="helpers.js"></script>
<script src="master.js"></script>
<script src="global.js"></script>
<script src="module.js"></script>
````
