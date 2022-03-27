var express = require("express");
var router = express.Router();
router.get("/viewcookies", (req, res) => {
  res.send(req.cookies);
});
router.get("/setcookieswithtime/:name/:value/:time", (req, res) => {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(
    `Cookie with name ${req.params.name} and value ${req.params.value} set will expire in ${req.params.time} minutes`
  );
});
module.exports = router;
