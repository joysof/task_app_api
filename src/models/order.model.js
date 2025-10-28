const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    client :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    service : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        quantity : {
            type : String,
            totalPrice :{
                type : Number,
                required : true
            },
            status :{
                type : String,
                enum : ["pending" , "processing" , "completed" , "cancelled"],
                default : "pending"
            }
        }
    }
},{timestamps: true})

const Order = mongoose.model("Order" , orderSchema)
