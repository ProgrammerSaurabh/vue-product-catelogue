# Vue Product Catalogue

## Copy environment variables

```
cp .env.example .env.local
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Jest testing

```
npm test
```

### Serve electron desktop app

```
npm run electron:serve
```

### Build electron desktop app installer

```
npm run electron:build
```

### To create docker image

```
docker build -t productcatelogue .
```

### To run docker image

```
docker run -it -p 8080:8080 -d --name productcatelogue productcatelogue
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
