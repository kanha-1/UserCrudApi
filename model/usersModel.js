const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
		name: {
			type: "string",
			required: true,
			min: 5,
			max: 50,
		},
		mobile: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 10,
		},
		email: {
			type: "string",
			required: true,
			max: 255,
			min: 6,
		},
		address: [
			{
				street: {
					type: String,
					required: true,
				},
				locality: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				state: {
					type: String,
					required: true,
				},
				pincode: {
					type: String,
					required: true,
				},
				coordinatesType: {
					type: {
						type: String,
						default: "Point",
					},
					coordinates: {
						type: [Number],
						index: "2dsphere",
					},
				},
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
