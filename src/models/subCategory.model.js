
const mongoose = require('mongoose')


const subCategorySchema = mongoose.Schema(
    {
        name : {
            type: String,
            required : true ,
            trim : true
        },
        categoryId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required : true

        }
    },{timestamps: true,}
)

const SubCategory = mongoose.model("SubCategory" , subCategorySchema)
module.exports = SubCategory