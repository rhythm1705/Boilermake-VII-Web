const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
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
    orders: {
        type: [ObjectId],
        ref: "Order"
    },
	date: {
		type: Date,
		default: Date.now
	}
});
module.exports = User = mongoose.model("users", UserSchema);
