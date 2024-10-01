# generate dockerfile for node:20.11-alpine3.18
# Utilisation de l'image node:20.11-alpine3.18 comme base
FROM docker.io/node:20.11-alpine3.18 as base

# Étape de construction du nœud
FROM base as node-build-stage

# Installation de libc6-compat
RUN apk add --no-cache libc6-compat

# Copie des fichiers de gestion des dépendances
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Installation des dépendances en fonction du fichier lock présent
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Étape d'exécution du nœud
FROM base as node-run-stage

# Définition du répertoire de l'application
ARG APP_HOME=/app
WORKDIR ${APP_HOME}

# Copie des modules node depuis l'étape de construction
COPY --from=node-build-stage /node_modules ./node_modules

# Copie du code source de l'application
COPY . ${APP_HOME}

# Création du groupe et de l'utilisateur 'nextjs'
#RUN addgroup -g 1001 -S nodejs && \
#  adduser -S nextjs -u 1001 -G nodejs

RUN mkdir -p ${APP_HOME}/.next && \
    mkdir -p ${APP_HOME}/.next/cache && \
    mkdir -p ${APP_HOME}/.next/server && \
    chown -R node:node ${APP_HOME} && \
    chmod -R 755 ${APP_HOME}

USER node


# Changement de propriétaire des fichiers de l'application
#RUN chown -R nextjs:nodejs ${APP_HOME}


# Définition de l'utilisateur 'nextjs' comme utilisateur par défaut
#USER nextjs

# Commande par défaut pour exécuter l'application
CMD [ "npm","run","dev" ]