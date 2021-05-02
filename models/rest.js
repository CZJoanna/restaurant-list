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
db.on("error",()=>{
    console.log("mongodb error!");
});

db.once("open",()=>{
    console.log("mongodb connected!")
})
