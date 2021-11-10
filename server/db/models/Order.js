const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  order_total: Sequelize.DECIMAL,
  total_quantity: Sequelize.INTEGER,

  is_completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  date_placed: Sequelize.DATE,
  date_shipped: Sequelize.DATE,
});

module.exports = Order;
