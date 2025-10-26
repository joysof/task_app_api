const mongoose = require('mongoose')



const serviceSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    price :{
        type : Number,
        required : trun ,
        min : 0
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