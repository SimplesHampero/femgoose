module.exports = {
    app: {
        port: 6000,
        base_url: "/",
        http_host: "http://localhost/",
        environments_available: [
            "development",
            "staging",
            "production"
        ] // Accepted environments variables to be passed to the app via NODE_ENV on startup
        //e.g. NODE_ENV=development|staging\production node server.js
    },
    security: {
        jwt_secret: "X)72w(]LCXHn!j8{bR2;K<eDYth4",
        password_salt_iterations: 10
    },
    database: {
        name: "femgoose", // Name of the mongodb database
        port: 27017 // Port running mongodb on the machine
    }
}
