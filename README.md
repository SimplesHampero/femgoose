# fs-express-mongoose
File system structure for an Express (NodeJS) +  Mongoose (MongoDB) API.


## Installation

###NPM Dependancies

To install the application, firstly you'll want to install the project's dependancies from npm.

`npm install`

###Configuration

You'll then want to setup the applications configuration. You'll find two files in the config folder

`config/~config.development.js`

`config/~config.production.js`

You'll want to either rename these files, removing the initial '~' character, or create new ones with the following names:

`config/config.development.js`

`config/config.production.js`

**Note: Config files are ignored. If you're developing as part of a team, each member of the team should setup their development config files.**

**You may wish to remove the gitignore entry for config.production.js, this application assumes that you do not want to track this via source control. Simply edit the .gitigore file to alter this behaviour.**
