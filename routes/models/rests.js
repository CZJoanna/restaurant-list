const Rest = require("../../models/rest");
const express = require("express");
const router = express.Router();


//新增餐廳的頁面
router.get("/new", (req, res) => {
    res.render("new");
  });
  
  //單頁詳細資訊的頁面
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    return Rest.findById(id)
      .lean()
      .then((restaurant) => {
        res.render("show", { restaurant });
      })
      .catch((error) => console.log(error));
  });
  //更改餐廳資訊的頁面
  router.get("/:id/edit", (req, res) => {
    const { id } = req.params;
    Rest.findById(id)
      .lean()
      .then((restaurant) => {
        res.render("edit", { restaurant });
      });
  });
  
  //功能: 新增一筆資料
  router.post("/", (req, res) => {
    const newRest = req.body;
    return Rest.create(newRest)
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
  
  //功能: 修改特定資料
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const editRest = req.body;
    return Rest.findByIdAndUpdate(id, editRest)
      .then(res.redirect(`/restaurants/${id}`))
      .catch((err) => console.log(err));
  });
  
  //功能: 刪除特定資料
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    return Rest.findByIdAndRemove(id)
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });

  module.exports = router;
  