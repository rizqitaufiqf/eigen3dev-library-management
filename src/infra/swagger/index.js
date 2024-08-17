const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
    },
  },
  apis: ["./src/interfaces/routes/*.routes.js"],
};
const swagger = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUiExpress, swagger };
