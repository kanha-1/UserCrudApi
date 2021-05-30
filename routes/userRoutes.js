const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const User = require("../model/usersModel");

// create a user
router.post("/createUser", userController.createUser);
// Get all user
router.get("/allusers", userController.allUser);
// update user
router.put("/updateUser/:id", userController.updateUser);
// Delete user
router.delete("/deleteuser/:id", userController.deleteUser);
// short user by id
router.get("/sortBycreatedAt", userController.sortByCreatedAt);
// short by distance
router.get("/sortByCoordinate", userController.sortByCoordinate);

module.exports = router;
