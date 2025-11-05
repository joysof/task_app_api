const mongoose = require('mongoose')
const { toJSON, paginate } = require("./plugins");
const orderSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    quantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    url : {
      type : String,
      required : true,
      trim : true
    }
  },
  { timestamps: true }
)
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
