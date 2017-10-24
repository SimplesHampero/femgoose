## Controllers

## DB
The DB directory includes all available database connections to the app. 

If you want to connect to multiple data sources, place your database connection logic inside a file in here and export the appropriate object. 

This application ships with a single 'main' connection, which is a mongoose connection connected to the database name defined in the application's config file. 

## Lib  

## Middleware

## Model

## Processors

## Views

The base directory for any views/templates that your application will serve. 

This directory is shipped with a "public" and "private" context, this seperates your application's public and private context. 
