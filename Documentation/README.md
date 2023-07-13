# Documentation côté Back end

## 1. Technologies

- Framework : [Node JS](https://nodejs.org/en) v18.16
- Langage : [Typescript](https://www.typescriptlang.org/docs/home) V5.1
- Dépendances importantes :
  - faker : [v8.0.2](https://www.npmjs.com/package/@faker-js/faker)
    - Permet de générer des fausses données pour générer notre recette aléatoire
  - bcrypt: [v5.0](https://www.npmjs.com/package/bcrypt) 
    - Permet de hacher les mot de passe de l'utilisateur
  - express : [v4.17](https://www.npmjs.com/package/express) 
    - Nous donne une architecture, ce qui permet de mieux maintenir le code dans le futur et d'avoir une logique cohérente pour notre API
  - dotenv: [v16.3](https://www.npmjs.com/package/dotenv) 
    - Nous permet d'avoir des variables d'environnement dans notre projet
  - mongoose : [v7.3](https://www.npmjs.com/package/mongoose) 
    - ODM qui permet le raccordement avec MongoDB
- GitHub : https://github.com/Yaamto/challenge-stack-node-back

#### Base de données : 

URL MongoDB : mongodb+srv://[username]:[password]@cluster0.ivelk.mongodb.net/[db_name]

*Utiliser MongoDB Compass pour y accéder*

**Modèle de données : **

![img](https://cdn.discordapp.com/attachments/938010834607669288/1127890835653001326/Capture_decran_2023-07-10_100632.png)

###  Installation locale du projet 

Cloner le projet github :

```shell
git clone https://github.com/Yaamto/challenge-stack-node-back
```

Installer les dépendances :

```nginx
npm install
```

Créer le .env suivant : 

```shell
PORT=3003
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
TOKEN_SECRET=
```

Lancer le projet :

```nginx
npm run dev
```

L’API démarre par défaut sur http://localhost:3003 par défaut. **Attention l'API n'accepte que le port 3000**

### 1.4 Fonctionnement technique

#### 1.4.1 EndPoint API 

```
Authentification : 
POST /register - S'enregistrer
POST /login - Se connecter 
POST /logout - Se déconnecter
GET /whoami - Vérifier le token

Recettes : 
GET / - Récupérer l'ensemble des recettes
POST / - Créer une recette
DELETE /{id} - Supprimer une recette
PUT /{id} - Modifier une recette
GET /analyse/{id} - Analyser l'apport calorique d'une recette
GET /random/create - Génére une recette aléatoire
```

### 1.5 Architecture des projets

```
|_challenge-stack-node-back
	|_ dist/
	|_ node_modules/       -->(template)
	|_ .env				-->(template)
	|-- src/
		|_ /config
		|_ /controller
		|_ /middleware
		|_ /model
		|_ /route
		|_ /service
		|-- index.php 
```

### 1.6 Postman

Collection Postman pour tester l'API : [Collection](https://github.com/Yaamto/challenge-stack-node-back/blob/documentation/Documentation/ChallengeStack.postman_collection.json)

