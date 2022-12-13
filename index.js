const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// import routes

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        name: "Pedro",
    });
});

app.listen(port, "localhost");
