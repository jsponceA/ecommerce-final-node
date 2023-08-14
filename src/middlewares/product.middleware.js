const { body } = require("express-validator");
const { Products } = require("../app/models");
const { Op } = require("sequelize");

const rulesPost = [
  body("name")
    .notEmpty()
    .withMessage("El producto es obligatorio")
    .bail()
    .custom(async (value) => {
      const existProducts = await Products.findOne({ where: { name: value } });
      if (existProducts) throw new Error("Esta producto ya se registro");
    }),
  body("price").notEmpty().withMessage("El precio es obligatorio").bail(),
  body("availableQty")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .bail(),
  body("userId").notEmpty().withMessage("El usuario es obligatorio").bail(),
];

const rulesPut = [
  body("name")
    .notEmpty()
    .withMessage("El producto es obligatorio")
    .bail()
    .custom(async (value) => {
      const existProducts = await Products.findOne({
        where: {
          name: value,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (existProducts) throw new Error("Esta producto ya se registro");
    }),
  body("price").notEmpty().withMessage("El precio es obligatorio").bail(),
  body("availableQty")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .bail(),
];

module.exports = { rulesPost, rulesPut };
