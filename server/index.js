const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { fileURLToPath } = require("url");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const productsRouter = require("./routes/products.js");
const authRouter = require("./routes/auth.js");
const ordersRouter = require("./routes/orders.js");
const sliderRouter = require("./routes/slides.js");
const { addProduct } = require("./controllers/products.js");
const { addSlider } = require("./controllers/slider");

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + Date.now().toString() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: config,
});

app.get("/api/", (req, res) => {
  res.json("server is running");
});
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.post("/products/add", upload.array("image",6),addProduct);
app.use("/orders", ordersRouter);
app.use("/slider", sliderRouter);
app.post("/slider/add", upload.single("image"),addSlider);
app.get("*", (req, res) => {
  res.status(404).json("Not Found");
});


app.listen(PORT, (req, res) => {
  console.log("Server is up and running on port number: " + PORT);
});
