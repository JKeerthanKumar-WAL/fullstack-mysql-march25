var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE dishes(id INT PRIMARY KEY, name VARCHAR(100), description text,cid INT, price INT, FOREIGN KEY(cid) references category(id))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM dishes";
  connector.query(sql, (err, results, fields) => {
    res.json({ results });
  });
});
router.post("/", (req, res) => {
  const { id, name, description, cid, price } = req.body;
  const sql = `INSERT INTO dishes VALUES(?,?,?,?,?)`;
  connector.query(
    sql,
    [id, name, description, cid, price],
    (err, results, fields) => {
      res.json({ err, results, fields });
    }
  );
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM dishes WHERE id="${req.params.id}";`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.put("/:id", (req, res) => {
  const { name, description, cid, price } = req.body;
  const sql = `UPDATE dishes SET name=?, description=?, cid=?, price=? WHERE id=${req.params.id};`;
  connector.query(
    sql,
    [name, description, cid, price],
    (err, results, fields) => {
      res.json({ err, results, fields });
    }
  );
});
router.get("/deleteall", (req, res) => {
  const sql = "DELETE FROM dishes";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/byname/:name", (req, res) => {
  const sql = "SELECT * FROM dishes WHERE name=?";
  connector.query(sql, [req.params.name], (err, results, fields) => {
    res.json({ results });
  });
});
module.exports = router;
