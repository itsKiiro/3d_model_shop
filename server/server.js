const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/articles', express.static('./articles'));

const ArticleRoutes = require("./routes/ArticleRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");
const PaymentRoutes = require("./routes/PaymentRoutes.js");

mongoose.connect(process.env.MONGO_URL);


app.use("/api", ArticleRoutes);
app.use("/api", UserRoutes);
app.use("/api", PaymentRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})