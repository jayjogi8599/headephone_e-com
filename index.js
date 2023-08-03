const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://jayjogi8599:headephone@cluster0.nmxvyym.mongodb.net/headePhone-e-com"
  );
  console.log("DB connected Successfully");
}

// Catagory Schema
const CatagorySchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true }
});

const Catagories  = mongoose.model("catagories", CatagorySchema);

//Products Schema
const ProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  categories: { type: String}
 
});

const Products  = mongoose.model("products", ProductsSchema);


app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('hello from home')
})

// Post Catagory api Page

app.post("/catagory",async (req, res) => {
  let catagories = new Catagories();
  catagories.img = req.body.img;
  catagories.title = req.body.title;
  
  const doc = await catagories.save();

  console.log(doc);
  res.json(doc);
});

app.get("/catagory", async (req,res)=>{
  const doc = await Catagories.find({})
  res.json(doc)
  })
// Post Products api Page

app.post("/product",async (req, res) => {
  let products = new Products();
  products.title = req.body.title;
  products.img = req.body.img;
  products.desc = req.body.desc;
  products.price = req.body.price;
  products.categories=req.body.Catagories
  
  const doc = await products.save();

  console.log(doc);
  res.json(doc);
});

app.put('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Find the existing object by ID
    const appToUpdate = await Products.findById(id);

    if (!appToUpdate) {
      return res.status(404).json({ error: 'App not found.' });
    }

   
    // Check if the 'categories' property exists in the request body
    if ('categories' in updateData) {
      appToUpdate.categories = updateData.categories;
    }

    // Save the updated object
    const updatedApp = await appToUpdate.save();

    console.log(updatedApp);
    res.json(updatedApp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the app.' });
  }
});
app.get("/product", async (req,res)=>{
  const doc = await Products.find({})
  res.json(doc)
  })


app.listen(9000, () => {
  console.log("Server is Running");
});
