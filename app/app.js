const fastify = require("fastify");
const mongoose = require("mongoose");

const app = fastify();

mongoose
  .connect("mongodb://localhost:27017/PROJECT_2_DB")
  .then(() => {
    console.info("database connected successfully");
  })
  .catch((err) => {
    console.error("error in database connection : ", err);
    process.exit(1);
  });

app.get("/", (request, reply) => {
  reply.code(200);

  return {
    message: "server is up and running",
  };
});

app.register(require("./auth/route"), {
  prefix: "/auth",
});

module.exports = app;
