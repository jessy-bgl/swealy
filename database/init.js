// connection to MongoDB
let db = connect("localhost:27017");

// create the db
db = db.getSiblingDB("swealy");

// create db admin user
db.createUser({
  user: "admin",
  pwd: "swealyAdminPasswd",
  roles: [{ role: "readWrite", db: "swealy" }],
});
