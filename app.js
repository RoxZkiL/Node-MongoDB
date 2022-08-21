//Generic Imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Routers
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

//App - Express
const app = express();

//Database
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};

db();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Extended: https://swagger.io/specification/#InfoObject/
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Ecommerce API",
      description: "Ecommerce API Information",
      contact: {
        name: "Jesus_Matute",
      },
      servers: ["http://localhost:4000"],
    },
  },
  //Definition of the APIs with swagger
  apis: ["./routes/*.js"],
};

//Final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes Middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/product", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

//Port
const port = process.env.PORT || 4000;

//Listen Port
app.listen(port, () => {
  console.log("Server running on port", port);
});
