const { createClient } = require('@libsql/client');

const libsql = createClient({
  url: "file:./dev.db"
});

console.log("LibSQL initialized successfully");
