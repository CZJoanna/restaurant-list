const Rest = require("../rest");
const seedData = require("../../restaurant.json");
const dataArray = seedData.results;
const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("mongodb connected!");
  dataArray.forEach((rest) => {
    Rest.create({
      id: rest.id,
      name: rest.name,
      name_en: rest.name_en,
      category: rest.category,
      image: rest.image,
      location: rest.location,
      phone: rest.phone,
      google_map: rest.google_map,
      rating: rest.rating,
      description: rest.description,
    });
  });
  console.log("Data adding is completed!")
});
