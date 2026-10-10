const mongoose=require('mongoose');
const schema=new mongoose.Schema({token:{type:String,required:true,unique:true},content:{type:Buffer,required:true,select:false},mime:{type:String,required:true},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'Admin'}},{timestamps:true});
module.exports=mongoose.models.MarketingImage||mongoose.model('MarketingImage',schema);
