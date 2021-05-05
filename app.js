// 引入模組及檔案
const Rest = require("./models/rest");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
// 載入 method-override
const methodOverride = require('method-override') 
const routes = require("./routes");

//執行資料庫連線
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

// 將 request 導入路由器
app.use(routes)

app.listen(3000, () => {
  console.log("Express is running on http://localhost:3000");
});

