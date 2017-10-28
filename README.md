# femgoose
File system structure for an Express (NodeJS) +  Mongoose (MongoDB) API.


## Installation

### NPM Dependancies

To install the application, firstly you'll want to install the project's dependancies using either npm or yarn.

`npm install`


#### Development

Nodemon is used to run the application in development, you'll want to have this installed globally on your machine. You may need to use 'sudo' for this.

`npm install -g nodemon` 

### Configuration

You'll then want to setup the applications configuration. You'll find two files in the config folder

`config/~config.development.js`

`config/~config.production.js`

Rename these files, removing the initial '~' character, or create new ones with the following names:

`config/config.development.js`

`config/config.production.js`

The index file in the root folder of the config directory requires the config file based on the NODE_ENV environment variable. 

**Note All application config files are ignored, i.e. 'config.NODE_ENV.js', where NODE_ENV is the value of the NODE_ENV environment variable. 

If you're developing as part of a team, each member of the team should setup their development config files.

**You may wish to remove the gitignore entry for config.production.js, this application assumes that you do not want to track this via source control. Simply edit the .gitigore file to alter this behaviour.**
