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

    createUser(data.props, (err, user) => {
                
        if (err) {
            return cb(new ProcessorResponse(err, null, 500));
        }   

        user.password = null;
        
        return cb(new ProcessorResponse(null, {
            data: user
        }));
    });
 
};

module.exports = processor;