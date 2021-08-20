# Bienvenue sur Groupomania
## Projet 7 de la formation développeur web par Openclassrooms.
### Les techno utilisé
J'ai utilisé pour Groupomania le frameworks **Vue**, qui est un framework **JavaScript**, et donc tourne sous **NodeJS**, avec quelques package, en voici la liste:

#### Coté backend: 
1. bcrypt 
2. body-parser 
3. cors 
4. crypto-js 
5. dotenv
6. express 
7. fs 
8. jsonwebtoken 
9. multer 
10. path 
11. router 
12. sequelize 
13. vuex

#### Coté frontend: 
14. axios
15. bootstrap-vue
16. core-js
17. moment
18. vue
19. vue-router
20. vuex

Pour la sauvegarde des données, une base de donnée relationnel à été utilisé, pour cela, j'ai utilisé le langage **SQL** à l'aide d'un système de gestion de base de données (SGBDR) qui sera **MySQL**

### Mise en place
Pour la mise en place, initialisez le projet: 
`npm init`

Installer les dépendances nécessaire:
`npm install [nom de la dépendance] --save`

Ou simplement:
`npm install`

Lancer le serveur backend depuis le dossier *backend*: 
`nodemon`

Lancer Vue-CLI depuis le dossier *frontend*:
`npm run serve`

Crée un fichier nommé *db.config.js* dans le dossier *config* du backend
`touch backend/config/db.config.js`

Et remplissez les information de connexion à la base de donnée:
```
module.exports = {
  HOST: "[localhost]",
  USER: "[...]",
  PASSWORD: "[...]",
  DB: "[...]",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

Si tout c'est bien passé, vous pouvez y accedé depuis http://localhost:8080

### Sécurité
Pour la sécurité, les mot de passe enregistré dans la base de donnée sont tous hashé à l'aide du package **bcrypt**, un **token** est utilisé dans le **Header Authorization** pour chaqune des requete au serveur, et pour la navigation le **store de vuex** et le **localStorage** sont utilisés.

### Fonctionnalité
* **Création d'un compte** sur ordinateur ou sur smartphone simplifié.
* Très peu d'information sont demandés lors de la création d'un compte.
* Les informations de connexion sont garder 24h, mais il est possible de **se déconnecter** avant.
* La **suppression** de son compte est possible et définitive.
* La possibilité d'ajouter une **image**, ou un **article texte** au réseau.
* La possibilité de **liker**, **disliker**, **commenter** ou **modifier** ces derniers.
* Une **administration** à aussi été mise en place pour modérer les excès ou autres...
