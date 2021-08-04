const mongoose = require('mongoose');

const databaseConnectivity = ()=>{    
    const url = process.env.LOCAL_DB;

    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false    
    }).then(res=>{
        console.log("Database is connected");            
    }).catch(err=>{
        console.log("Database is not connected");
        console.error(err);
    });    

}

module.exports = databaseConnectivity;