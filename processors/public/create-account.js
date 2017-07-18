const User = require("../../model/user");
const ProcessorResponse = require("../../classes/processor-response");

const createUser = (data, cb) => {
    
    let user = new User(data);

    User.generateHash(user.password, (err, hash) => {
        
        if (err) {
            return cb(true, {message:"Error generating password."})
        }

        //Update the password with the hash
        user.password = hash;

        user.save(cb);
    });
};

const processor = (data, cb) => {

    console.log("Processing...");
    createUser(data.props, (err, user) => {
        
        console.log("Processing...");
        
        if (err) {
            console.log(err);
            console.log("Error processing...");
            
            return cb(new ProcessorResponse(err, null));
        }   

        user.password = null;
        
        console.log("Returning from processing...");
        return cb(new ProcessorResponse(null, {
            data: user
        }));
    });
 
};

module.exports = processor;