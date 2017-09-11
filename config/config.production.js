module.exports = {
    
        "application": {
            //Default port to run the express application on
            "port": 6000,
            
            "auth": {
    
                //Input your own JWT secret in here
                "jwt_secret": "X)72w(]LCXHn!j8{bR2;K<eDYth4",
    
                "password_salt_iterations": 10
            },
    
            //Accepted environments variables to be passed to the app via NODE_ENV on startup
            //e.g. NODE_ENV=development node server.js || NODE_ENV=production forever start server.js
            "environments_available": [
                "development",
                "production"
            ]	
        },
        "database": {
    
            //Name of the database
            name: "fs-express-mongoose",
    
            //Port running mongodb on the machine
            port: 27017,
        }
    }