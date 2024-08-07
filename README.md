# Orpen Weather

**Overview**

This is an rest api that consult weather data without the need for identification by the user. **After run the app, you can learn about the features and endpoints on [Orpen Weather DOCS](https://upalx.notion.site/OrpenWeather-Docs-9cf62cf2bae7455f97cb5343090c0138)**.

🎆*This project is on MVP*🎇

![giphy](https://github.com/upALX/All-Assets/blob/main/gif-tompero-go.webp)

---

## Tech stack
![typescript](https://img.shields.io/badge/-typescript-05122A?style=flat&logo=typescript)&nbsp;
![Node.js](https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=Node.js)&nbsp;
![NestJS](https://img.shields.io/badge/-NestJS-05122A?style=flat&logo=NestJS)&nbsp;
![postgresql](https://img.shields.io/badge/-postgresql-05122A?style=flat&logo=postgresql)&nbsp;
![TypeORM](https://img.shields.io/badge/-TypeORM-05122A?style=flat&logo=typeform)&nbsp;
![docker](https://img.shields.io/badge/-Docker-05122A?style=flat&logo=docker)&nbsp;

## How to use 🫁

**requirements:**
  - Docker >= 24.0.7
  - Docker compose >= 1.29.2
  - Node >= 18.17.1

*Please, make sure you have all requirements installed to run this app*

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
DB_NAME="orpen_weather_db"
DB_ADMIN_EMAIL="alx@root.com"
API_KEY="2db21560ff5f54c94b8d81e901576f84"
```

**4 - Run on terminal the docker compose to up all services db and admin:** 
```
docker-compose up
```

**5 - Access page admin of postgres on host: ```http://localhost:8081``` and create a server to db:**
- Log in using as username: *DB_ADMIN_EMAIL* value and as password: *DB_PASSWORD* value in the ```.env``` file.
- On Dashboard, click in 'Add New Server';
- In 'General', add a Name of your choice to the server;
- In the Connection tab, fill in the following details:
    - Host name/address: postgres
    - Port: 5432
    - Maintenance database: postgres
    - Username: alx (same value *DB_USERNAME* of ```.env``` file);
    - Password: alxroot (same value *DB_PASSWORD* of ```.env``` file)
- Click to save connection.

**6 - Access the databases and create the tables**
- Into Servers > name you chose for the server > Databases > In ```orpen_weather_db``` tab right click;
- Click in CREATE script;
- Into page of scripts, remove all the SQL there and put the SQL script below, after that run(F5):
    ```
    CREATE TABLE IF NOT EXISTS "weather" (
	id SERIAL PRIMARY KEY,
	weather_key UUID NOT NULL,
	city VARCHAR(85) NOT NULL,
	country VARCHAR(2) NOT NULL,
	weather_data JSONB,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "webhooks" (
	id SERIAL PRIMARY KEY,
	webhook_key UUID NOT NULL,
    	city VARCHAR(85) NOT NULL,
    	country VARCHAR(2) NOT NULL,
    	webhook_url VARCHAR(700) NOT NULL,
    	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    ```

    *Verify into Schemas > Tables if the tables ```weather``` and ```webhooks``` was created*

**7 - After that run the application on your IDE-terminal:**
```
npm run start
```
**Now, the API is running 🚀**

*If you have any problem with connection db, on IDE-terminal in root folder restart the containers with this command:*
```
docker restart $(docker ps -q)
```
---
*To access all features of this API, click [here](https://upalx.notion.site/OrpenWeather-Docs-9cf62cf2bae7455f97cb5343090c0138?pvs=4) and learn how to use with the [Orpen Weather DOCS](https://upalx.notion.site/OrpenWeather-Docs-9cf62cf2bae7455f97cb5343090c0138?pvs=4).*

## Make your mark :triangular_flag_on_post:   

**If you have any problems with this app or have an idea that contributes, open a [issue](https://github.com/upALX/Orpen-Weather/issues), [pull request](https://github.com/upALX/Orpen-Weather/pulls) or find me on [Linkedin](https://www.linkedin.com/in/alxinc/). Don't forget to give the project a star 🌟 :D**

## License :unlock:

This project is under the [MIT license](https://github.com/upALX/Orpen-Weather/blob/main/LICENSE).

---

**Developed with 💜 by ME**
