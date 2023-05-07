const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const upvote=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    entry:{
        type:Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },
    vote:{
        type:Boolean
    }
});

module.exports=mongoose.model('Upvote',upvote);