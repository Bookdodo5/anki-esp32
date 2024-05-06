const express = require('express');
const errorHandler = require('../functions/middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('../functions/config/dbConnection');
const cors = require('cors');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/words", require("../functions/routes/wordRoutes"));
app.use("/api/users", require("../functions/routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});