const mongoose = require('mongoose')

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
    quantity: {
      type: Number,
    },
     totalPrice: {
        type: Number,
        required: true,
      },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
