ABOUT PROJECT:
===============

- The project responsable register commands Discord bot and register schedule messages.

FEATURES:
==========

- Create command than will be add command in Discord bot in 1 or 2 minutes after registered 
- Create schedule message than will be trigger at in moment defined when create schedule message. OBS: The schedule messages is triggered behind the cronjob on application
- Register user
- Login 

ARCHITECTURE:
==============

![architecuture image](./arquitetura_aplicação.drawio.png)

DISCORD BOT:
=============

Link: https://github.com/tiago123456789/bot-discord


TECHNOLOGIES:
==============

- Node.js
- Typescript
- Nest.js
- Postgres
- Docker
- Docker compose

INSTRUCTION RUNNING THE PROJECT:
=================================

- Clone project
- Create **.env** file based in **.env.example**
- Execute command **npm install**
- Execute command **docker-compose up -d** to up database
- Execute command **npm run start:dev** to running bot locally
