USAGE COMMANDS
--------------

> Please be aware that following tools should be installed in advance on your computer: **node.js**. 

> Please **clone/download** project, open **project's main folder** in your favorite **command line tool** and then **proceed with steps below**. 

Usage steps:
1. In a command line tool init nmp with `npm install`
1. In a command line tool start application with `node app.js`
1. In a http client (e.g. Postman) use **GET** method and **without any role** (authorization: **No Auth**, credentials: **none**) visit **public** page `http://localhost:3000`
   * Expected message **Hello World**
1. In a http client (e.g. Postman) use **GET** method and **without any role** (authorization: **No Auth**, credentials: **none**) visit **user** page `http://localhost:3000/user`
   * Expected message **Unauthorized for this Resource**
1. In a http client (e.g. Postman) use **GET** method and **without any role** (authorization: **No Auth**, credentials: **none**) visit **admin** page `http://localhost:3000/admin`
   * Expected message **Unauthorized for this Resource**
1. In a http client (e.g. Postman) use **GET** method and **USER role** (authorization: **Basic Auth**, credentials: **user/user123**) visit **token** page `http://localhost:3000/token`
   * Expected **user's token**   
1. In a http client (e.g. Postman) use **GET** method and **user's token** (authorization: **Bearer Token**, token: **user's token**) visit **public** page `http://localhost:3000`
   * Expected message **Hello World**
1. In a http client (e.g. Postman) use **GET** method and **user's token** (authorization: **Bearer Token**, token: **user's token**) visit **user** page `http://localhost:3000/user`
   * Expected message **Hello World User**
1. In a http client (e.g. Postman) use **GET** method and **user's token** (authorization: **Bearer Token**, token: **user's token**) visit **admin** page `http://localhost:3000/admin`
   * Expected message **Unauthorized for this Resource**
1. In a http client (e.g. Postman) use **GET** method and **ADMIN role** (authorization: **Basic Auth**, credentials: **admin/admin123**) visit **token** page `http://localhost:3000/token`
   * Expected message **admin's token**
1. In a http client (e.g. Postman) use **GET** method and **admin's token*** (authorization: **Bearer Token**, token: **admin's token**) visit **public** page `http://localhost:3000`
   * Expected message **Hello World**
1. In a http client (e.g. Postman) use **GET** method and **admin's token*** (authorization: **Bearer Token**, token: **admin's token**) visit **user** page `http://localhost:3000/user`
   * Expected message **Hello World User**
1. In a http client (e.g. Postman) use **GET** method and **admin's token*** (authorization: **Bearer Token**, token: **admin's token**) visit **admin** page `http://localhost:3000/admin`
   * Expected message **Hello World Admin**
1. Clean up environment 
     * In a command line tool stop application with `ctrl + C`


USAGE IMAGES
------------

![My Image](readme-images/image-01.png)

![My Image](readme-images/image-02.png)

![My Image](readme-images/image-03.png)

![My Image](readme-images/image-04.png)

![My Image](readme-images/image-05.png)

![My Image](readme-images/image-06.png)

![My Image](readme-images/image-07.png)

![My Image](readme-images/image-08.png)

![My Image](readme-images/image-09.png)

![My Image](readme-images/image-10.png)

![My Image](readme-images/image-11.png)


DESCRIPTION
-----------

##### Goal
The goal of this project is to present how to **secure** using **Basic Authentication** and **OAuth2 JWT** an example application type **API REST** in **JavaScript** programming language with usage **express** framework. This application consists of following endpoints:
* **one API endpoint for token**: this endpoint returns token after successful authentication by Basic Authentication method (credentials)
* **three API endpoints for content**: one public, one available for USER and ADMIN roles and one available only for ADMIN role. These endpoints are secured by Bearer Token authentication method (token)

##### Terminology
Terminology explanation:
* **JavaScript**: is a scripting or programming language that allows you to implement complex features on web pages or to implement web applications.
* **API REST**: an architectural style for an application program interface (API) that uses HTTP requests to access and use data
* **Express framework**: Express.js is the most popular web framework for Node.js. It is designed for building web applications and APIs and has been called the de facto standard server framework for Node.js.
* **Basic Authentication**: Basic Authentication means that encoded by Base64 credentials - username and password - are sent in request header 'authorization'
* **OAuth2 JWT**: Auth2 JWT means that token type JWT - JSON Web Token - is sent in request header 'authorization'. This token has to be decoded with "secret" text and "expriraton date" has to be checked. If token is ok then developer can use data from "payload" section.   

##### Flow
The following flow takes place in this project:
1. User via any http client sends request to application for the token using Basic Authentication and credentials specific for user.
1. Application sends back response to user via http client with token specific for authenticated user.
1. User via any http client sends request to application for the content using Token Bearer authentication and token from previous request.
1. Application sends back response to user via http client with message. This message depends on wheter the user has a proper role for this resource or not.

##### Launch
To launch this application please make sure that the **Preconditions** are met and then follow instructions from **Usage** section.

##### Technologies
This project uses following technologies:
* **JavaScript**: `https://docs.google.com/document/d/1wtk8TTIDLsHSvtyUp7uCk-pOKTpmNwMANRGmBNaoBpc/edit?usp=sharing`
* **Node** (section 'Node'): `https://docs.google.com/document/d/1wtk8TTIDLsHSvtyUp7uCk-pOKTpmNwMANRGmBNaoBpc/edit?usp=sharing`
* **Npm** (section 'Npm'): `https://docs.google.com/document/d/1wtk8TTIDLsHSvtyUp7uCk-pOKTpmNwMANRGmBNaoBpc/edit?usp=sharing`
* **Express framework** (section 'Express Framework'): `https://docs.google.com/document/d/1wtk8TTIDLsHSvtyUp7uCk-pOKTpmNwMANRGmBNaoBpc/edit?usp=sharing`


PRECONDITIONS
-------------

##### Preconditions - Tools
* Installed **Operating System** (tested on Windows 11)
* Installed **Node** (tested on version 18.18.1)

##### Preconditions - Actions
* Download **Source Code** (using Git or in any other way) 
* Open any **Command Line** tool (for instance "Windonw PowerShell" on Windows OS) on downloaded **project's main folder**