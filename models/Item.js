const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;
// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	vendor: {
		type: ObjectId,
		ref: "Vendor",
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Item = mongoose.model("items", ItemSchema);
