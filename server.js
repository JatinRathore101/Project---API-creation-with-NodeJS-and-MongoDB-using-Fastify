const app = require("./app/app");

app.listen({ port: 3030, host: "127.0.0.1" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.info(`server is running on: ${address}`);
});
