const ENV = process.env.NODE_ENV || "development";

//Export the config respective of the environment the app is running on development/production
module.exports = require(`./config.${ENV}.js`);