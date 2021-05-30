const User = require("../model/usersModel");
const { registervalidate } = require("../validation");
module.exports = {
	createUser: async (req, res) => {
		const { error } = registervalidate(req.body);
	    if (error) return res.status(400).send(error.details[0].message);
		const emailexit = await User.findOne({ email: req.body.email });
		if (emailexit) return res.status(403).send("Email Alredy Exists");

		const numberchk = await User.findOne({ mobile: req.body.mobile });
		if (numberchk) return res.status(403).send("Mobile Numbher Alredy Exists");

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			mobile: req.body.mobile,
			address: req.body.address,
		});
		try {
			const savedUser = await user.save();
			res.send(savedUser);
		} catch (err) {
			res.status(400).send(err.message);
		}
	},
	allUser: async (req, res) => {
		try {
			const alluser = await User.find({});
			if (alluser.length > 0) {
				res.status(200).send(alluser);
			} else {
				res.send("no user found");
			}
		} catch (error) {
			res.send(error);
		}
	},
	updateUser: async (req, res) => {
		try {
			const update = await User.findByIdAndUpdate(
				{ _id: req.params.id },
				req.body,
			);
			if (update) return res.status(200).json("updateed value");
		} catch {
			res.status(400).send(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			const deleteuser = await User.findByIdAndDelete({ _id: req.params.id });
			if (deleteuser) {
				res.status(200).json(`User id:${deleteuser._id} deleted successfuly`);
			} else {
				res.status(400).send("user not found");
			}
		} catch {
			res.status(400).send("user not found");
		}
	},
	sortByCreatedAt: (req, res) => {
		const limit = req.query.limit ? parseInt(req.query.limit) : 10;
		const skip = req.query.skip ? parseInt(req.query.skip) : 1;
		User.find({})
			.sort({ createdAt: -1 })
			.skip((skip - 1) * limit)
			.limit(limit)
			.find(function (err, data) {
				if (err) {
					return res.status(500).json(err.message);
				}
				res.status(200).send(data);
			});
	},
	sortByCoordinate: (req, res) => {
		const point = {
			type: "Point",
			coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
		};
		User.aggregate(
			[
				{
					$geoNear: {
						near: point,
						spherical: true,
						distanceField: "dist.calculated",
						includeLocs: "dist.location",
					},
				},
			],
			function (err, results) {
				if (err) {
					return res.status(400).json(err.message);
				} else if (results.length === 0) {
					return res.status(200).json({ message: "No results found" });
				}
				res.status(200).json(results);
			},
		);
	},
};
