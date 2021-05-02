const Rest = require("./models/rest")
const express = require("express");
const exphbs = require("express-handlebars");
// const restaurantList = require("./restaurant.json");
const app = express();
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.listen(3000, () => {
  console.log("Express is running on http://localhost:3000");
});

//資料庫相關設定
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.get("/", (req, res) => {
  Rest.find()
    .lean()
    .then((rests) =>{
      res.render("index",{rests:rests})
    });
});

app.get("/restaurants/:id", (req, res) => {
  const rId = req.params.id;
  const selectedR = restaurantList.results.find((restaurant) => {
    return rId === restaurant.id.toString();
  });
  res.render("show", { restaurant: selectedR });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const trimmedKeyword = keyword.trim().toLowerCase()
  const selectedRs = restaurantList.results.filter((restaurant) => {
    return (
      (restaurant.name.toLowerCase().includes(trimmedKeyword)) ||
      (restaurant.category.toLowerCase().includes(trimmedKeyword))
    );
  });
  res.render("index", { restaurant: selectedRs, keyword: keyword });
});
