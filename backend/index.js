require("dotenv").config();
const cors = require('cors');
const express = require('express');
const path = require("path");
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const aiRoutes = require('./routes/aiRoutes')

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

connectDB();

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes)
app.use("/api/ai", aiRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on PORT:", PORT))