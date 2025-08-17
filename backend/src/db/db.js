
const mongoose = require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGOOSE_KEY).then(() =>{
        console.log("DB Connected");
    }).catch((err) =>{
        console.log(err);
        
    })
}

module.exports = connectToDB