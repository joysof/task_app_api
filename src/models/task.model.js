const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const taskSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    taskerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    status: {
      type: String,
      enum: ['running', 'claimed', 'completed', 'rejected'],
      default: 'running',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    Screenshot: {
      type: String,
      default: false,
    },
    compltedBy: {
      completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    adminApproval: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)
taskSchema.plugin(toJSON)
taskSchema.plugin(paginate)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
