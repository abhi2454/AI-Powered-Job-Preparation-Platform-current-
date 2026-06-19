const mongoose = require('mongoose');
const  dns = require("node:dns/promises")

async function connectToDB() {
    
    try {
        
        dns.setServers(["1.1.1.1","1.0.0.1"])

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to Database")

    }
    catch(err) {
        console.log(err);
    }

}


module.exports = connectToDB