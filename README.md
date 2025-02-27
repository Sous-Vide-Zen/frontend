# Sous-Vide Zen

Sous-Vide Zen is a website for sharing and discovering recipes for sous-vide cooking, a technique that involves cooking food in vacuum-sealed bags at precise temperatures. Users can create their own recipes, browse popular and featured recipes, follow other users, react and comment on recipes, and save their favorites.

## Features

- Registration and authorization on the site
- Share recipes
- Popular recipes feed
- Subscription feed
- Share recipes
- Comment recipes
- Reactions to recipes and comments
- Favorite recipes
- Hash tags
- Search recipe database

## Getting Started

### Install

Clone the repository and navigate to it on the command line:

```shell
git clone git@github.com:Sous-Vide-Zen/frontend.git
cd frontend
```

Install dependencies:

```shell
npm install
# or
yarn
# or
```

Make .env file:

```bash
cp .env.example .env
```

### Run project

#### Development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Storybook

```bash
npm run storybook
# or
yarn storybook
```

page will be open in your default browser.

### Docker

all settings stored in .env.prod

build `npm run docker:build`
start `npm run docker:start`
