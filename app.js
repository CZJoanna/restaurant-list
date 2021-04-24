const express = require("express");
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const app = express();

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.listen(3000, () => {
  console.log("Express is running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList.results });
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
  const selectedRs = restaurantList.results.filter((restaurant) => {
    return (
      (restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim())) ||
      (restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim()))
    );
  });
  res.render("index", { restaurant: selectedRs, keyword: keyword });
});
