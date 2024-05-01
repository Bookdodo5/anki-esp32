const express = require('express');
const errorHandler = require('../functions/middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('../functions/config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api", require("../functions/routes/wordRoutes"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});