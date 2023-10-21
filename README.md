
# Front-end Movies

Front-end .React + Vite

## Instalação
Utilize preferencialmente o **npm** para as instalações e scripts.

```
npm install
```

### Desenvolvimento
```
npm run dev
```

### Produção
```
npm run build
```

## Features

- [x] Listagem de Gêneros;
- [x] Listagem de Filmes;
- [x] Cadastro de Filmes;
- [x] Edição de Filmes;
- [x] Exclusão de Filmes;
- [ ] Exclusão de Múltiplos Filmes;

## Estrutura de diretórios

```
├── node_modules
├── public
└── src
    ├── api
    ├── assets
    ├── components
    │   ├── Card
    │   └── Input
    │
    ├── models
    ├── pages
    ├── store
    ├── styles
    └── utils

```

### Obs*

A depender da forma de execução do projeto do backe-end, (IIS ou Docker), o mesmo será executado em portas diferentes, atente-se para dentro do diretório __api__, substituir para a URL a qual o seu back-end está sendo executado

### Não deu tempo*

- Criar página para lidar com os gêneros;
- Criar página para lidar com as regras de locações;
- Deploy do projeto
- Testes nas entidades

### Poderia ter*
- Variáveis de ambiente configuradas;