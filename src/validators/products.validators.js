const validateResult = require("../middlewares/validate.middleware");
const { Products } = require("../models");
const { body } = require("express-validator");
const { Op } = require("sequelize");

const rulesPost = [
  body("name").notEmpty().withMessage("El nombre es obligatorio").bail(),
  body("price").notEmpty().withMessage("El precio es obligatorio").bail(),
  body("availableQty")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .bail(),
  body("userId").notEmpty().withMessage("El usuario es obligatorio").bail(),
  body("productImage")
    .custom((value, { req }) => {
      const file = req.file;
      if (!file) {
        throw new Error("Debe cargar una imagen");
      }
      return true;
    })
    .bail(),
  validateResult,
];

const rulesPut = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .custom(async (value, { req }) => {
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
  validateResult,
];

module.exports = {
  rulesPost,
  rulesPut,
};
