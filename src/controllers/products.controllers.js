const { Op } = require("sequelize");
const { Products } = require("../models");

const getAllProducts = async (req, res, next) => {
  try {
    // pedir todos los productos al modelo Products
    const products = await Products.findAll({
      where: {
        availableQty: {
          [Op.gt]: 0,
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;

    if (file) {
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.URL}/products/${file.filename}`
          : `${process.env.URL}:${process.env.PORT}/products/${file.filename}`;
      body.productImage = url;
    }
    await Products.create(body);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const file = req.file;
    const id = req.params.id;

    const product = await Products.findByPk(id);

    if (file) {
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.URL}/products/${file.filename}`
          : `${process.env.URL}:${process.env.PORT}/products/${file.filename}`;
      body.productImage = url;
    }

    delete body.userId;

    await product.update(body);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  editProduct,
};
