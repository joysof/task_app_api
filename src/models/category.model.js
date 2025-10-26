
const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema(
    {
        name : String,
        require : true ,
        unique : true,
        trim : true
    },{timestamps : true}
)

const Category = mongoose.model("Category" , categorySchema)

module.exports = Category