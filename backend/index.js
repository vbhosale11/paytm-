const express = require("express");
const mongoose = require("mongoose");
const rootRouter = require("./routes/index.js");
const cors= require("cors");
const app= express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);



mongoose.connect("mongodb+srv://vaivaibhavi1102:qwertyuiop@cluster0.vtedgas.mongodb.net/paytm")

app.listen(3000);


