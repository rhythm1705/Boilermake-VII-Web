const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;
// Create Schema
var ItemPriceSchema = new Schema({
	item: {
		type: ObjectId,
		ref: "Item",
		required: true
	},
	quantity: {
		type: Number,
		default: 1
	}
});
const OrderSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	items: {
		type: [ItemPriceSchema],
		required: true
	},
	vendor: {
		type: ObjectId,
		ref: "Vendor",
		required: true
	}
});
module.exports = Order = mongoose.model("orders", OrderSchema);
