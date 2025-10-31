# I Want Typescript

📜 Template repository for a new Node.js TypeScript project linted using ESLint with Prettier

## Usage

Install development dependencies:

```
npm install
```

Lint, then format `src/*.ts` by making in-place fixes:

```
npm run lint && npm run format
# or:
npm run fix
```

Run unit test suites:

```
npm run test
```

View coverage of unit tests:

```
npm run test:coverage
```

Build `src/*.ts` files into `dist/*.js` files:

```
npm run build
```

Serve `dist/index.js` using `node` (for production):

```
npm run start
```

Monitor file changes and serve `src/index.ts` using `nodemon` with `ts-node` (for development):

```
npm run watch
```


# Rendu personnel :

## TD1

### Question 2 

Le fichier package.json contient les informations générales à propos du template typescript fourni comme son nom, son auteur, sa licence mais surtout l'ensemble des dépendances nécessaires au projet ainsi que leur veresion minimale.
Le fichier package-lock.json contient l'ensemble des dépendances et sous dépendances du projets ainsi que les versions exactes associées au projet.

### Question 3

L'installation de la bibliothèque systeminformation ajoute la ligne suivante dans le fichier package.json :
```json
"dependencies": {
    "systeminformation": "^5.27.11"
```

`dependencies` et `devDependencies` contiennent les dépendances du projet mais `devDependencies` contient celles voulues par le développeur original tandis que `dependencies` contient celles rajoutées par l'utilisateur.

### Question 4

La principale difficulté fut le codage en TS, un langage que je ne connais pas.

### Question 5

On utilise ce formalisme afin de garder un code propre et facilement maintenable.

### Question 6

Le but d'écrire un tel jeu de test est de vérifier que la structure de la sortie est respectée ou que les données renvoyées sont correctes.


## TD2


### Question 4 

- Le flag -p sert à mapper un des ports de ma machine physique sur un port du container.

- Le flag -m sert à limiter la quantité de mémoire RAM allouée au conteneur en tuant le processus si il est trop gourmand.

- Le flag --cpus sert à limiter la puissance des cpus mis à disposition du conteneur.

Les seules options qui peuvent impacter l'application sont -m et --cpus en la tuant ou en la ralentissant si le nombre de cpus est sous-dimensionné.

### Question 5 

L'outil dive nous permet d'analyser en profondeur l'image crée. Je ne comprends pas comment on pourrait réduire l'image car docker est censé offrir l'image la plus légère possible. Il faudrait alors offrir une application source plus simple.

### Question 6 

L'image construite de manière multi-stage pèse 173MB contre 391MB pour la première image. En ne conservant que les fichiers nécessaires au run de l'application on gagne beaucoup de place. Cela veut dire qu'on peut déployer des applications en multistage qui seraient trop lourde en monostage.

### Question 8

J'utiliserai la commande `sh
docker pull
`




