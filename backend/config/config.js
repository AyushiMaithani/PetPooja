require("dotenv").config();

const config=Object.freeze({
    port:process.env.PORT || 3000,
    databaseURL:process.env.MONGODB_URI || "mongodb://localhost:27017/pos-data",
    nodeEnv:process.env.NODE_ENV || "development",
    accessTokenSecret:process.env.JWT_SECRET,
});

module.exports=config;