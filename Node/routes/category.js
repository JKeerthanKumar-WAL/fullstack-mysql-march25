var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE category(id INT, name VARCHAR(100), description text, PRIMARY KEY(id))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * from category";
  connector.query(sql, (err, results, fields) => {
    res.json({ results });
  });
});
router.post("/", (req, res) => {
  const { id, name, description } = req.body;
  const sql = `INSERT INTO category VALUES(?,?,?)`;
  connector.query(sql, [id, name, description], (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM category WHERE id="${req.params.id}";`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const sql = `UPDATE category SET name=?, description=? WHERE id=${req.params.id};`;
  connector.query(sql, [name, description], (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/deleteall", (req, res) => {
  const sql = "DELETE FROM category";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
module.exports = router;
