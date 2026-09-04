try {
  process.loadEnvFile()
} catch (error) {
  console.log("no .env found, using default variables if any")
}

const express = require("express");
const app = express();

require("./db/index.js")  // automatically looks for a file called index inside the folder.

const applyConfigs = require("./config/index.js")
applyConfigs(app)

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// all the other routes
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// Import the custom error handling middleware:
const { errorHandler, notFoundHandler } = require('../middleware-error/error.handling');

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// server listen & PORT
const PORT = process.env.PORT || 5006

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
