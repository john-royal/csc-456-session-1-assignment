# High level component diagram

## High level component diagram
![img](./public/images/c-diagram.jpg)

When the web client is initiated the Vite built in web server serves either the feed or a log in interface dependent on whether the user is logged in. If the user is logged in then their data--profile photo and posts as well as any other relevant information--is fetched from the Database. Otherwise, if the user is not logged they will be prompted to and once done they will be authenticated withe Firebase auth, and the relevant data about the user is fetched from the database.


## This is about the ER diagram...
![img](./public/images/c-diagram.jpg)

## This is about the call sequence diagram...
![img](./public/images/c-diagram.jpg)