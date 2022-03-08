const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

router.get("/zookeepers", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

//should always come last! catch all for routes that don't exist
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../..public/index.html"));
});

module.exports = router;