const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const articleSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    entry:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('Article',articleSchema);