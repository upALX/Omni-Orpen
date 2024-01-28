# Orpen Weather

**Overview**

This is an rest api that consult weather data without the need for identification by the user.

🛠️*This project is under development*🛠️

![giphy](https://github.com/upALX/All-Assets/blob/main/construction-little-girl.webp)

---

## Tech stack
![typescript](https://img.shields.io/badge/-typescript-05122A?style=flat&logo=typescript)&nbsp;
![Node.js](https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=Node.js)&nbsp;
![NestJS](https://img.shields.io/badge/-NestJS-05122A?style=flat&logo=NestJS)&nbsp;
![postgresql](https://img.shields.io/badge/-postgresql-05122A?style=flat&logo=postgresql)&nbsp;
![docker](https://img.shields.io/badge/-Docker-05122A?style=flat&logo=docker)&nbsp;

## How to use 🫁

**requirements:**
  - Docker >= 24.0.7
  - Docker compose >= 1.29.2

**1 - Clone this repo:**
```
git@github.com:upALX/Orpen-Weather.git
```

**2 - Install all dependencies:**
```
npm i
```

**3 - As good practice this project use env variables, so on root folder of project, create an file named ```.env``` and put the variables:**

```
DB_HOST=LOCALHOST
DB_PORT=5432
DB_USERNAME="alx"
DB_PASSWORD="alxroot"
DB_NAME="weather_app"
DB_ADMIN_EMAIL="alx@root.com"
```

**4 - Run on terminal the docker compose to up all services db and admin:** 
```
docker-compose up
```

**5 - Access page admin of postgres on host: ```http://localhost:8081``` and create a server to db:**
- Log in using your email and password in the docker-compose.yml file for the pgadmin service.
- On Dashboard, click in 'Add New Server';
- In 'General', add a Name to the server of your choice;
- In 'Connection', fil 
- In the Connection tab, fill in the following details:
    - Host name/address: postgres
    - Port: 5432
    - Maintenance database: postgres
    - Username: alx (same value username of ```.env``` file);
    - Password: alxroot (same value password of ```.env``` file)
- Click to save connection.

**6 - Access the databases of Orpen-Weather:**
- Into OrpenWeatherDB tab right click
- Click in CREATE script;
- Into page of scripts, put the SQL script below and run:
    ```
    CREATE TABLE IF NOT EXISTS "Weather" (
    id SERIAL PRIMARY KEY,
    weather_key UUID NOT NULL,
    city VARCHAR(21) NOT NULL,
    country VARCHAR(2) NOT NULL,
    weather_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "Webhooks" (
    id SERIAL PRIMARY KEY,
		webhook_key UUID NOT NULL,
    city VARCHAR(21) NOT NULL,
    country VARCHAR(2) NOT NULL,
    webhook_url VARCHAR(700) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    );
    ```
**7 - After that run the application in the terminal**
```
npm run start
```

*If any problem with connection db, on IDE-terminal in root folder rebuild the db:*
```
docker-compose up --build
```

---
*To access all features of this API, click [here](https://upalx.notion.site/OrpenWeather-Docs-9cf62cf2bae7455f97cb5343090c0138?pvs=4) and learn how to use with the docs.*

## Make your mark :triangular_flag_on_post:   

**If you have any problems with this app or have an idea that contributes, open a [issue](https://github.com/upALX/Orpen-Weather/issues), [pull request](https://github.com/upALX/Orpen-Weather/pulls) or find me on [Linkedin](https://www.linkedin.com/in/alxinc/). Don't forget to give the project a star 🌟 :D**

## License :unlock:

This project is under the [MIT license](https://github.com/upALX/Orpen-Weather/blob/main/LICENSE).

---

**Developed with 💜 by ME**
