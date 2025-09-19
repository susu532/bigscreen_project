## Déploiement

### Technologies Requises

**Backend :**
- PHP >= 8.1
- Composer
- MySQL >= 5.7 ou SQLite
- Node.js >= 16 (optionnel)

**Frontend :**
- Node.js >= 16
- npm ou yarn

### Instructions de Déploiement

#### Backend (Laravel)
```bash
# 1. Installation des dépendances
cd backend
composer install

# 2. Configuration environnement
cp .env.example .env
# Configurer DB_CONNECTION, DB_HOST, DB_DATABASE, etc.

# 3. Génération clé application
php artisan key:generate

# 4. Migration et seeding
php artisan migrate
php artisan db:seed

# 5. Démarrage serveur
php artisan serve
```

#### Frontend (React)
```bash
# 1. Installation dépendances
cd frontend
npm install

# 2. Configuration environnement
# Créer .env avec VITE_API_BASE_URL=http://localhost:8000/api/v1

# 3. Démarrage serveur développement
npm run dev

# 4. Build production
npm run build
```

### Actions Nécessaires

1. **Configuration base de données** : Créer la base et configurer les connexions
2. **Variables d'environnement** : Configurer les URLs et clés de sécurité
3. **Permissions** : Configurer les permissions de fichiers pour Laravel
4. **CORS** : Vérifier la configuration CORS pour la communication frontend/backend
5. **SSL** : Configurer HTTPS en production