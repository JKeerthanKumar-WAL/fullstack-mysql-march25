var express = require("express");
var router = express.Router();
router.get("/viewcookies", (req, res) => {
  res.send(req.cookies);
});
router.get("/setcookie/:name/:value", (req, res) => {
  res.cookie(req.params.name, req.params.value);
  res.send(`Cookie with city ${req.params.name} is set`);
});
module.exports = router;
