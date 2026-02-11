const express = require("express");
const app = express();
const userRouter = require("./routes/user");

// this is test; remove this and its depencies soon
const queriesRouter = require("./routes/queries");
const path = require("node:path");

// https://expressjs.com/en/api.html
// - express.json: a built-in middleware in Express. It parses incoming requests with JSON payloads
//   - It returns a middleware that parses only json, accepting requests with `Content-Type: application/json`
//   - After going through this function, a `body` object containing parsed data is in the `request` object
//   - we will use REST api; we use JSON as a file format
app.use(express.json());

// https://expressjs.com/en/api.html
// https://www.geeksforgeeks.org/web-tech/express-js-express-urlencoded-function/
// - express.urlencoded: a middleware that parses URL-encoded data, converting it into javascript object, available
// in req.body.
//   - It processes form data sent in POST requests: `Content-Type:x-www-form-urlencoded`
//   - When { extended: true } is set, it supports nested objects and arrays using the qs library.
//   - Typically used for handling user authentication forms.
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to FlexStep API!" });
});

app.use("/api/user", userRouter);
app.use("/api/queries", queriesRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../flexstep-frontend/dist")));
  // https://expressjs.com/en/guide/migrating-5.html#path-syntax (LMFAOO)
  // `*splat` matches any path without the root path. If you need to match the root path as well /,
  // you can use /{*splat}, wrapping the wildcard in braces.
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../flexstep-frontend", "dist", "index.html"));
  });
}

// useful links:
// # HTTP Status Codes
//  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
// # Enabling HTTPS on Express (although not recc'd)
//  - https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// # Serving Static Files
//  - https://expressjs.com/en/starter/static-files.html
//app.get("/", (req, res) => {
//  res.json({ message: "Welcome to FlexStep!" });
//  console.log(process.env.NODE_ENV);
//});

app.listen(3000, (err) => {
  if (err) {
    throw error;
  }

  console.log("FlexStep Express App, listening on port 3000");
});
