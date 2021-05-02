const Rest = require("../rest");
const seedData = require("../../restaurant.json");
const dataArray = seedData.results;
//載入ｍongodb模組
const mongoose = require("mongoose");
//連線到mongodb資料庫
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//資料庫連線狀態
const db = mongoose.connection;

//對error事件(連線異常)進行監聽
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  dataArray.forEach((rest) => {
    Rest.create({
        id:rest.id,
        name: rest.name,
        name_en: rest.name_en,
        category: rest.category,
        image: rest.image,
        location:rest.location,
        phone:rest.phone,
        google_map:rest.google_map,
        rating:rest.rating,
        description:rest.description
    });
  });
  console.log("mongodb connected!");
});
