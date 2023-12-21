
# CI/CD devoir - documentation
**Groupe : Fabien PONCET - Bilal Bouterbiat**

Pour ce projet, nous avons décidé d'utiliser un dockerfile afin de dockeriser notre projet pour facilité le déploiement.

## Intégration continue

Les différentes commandes afin de lancer la CI : 

L'installation des dépendances en utilisant npm : 

```
npm install
```

Vérification de la qualité du code grâce au linter : 

```
npm run lint
```

Lancement des tests : 

```
npm run test
```

Build du projet : 

```
npm run build
```

Vérification du linter dockerfile : 

```
hadolint Dockerfile
```

Cette suite de commande est joué à chaque fois que l'on déclenche la CI. Cela nous permet d'être certain que le code que l'on commit soit saint et non régressable.
Si la CI détecte une erreur (ex: les tests ne passent pas) lors d'une PR, alors elle s'arrête et le code ne peut être merge.


## CD

Lors de la CD nous avons décidé de déployer une image docker pour des choix d'optimisations.
Lorsque nous déployons via une livraison continue alors le tag de l'image sera spécifié sur dockerhub.
Lorsque nous déployons via un déploiement continue alors il n'y aura pas de tag spécifié mais la mention 'latest', permettant d'indiquer qu'il s'agit de la dernière version.


## Procédure à suivre pour Damien Duportal

Comme vue précedemment, Damien aura deux possibilités pour déployer l'application.
Soit la livraison continue : 

- Création d'un tag (selon une mise à jour majeur, mineur ou un correctif).
- Pousser le tag qu'il aura tout juste créer.
- Suivre l'état de la CI pour vérifier que tout s'est bien déroulé.

 Soit le déploiement continue : 

- Création d'une PR qui aura pour source sa branche et destination la branche main.
- La CI se lance, il pourra alors vérifier que tout se passe correctement.
- Si la CI passe, il devra valider le merge de la PR.
- Vérifier sur github action le déploiement de l'image docker.





# Documentation technique projet calculateur de calorie

## 1. Description du projet 

Le projet a été réalisé dans le cadre du challenge stack de notre 1ère année de Master. 

Le projet permet d'analyser l'apport calorique et les macros nutriments d'une recette. Chaque recette analysée est stockée dans la liste des recettes de l'application. 

Les utilisateurs peuvent modifier et supprimer les recettes qu'ils ont eux même sauvegardées. Une authentification est requise pour accéder à la liste des recettes, ainsi qu'à l'enregistrement d'une recette.

Les appels à l’API se font en HTTP sur un serveur Node.js (Express).

Le Frontend est fait en VueJS

## 2. Documentations des projets

Front : [Documentation Front VUE](https://github.com/basile2121/challenge-stack-vue-front/blob/documentation/Documentation/README.md)

[GitHub](https://github.com/basile2121/challenge-stack-vue-front)

Back : [Documentation Back API](https://github.com/Yaamto/challenge-stack-node-back/blob/documentation/Documentation/README.md)

[GitHub](https://github.com/Yaamto/challenge-stack-node-back)

## 3. Architecture technique du projet 

![Vue.js + Node.js + Express + MongoDB example: MEVN stack ...](https://bezkoder.com/wp-content/uploads/2020/02/vue-node-express-mongodb-crud-mean-stack-architecture.png)

## 4. Fonctionnalités implémentées 

##### API : 

- Sécurisation de l'API
- Swagger pour la documentation de l'API

**Authentification :**

- Inscription : Permet à l'utilisateur de s'enregistrer sur le site via un formulaire. Son mot de passe est crypté dans l'API.
- Login : L'utilisateur peut se connecter grâce à son email et son mot de passe via un formulaire.
- Logout : Permet à l'utilisateur de se déconnecter
- Whoami : Endpoint API pour vérifier si le token de l'utilisateur est valide

**Calculator :** 

- Importer un fichier JSON d'une recette
- Lancer l'analyse du fichier JSON importé
- Affichage de l'analyse avec le total calorique de la recette, le nombre de protéines, glucides et lipides de la recette.
- Enregistrer la recette importée en BDD
- Exporter dans un fichier JSON la recette importée  
- Exporter dans un fichier CSV la recette importée

**Recettes :** 

- Liste des recettes disponibles dans la BDD
- Affichage des informations de la recette dans une carte : 
  - Liste des ingrédients de la recette avec le détail de chaque macro-nutriment.
  - Résumé de l'analyse de la recette (totaux calorique, glucides, lipides, protéines) et possibilité de lancer une nouvelle analyse
  - Listes des étapes de la recette, avec un "voir plus" s'il y a plus de 2 étapes.
  - Pour l'utilisateur qui a créé la recette : 
    - Possibilité d'accéder au référentiel de la recette et de modifier les ingrédients
    - Supprimer sa recette
  - Informations sur le propriétaire de la recette

**Autres :** 

- Générer une recette aléatoire
- Téléchargement de la recette dans un fichier JSON
- Responsivité

## 5. Déploiement de l'application

### 5.1 Front

Lancer le build dans le projet VueJS : 

```
npm run build
```

Cette commande générera un dossier dist qu'il faudra déplacer dans le dossier public du projet NodeJs.

### 5.2 API

Pour l'API il faut héberger le code sur un serveur. Puis via GIT mettre en place une CI/CD qui mettra le code en production automatiquement sur le serveur.

## 6. Mise en place de Google Analytics

Le but de Google Analytics va être de pouvoir faire des statistiques d'utilisation de notre projet et analyser le trafic du site. Il permettra de savoir quelle proportion d'utilisateurs enregistrent leurs recettes sur le site suite à leurs résultats.

Pour ça il suffit de suivre le tutoriel d'implémentation dans un projet nodeJS : https://cloud.google.com/appengine/docs/flexible/nodejs/integrating-with-analytics?hl=fr

