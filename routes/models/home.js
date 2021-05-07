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

router.get("/sort", (req, res) => {
  const { sort } = req.query;
  Rest.find()
    .lean()
    .sort(sort)
    .then((rests) => {
      res.render("index",{rests,sort})
    })
    .catch(error=>console.log(error))
});
module.exports = router;
