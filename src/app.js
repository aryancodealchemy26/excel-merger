const express = require("express");
const cors = require("cors");
const path = require("path");

const mergeRoutes = require("./routes/merge.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Excel Merger API is running"
    });
});

app.use("/api/merge", mergeRoutes);

app.use(errorMiddleware);

module.exports = app;