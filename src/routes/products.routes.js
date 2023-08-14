const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  editProduct,
} = require("../controllers/products.controllers");
const authenticate = require("../middlewares/auth.middleware");
const { rulesPost, rulesPut } = require("../validators/products.validators");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.get("/products", getAllProducts);
router.post(
  "/products",
  authenticate,
  upload.single("productImage"),
  rulesPost,
  createProduct
);
router.put(
  "/products/:id",
  authenticate,
  upload.single("productImage"),
  rulesPut,
  editProduct
);

module.exports = router;
