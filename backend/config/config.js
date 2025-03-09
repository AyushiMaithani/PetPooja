require("dotenv").config();

const config=Object.freeze({
    port:process.env.PORT || 3000,
    databaseURL:process.env.MONGODB_URI,
    nodeEnv:process.env.NODE_ENV || "development",
    accessTokenSecret:process.env.JWT_SECRET,
    razorpayKeyId:process.env.RAZORPAY_KEY_ID,
    razorpaySecretKey:process.env.RAZORPAY_KEY_SECRET,
    razorpyWebhookSecret:process.env.RAZORPAY_WEBHOOK_SECRET,
});

module.exports=config;