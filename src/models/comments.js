const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const comments=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String
    }
})

module.exports=mongoose.model('Comments',comments);