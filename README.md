# Instruction to run this file

* It is a RESTfull API
*  There are 6 routes

* To start server, use npm start or npm run dev(nodemon).nodemon automatically restarting the node application when file changes in the directory. 

# 1. create a user
* Method POST 
http://localhost:5000/api/createUser
{
   "name":"kanha",
   "email":"kanhu.shoo0@gmail.com",
   "mobile":"9556966276",
   "address":{"street":"vanibihar", "locality":"bbsr", "city":"bbsr", "state":"odisha", "pincode":"752063", "coordinatesType":{"type":"point", "coordinates":[22.46, 82.98]}}
}

# 2. Get all users
* Method GET
   http://localhost:5000/api/allusers
   * Get all user that exist in database

# 3. Update user
* Method PUT
   http://localhost:5000/api/updateUser/:id
   * To update an existing user(a query param id is required).

# 4. Delete user
* Method DELETE
  http://localhost:5000/api/deleteuser/:id
   * delete an existing user(a query param id is required).

# 5. Short users By Created Date
* Method GET
  http://localhost:5000/api/sortBycreatedAt
   *get all user sorted by createdAt and query param of limit can be passed for pagination.

# 6. Get all users sorted by their distance from coordinates 
* . http://localhost:5000/api/sortByCoordinate
   * Passed in the query param of the Endpoint for example(lng=83&lat=12.48)

  
