const Rest = require("../../models/rest");
const express = require("express");
const router = express.Router();

//首頁
router.get("/", (req, res) => {
    Rest.find()
      .lean()
      .then((rests) => {
        res.render("index", { rests });
      });
  });

//搜尋結果
router.get("/search", (req, res) => {
    const keyword = req.query.keyword;
    const trimmedKeyword = keyword.trim().toLowerCase();
    Rest.find()
      .lean()
      .then((rests) => {
        const selectedRs = rests.filter((restaurant) => {
          return (
            restaurant.name.toLowerCase().includes(trimmedKeyword) ||
            restaurant.category.toLowerCase().includes(trimmedKeyword)
          );
        });
        res.render("index", { rests: selectedRs, keyword: keyword });
      });
  });
  module.exports = router
  