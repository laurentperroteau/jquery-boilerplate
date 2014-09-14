
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

* Un objet Master contient le fonctionnement du squelette (et hérite de certaines “utilities” de Foundation)
* Un objet Global propre à chaque projet contiendra les méthodes utile à toute l’application
* Un objet (un fichier) pour tous les modules et pages que l’on souhaite (ils hériteront des objets Master et Global mais pas des uns les autres)
* Chaque méthode est initialisable onready, onload, onresize ou onscroll, ainsi que dans les autres script: MyObjet.methodName()
* Le squelette est orienté “mobile first” et contient la détection des médias queries
* Chaque objet est préfixé pour éviter les conflits

### Dépendances :

* jQuery
* la base de Foundation (juste le fichier foundation.js de la version 5.3.1), pas les plugins
un mini bout de CSS (celui des media queries de Foundation)
