const mongoose= require("mongoose");
const apiKeys= require("../API");
const authSchema= new mongoose.Schema({
    userName:String,
    emailSent:{
        type:Number,
        default:0
    },
    avatar:{
        type:String,
        default:"https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
       
    },
    firstName:{
        type:String,
        default:" "
       
    },
    verified:{
        type:Boolean,
        default:false
       
    },
    role:{
        type:String,
        default:" "
       
    },
    lastName:{
        type:String,
        default:" "
       
    },
   email:{
    type:String,
    unique:true,
    required:[true,"please provide an email"]
   },
   password:{
    type:String,
    required:[true,"please provide a password"]
},
createdAt:{
    type:Date,
    default:Date.now()
},
contacts:{
    type:Array,
    default:[]
   
},
templates:{
    type:Array,
    default:[]
   
},
apiKeys:{
    type:String,
    default:apiKeys()
   
}
})

module.exports =mongoose.model("Users",authSchema)