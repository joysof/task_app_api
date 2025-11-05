const mongoose = require('mongoose')
const { toJSON, paginate } = require("./plugins");


const taskSchema = new mongoose.Schema({
    clientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    taskerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    serviceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Service",
        required : true
    },
    status : {
        type :String,
        enum : ['running' ,'completed'],
        default : 'running'
    },
     paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid',],
    default: 'unpaid',
  },
   adminApproval: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
},{timestamps : true})
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model("Task" , taskSchema)

module.exports = Task