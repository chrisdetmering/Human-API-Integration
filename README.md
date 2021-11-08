# Getting Started

The following are detailed instructions on how to set this project up locally. There are certain assumptions we took in crafting these steps. We are going to list those next as well as the tech stack used in the development of this project.

### Assumptions


* This setup is for a MacBook Pro with macOS High Sierra version 10.13.6.
* You have none of the technologies listed in the tech stack installed on your computer.
* You have basic terminal navigation skills (how to navigate around files by using cd, for example).

### Tech Stack 
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Semantic-Ui-React](https://react.semantic-ui.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [HumanAPI](https://reference.humanapi.co/docs)

## Installation Steps

Here is an overview of all the steps: 

* [Installing Visual Studio Code (VSC)](#installing-visual-studio-code)
* [Installing Node & npm](#installing-node-and-npm)
* [Git](#git)
* [Cloning the Repo](#cloning-the-repo)
* [Opening Project in VSC](#opening-project-in-vsc)
* [Sample_env File](#sample_env-file)
* [Downloading PostgreSQL](#downloading-postgresql)
* [Create .env File](#create-dotenv-file)
* [Backup SQL](#backup-sql)
* [Installing Dependencies and Running Project](#installing-dependencies-and-running-project)



## Installing Visual Studio Code
We are going to start this setup by making sure we have an IDE or text editor. 
We are going to use [Visual Studio Code](https://code.visualstudio.com/). Click on the link provided and follow the instructions for downloading the text editor. 

## Installing Node and npm 
Next, let's make sure we have Node.js installed and npm. To check for this navigate to your terminal (we are assuming you know how to do this) and type: 

```
node -v
```

And 

```
npm -v
```

If you have node installed, for example, you should see a node version pop up in your 
terminal same for npm. 

![node](images/node.png)

If you do not have Node.js. Then navigate to [Node's website](https://nodejs.org/en/) and 
download the latest stable version (LTS). 

<insert screenshot>

And then run:

```
node -v
```

Again. This time, you should see a Node version show up:

<insert screenshot>


If you do not have npm installed, then run: 

```
npm install -g npm
```

!!!WARNING!!! 

You might get the following error when you run this command in your Mac terminal

<Insert error screenshot>

If you get this, then try:

```
sudo npm install -g npm
```

If you do this, you will be prompted to enter in your password that you used to 
get into your Mac. 

As with Node, check if the intallation was successful by running:

```
npm -v
```

You should see the following show up in tour terminal but with a newer version number: 

<Screenshot>

## Git

Let's make sure we have git. Type in your terminal: 

```
git --version
```

If you are on a Mac then you will most likely get a pop up that looks like this: 

<Screenshot>

If that is the case, then click on install. As we have done previously, let's make sure 
that the installation worked by running: 

```
git --version
```

## Cloning the Repo

Now that we have git installed, let's clone down the repo. In order to do this, go 
to the [projects repo](https://github.com/chrisdetmering/Human-API-Integration) or just 
scroll up if you are already there and click the code button and then the 
copy to keyboard button: 

<Screenshot>

Then open up a terminal window and cd into the directory that you want to clone 
the repo in to. You will then type into the terminal: 

```
git clone https://github.com/chrisdetmering/Human-API-Integration.git
```


## Opening Project in VSC

Open Visual Studio and open the project by clicking the Open: 

 <Screenshot>

The file navigation will open up, select the folder you saved the cloned repo to. By default, it should be Human-API-Integration. Then click Open: 

<Screenshot>

## Sample_env File

After you have opened the project, the file structure should look like this: 

<Screenshot>

Click on the sample_env file 

<Screenshot>

Inside of this file, we have a schema for creating our .env file. An .env file is where we keep or environment variables for the project that we don’t want to make public, 
like secret API keys or Database passwords. The file should look like this: 

<Screenshot>

Let’s fill these in first and then we will make our .env file and copy and paste what we filled in this file to our .env file. 

We are going to take each one of these step by step. 
```
CLIENT_ID & CLIENT_SECRET 
```
These two environment variables you are going to get by contacting contact@humanapi.co to set up an active contract. 

```
TOKEN_AUTH_ENDPOINT 
```
Per the [Human API docs](https://reference.humanapi.co/docs/start-a-user-session) this will be 
https://auth.humanapi.co/v1/connect/token

```
SESSION_SECRET
```
This can be any random string that the app uses as the secret for the session 


## Downloading PostgreSQL

For the next four environment variables, we are going to need to have PostgreSQL installed. 
To do this (and to download the other tools you are going to need) go to this [link](https://www.postgresql.org/download/macosx/)   and click Download the installer: 

<Screenshot>


This will take you through an installer that will download psql, a CLI for interacting with PostgreSQL & pgAdmin a GUI for interacting with your postgreSQL server. Take note of the password that you are prompted to make in the setup wizard. You will need to keep that for our environment variables. 

After the wizard has completed, go to your Applications and look for a folder with the name of PostgreSQL 14 

<Screenshot>

Click on the PostgreSQL 14 folder and inside you will see the following: 

<Screenshot>

Click on pgAdmin 4 and you will be prompted to make up a master password. Be sure to save this as you will be prompted to enter this every time you have closed pgAdmin and opened it again. 

<Screenshot>

Next, click on servers and you should see PostgreSQL be the only server listed. Additionally, there will be a pop up that will ask you for the password that we saved earlier for postgreSQL in the setup wizard. 


<Screenshot>

With what we have done so far with postgreSQL, we can fill in 3/4 remaining environment variables. 


```
DB_PASSWORD=password 
```
This will be set to the password you just entered. So in my case, my password was ‘password’. Therefore 


```
DB_HOST=localhost
```
!!!WARNING!!! 
Use localhost instead of 5432 because this might make you run into an error while interacting with the session. 
We are not sure why this is the case but this is the only work around we could find. 

```
DB_USER=postgres 
```

This is the default user for postgreSQL unless you set it to something else. If you set it to something else, insert that here.

We just need one more environment variable and that is 

```
DB_DATABASE
```

We do not have this yet because we have not created it. We will do that now. 

Click on the PostgreSQL 14 server you will see some options including Databases toggle open 

<Screenshot>

Click on Databases and a tooltip will pop open. There will be an option to create a database:

<Screenshot>

Click on Create > Database and pick a name for the DB. For example, human_api

<Screenshot>

Click the Save button and then your DB will be created. 

Now we can fill in our last environment variable: 

DB_DATABASE=human_api (or whatever you named it) 

Let’s make our .env file now that we have all the environment variables filled in. We will turn to that next. 


## Create Dotenv File

In order to do this, you can select to create a new file in Visual Studio Code 

<Screenshot>

And name it .env. 

We are going to copy and paste all the variables we have filled in so far. Your file should now look like this: 

<Screenshot>

Note that CLIENT_ID & CLIENT_SECRET are not filled in. You will need to get this from HumanAPI directly. 
Additionally, note that I just typed in a random string for the SESSION_SECRET. 
You can generate this however you want. 
Lastly, all the DB information is what we filled in, in the last couple of steps. 
If you did not choose the default name postgres as your database user, then the DB_USER environment variable should reflect that. 

## Backup SQL

We are almost there! 

We have a couple more things we need to do: create our database tables and install our dependencies using npm!

To create our database tables, you are going to select the database folder: 

<Screenshot>

And copy the contents of the backup.sql file 

<Screenshot>

You will then navigate to pgAdmin and open the query tool by clicking on the human_api database and selecting the query tool option:

<Screenshot>

This will pull up an interface that will allow you to paste in the SQL code you copied from the backup.sql file. 

Click the arrow button after you have pasted in all the SQL code: 

<Screenshot>

This will run your SQL query. Any errors that happen during the running of these sql scripts you will see below. 
Otherwise you will see “Query returned successfully in x msec”.


Aftering doing this, you should be able to navigate to your human_api database click on the Tables sections and see your newly created tables:

<Screenshot>

## Installing Dependencies and Running Project

Last step! 

We are going to run 
```
npm i 
```
In our root directory 

And then we will cd into the client directory and run 
```
npm i 
```
As well. 

We are doing this to download all the dependencies that our project needs. 

Lastly, 

Navigate back to the root directory and run 
```
npm run dev 
```
Then go to 

Localhost:3000 and you should see the project hosted! 
