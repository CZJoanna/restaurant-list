// 引入模組及檔案
const Rest = require("./models/rest");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
// 載入 method-override
const methodOverride = require('method-override') 
require("./config/mongoose");

// 掛載伺服器
const app = express();

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.listen(3000, () => {
  console.log("Express is running on http://localhost:3000");
});

//首頁
app.get("/", (req, res) => {
  Rest.find()
    .lean()
    .then((rests) => {
      res.render("index", { rests });
    });
});

//新增餐廳的頁面
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

//單頁詳細資訊的頁面
app.get("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  return Rest.findById(id)
    .lean()
    .then((restaurant) => {
      res.render("show", { restaurant });
    })
    .catch((error) => console.log(error));
});
//更改餐廳資訊的頁面
app.get("/restaurants/:id/edit", (req, res) => {
  const { id } = req.params;
  Rest.findById(id)
    .lean()
    .then((restaurant) => {
      res.render("edit", { restaurant });
    });
});

//搜尋結果
app.get("/search", (req, res) => {
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
//功能: 新增一筆資料
app.post("/restaurants", (req, res) => {
  const newRest = req.body;
  return Rest.create(newRest)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//功能: 修改特定資料
app.put("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  const editRest = req.body;
  return Rest.findByIdAndUpdate(id, editRest)
    .then(res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

//功能: 刪除特定資料
app.delete("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  return Rest.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});
