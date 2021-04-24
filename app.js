const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.listen(3000,()=>{
    console.log("Express is running on http://localhost:3000")
});

app.get("/",(req,res)=>{
    res.render("index")
})