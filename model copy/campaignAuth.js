const mongoose= require("mongoose");
const apiKeys= require("../API");
const Campaigncontacts = new mongoose.Schema({
    name: String,
    email: String,
    open: {type:Boolean,default:false},
    open: {type:Array,default:[]},
    category:{type:String,default:'null'},
    phone:{type:String,default:'null'},
    website:{type:String,default:'null'},
    state:{type:String,default:'null'},
    status:{type:String,default:"active"},
    condition:{type:String,default:"unverified"},
    signUpSource:{type:String},
    createdAt: { type: Date, default: Date.now }, // Timestamp for each subscriber
});
const trackSchema= new mongoose.Schema({
       campaign:{
        type:String,
       },
       trackingUser:{
        type:String,
    required:[true,"please trackingUser"]

       },
       trackerId:{
        type:String,
       },
          createdAt:{
            type:Date,
            default:Date.now()
        },
          opens:{
            type:Number,
        },
        totalSubscribers:[Campaigncontacts],
       clicks:{
        type:Number,
       },
      stats:{
    type:Array,
},
})

module.exports =mongoose.model("Campaigns",trackSchema)