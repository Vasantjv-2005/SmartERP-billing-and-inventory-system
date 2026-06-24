const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// LOAD ENV VARIABLES
dotenv.config();

// DATABASE
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const itemRoutes = require("./routes/itemRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const reportRoutes = require("./routes/reportRoutes");

// ERROR HANDLER
const errorMiddleware = require(
    "./middleware/errorMiddleware"
);

// CONNECT DATABASE
connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

// TEST ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message:
            "SmartERP Backend Running Successfully 🚀",
    });
});

// ROUTES
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/companies",
    companyRoutes
);

app.use(
    "/api/ledgers",
    ledgerRoutes
);

app.use(
    "/api/items",
    itemRoutes
);

app.use(
    "/api/purchases",
    purchaseRoutes
);

app.use(
    "/api/sales",
    salesRoutes
);

app.use(
    "/api/stock",
    stockRoutes
);

app.use(
    "/api/reports",
    reportRoutes
);

// ERROR MIDDLEWARE
app.use(errorMiddleware);

// PORT
const PORT =
    process.env.PORT || 5001;

// START SERVER
app.listen(PORT, () => {
    console.log(
        `✅ Server running on port ${PORT}`
    );
});