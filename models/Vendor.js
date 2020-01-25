const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	menu: {
		type: [ObjectId],
		ref: "Item"
	},
	date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Vendor = mongoose.model("vendors", VendorSchema);
