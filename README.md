# Self-Bot Discord en JavaScript

Ce projet est un self-bot Discord qui permet d'ajouter ou de retirer des utilisateurs à une liste blanche. Les utilisateurs figurant sur cette liste peuvent interagir avec le bot sans restrictions. Ce bot comprend également des fonctionnalités telles que la sortie automatique des groupes et la détection de connexions.

## Commencer à travailler

Pour mettre en place une copie locale de ce bot et le faire fonctionner, suivez les étapes ci-dessous.

### Conditions préalables

Voici les éléments nécessaires pour utiliser le bot et comment les installer :

- **Node.js**  
  Pour installer Node.js, rendez-vous sur [nodejs.org](https://nodejs.org/) et téléchargez la dernière version stable. Après l'installation, vous pouvez vérifier que Node.js et NPM sont correctement installés en exécutant :

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

2. **Accédez au répertoire du projet**  
   Changez de répertoire vers le projet cloné :

   ```sh
   cd Discord-Self-Bot
   ```

3. **Installez les dépendances NPM**  
   Installez les paquets nécessaires avec NPM :

   ```sh
   npm install
   ```

4. **Configurez votre bot**  
   Créez un fichier `config.json` dans le répertoire du projet et entrez votre token Discord et la liste blanche :

   ```json
   {
     "token": "VOTRE_TOKEN_DISCORD",
     "whitelist": ["ID_UTILISATEUR_1", "ID_UTILISATEUR_2"]
   }
   ```

### Fonctionnalités

- **Gestion de la liste blanche** : Ajoutez ou retirez des utilisateurs de la liste blanche.
- **Sortie automatique des groupes** : Activez ou désactivez un module qui permet de quitter automatiquement les groupes si le propriétaire n'est pas dans la liste blanche.
- **Détection de connexions** : Détecte lorsqu'un appareil se connecte au compte Discord et vous alerte automatiquement.

### Avertissement

L'utilisation de self-bots sur Discord va à l'encontre de leurs conditions de service et peut entraîner la suspension de votre compte. Utilisez ce bot à vos propres risques.

### Aide et support

Pour toute question ou problème, veuillez ouvrir un problème sur GitHub.
