import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    title:String,
    PeopleReq:Number,
    date:String,
    Time:String,
    name:String,
    phone:String,
    email:String,
    Joined:[String],
    friends:[String],
    messages:[String],
    
})
export default mongoose.models.tcdata || mongoose.model('tcdata', Schema)