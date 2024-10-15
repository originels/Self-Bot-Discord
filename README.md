# Self-Bot Discord en JavaScript

Ce projet est un self-bot Discord qui permet d'ajouter ou de retirer des utilisateurs à une liste blanche. Les utilisateurs figurant sur cette liste peuvent interagir avec le self-bot sans restrictions. Ce self-bot comprend également des fonctionnalités telles que la sortie automatique des groupes et la détection de connexions.

## Commencer à travailler

Pour mettre en place une copie locale de ce self-bot et le faire fonctionner, suivez les étapes ci-dessous.

### Conditions préalables

Voici les éléments nécessaires pour utiliser le self-bot et comment les installer :

### Get Token ?

- Run code (Discord Console - [Ctrl + Shift + I])

  ```js
  window.webpackChunkdiscord_app.push([
    [Math.random()],
    {},
    req => {
      if (!req.c) return;
      for (const m of Object.keys(req.c)
        .map(x => req.c[x].exports)
        .filter(x => x)) {
        if (m.default && m.default.getToken !== undefined) {
          return copy(m.default.getToken());
        }
        if (m.getToken !== undefined) {
          return copy(m.getToken());
        }
      }
    },
  ]);
  console.log('%cWorked!', 'font-size: 50px');
  console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
  ```

- **Node.js**  
  Pour installer Node.js, rendez-vous sur [nodejs.org](https://nodejs.org/) et téléchargez la dernière version stable. Après l'installation, vous pouvez vérifier que Node.js et NPM sont correctement installés en exécutant :

  **Node.js 16.6.0 or newer is required**
  
  > Recommended Node.js version: 18+ (LTS)
  ```sh
  node -v
  npm -v
  ```

### Installation

1. **Clonez le dépôt**  
   Clonez le dépôt GitHub à l'aide de la commande suivante :

   ```sh
   git clone https://github.com/your_username_/Discord-Self-Bot.git
   ```

2. **Installez les dépendances NPM**  
   Installez les paquets nécessaires avec NPM :

   ```sh
   npm install
   ```

3. **Configurez votre bot**  
   Créez un fichier `config.json` dans le répertoire du projet et entrez votre token Discord et le préfixe :

   ```json
   {
     "token": "VOTRE_TOKEN_DISCORD",
     "prefix": "VOTRE_PREFIX"
   }
   ```

### Exécution du bot

Pour lancer le bot, exécutez la commande suivante :

```sh
node index.js
```

### Fonctionnalités

- **Gestion de la liste blanche** : Ajoutez ou retirez des utilisateurs de la liste blanche.
- **Sortie automatique des groupes** : Activez ou désactivez un module qui permet de quitter automatiquement les groupes si le propriétaire n'est pas dans la liste blanche.
- **Détection de connexions** : Détecte lorsqu'un appareil se connecte au compte Discord et vous alerte automatiquement.

### Avertissement

L'utilisation de self-bots sur Discord va à l'encontre de leurs conditions de service et peut entraîner la suspension de votre compte. Utilisez ce self-bot à vos propres risques.

### Aide et support

Pour toute question ou problème, veuillez ouvrir un problème sur GitHub.
