const mongoose = require('mongoose')



const serviceSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
     quantity:{
        type : Number,
        required: true ,
        default : 1
     },
    basePrice :{
        type : Number,
        required : true ,
        min : 0
    },
    currentPrice:{
        type : Number,
        required : true,
        default : 0
    },
    subCategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubCategory",
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
},{timestamps: true})


const Service = mongoose.model("Service" , serviceSchema)
module.exports = Service