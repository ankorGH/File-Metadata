const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single("pic");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/form", (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      res.sendFile(__dirname + "/index.html");
    } else {
      res.end(JSON.stringify({ size: req.file["size"] }));
    }
  });
});

let listener = app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});
