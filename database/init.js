// connection to MongoDB
let db = connect("localhost:27017");

// create the db
db = db.getSiblingDB("crypto-dca");

// create db admin user
db.createUser({
  user: "admin",
  pwd: "admin_passwd",
  roles: [{ role: "readWrite", db: "crypto-dca" }],
});
