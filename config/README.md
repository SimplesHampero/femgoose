The config file exported by index.js maps to the NODE_ENV environment variable, provided when starting the application.

For example, if the application is started with

`NODE_ENV=development`

config.development.js will be loaded, likewise 

`NODE_ENV=production`

Will load config.production.js. 

If you would like to introduce a new environment into the application, you need to create a new add a new config file, naming the file with your new environment's name. 

Example (executed from root directory):

Creating a new environment 'demo'

`cp config/~config.development.js config/config.demo.js`

Then inside the new config.demo.js, add the new environment variable to the 'environments_available' property inside the app property of the config object.

For example

`
    module.exports = {
        app: {
            port: 6000,
            base_url: "/",
            http_host: "http://demo.example.com/",
            environments_available: [
                "development",
                "staging",
                "production",
                //Your new,
                "demo"
            ] 
        },
        ...
    };
`
