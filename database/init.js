// connection to MongoDB
let db = connect("localhost:27017");

// create the db
db = db.getSiblingDB("cryptodca");

// create db admin user
db.createUser({
  user: "admin",
  pwd: "cryptodcaAdminPasswd",
  roles: [{ role: "readWrite", db: "cryptodca" }],
});
