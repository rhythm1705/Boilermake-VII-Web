const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Importing dependencies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Importing routes
// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const vendorsRouter = require("./routes/api/vendors");
const itemsRouter = require("./routes/api/items");
const ordersRouter = require("./routes/api/orders");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "/vendor-client/build")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS policy
app.use(cors());
app.options("*", cors());

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
// app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/vendors", vendorsRouter);
app.use("/api/items", itemsRouter);
app.use("/api/orders", ordersRouter);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/vendor-client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
