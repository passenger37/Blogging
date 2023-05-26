const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const comments=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comment:{
        type:String
    },
    article:{
        type:Schema.Types.ObjectId,
        ref:'Article',
        required:true
    }
})

module.exports=mongoose.model('Comments',comments);