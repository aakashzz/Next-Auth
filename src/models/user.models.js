import mongoose,{model, models, Schema} from "mongoose"

const userSchema = new Schema({
    username:{
        type:String,
        required: [true,"Please provide an username"],
        unique:true
    },
    email:{
        type:String,
        required: [true,"Please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required: [true,"Please provide an password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

},{timestamps:true})

export const User = models.users || model("users",userSchema);