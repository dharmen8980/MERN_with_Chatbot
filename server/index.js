// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const { Double } = require("mongodb");

// // /* CONFIGURATION */
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// /* MONGOOSE SETUP */
// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((error) => console.log(`${error} did not connect`));

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
//   image: String,
//   isAdded: Boolean,
//   quantityAdded: Number,
// });

// const Product = mongoose.model("Product", productSchema, "ecom.products");

// /* ROUTES */
// app.post("/api/insert", (req, res) => {
//   const name = req.body.name;
//   const price = req.body.price;
//   const description = req.body.description;
//   const image = "https://picsum.photos/200/300";
//   const isAdded = false;
//   const quantityAdded = 0;
//   const newProduct = new Product({
//     name: name,
//     price: price,
//     description: description,
//     image: image,
//     isAdded: isAdded,
//     quantityAdded: quantityAdded,
//   });
//   newProduct.save((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("Success");
//     }
//   });
// });

// app.delete("/api/delete-all", (req, res) => {
//   Product.deleteMany({_id: "63b7f077e75714523f4eafce"}, (err) => {
//     if (err) {
//       console.log(err);
//       res.send("Error deleting documents");
//     } else {
//       res.send("Successfully deleted all documents");
//     }
//   });
// });

// app.put("/api/update", (req, res) => {
//   const id = req.body.id;
//   const quantityAdded = req.body.quantityAdded;
//   Product.findById(id, (err, updatedProduct) => {
//     if (err) {
//       res.send
//     } else {
//       updatedProduct.quantityAdded = quantityAdded;
//       updatedProduct.save();
//       res.send("Success");
//     }
//   });
// });

// app.get("/api/get", (req, res) => {
//     Product.find({}, (err, result) => {
//         if (err) {
//         res.send(err);
//         } else {
//         res.send(result);
//         }
//     });
// });

const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.post("/api/insert", (req, res) => {
  const data = req.body;
  MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    if (err) {
      return console.log(err);
    }
    const db = client.db("ecom");
    const collection = db.collection("products");
    collection.insertOne(data, (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.send("Success");
      }
      client.close();
    });
  });
});

app.get("/api/get", (req, res) => {
  MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    if (err) {
      return console.log(err);
    }
    const db = client.db("ecom");
    const collection = db.collection("products");
    collection.find({}).toArray((err, data) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.send(data);
      }
      client.close();
    });
  });
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let previousMessages = "";
app.post("/api/completion", async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const question = req.body.question || "";
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question/prompt.",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      max_tokens: 1000,
      temperature: 0.2,
    });
    console.log(completion.data.choices[0].text);
    previousMessages += `${completion.data.choices[0].text} \n`;
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

function generatePrompt(question) {
  previousMessages += `customer: ${question} \n`;
  // console.log(question);
  // return `You are running a poster shop which sells poster of One piece characters.
  // You sell poster of Straw-hats: Luffy, Zoro, Sanji, Nami, Robin, Usopp, Chopper, Franky, and Brook only.
  // your responses are concise, pursuasive, and very polite. Do not provide any information like shipping, price, or greeting unless asked.
  // Store owner: Dharmendra Sharma.
  // customer: do you sell poster of (any character)?
  // yes, we do. we have variety of posters of (any character).
  // ${previousMessages}
  // `;
  return ` You are running Discount Electronic website which sells electronic products like mobiles, laptops, and accessories.
  your responses are concise, pursuasive, and very polite. Do not provide any information like shipping, price, or greeting unless asked.
  customer: ${previousMessages}
  Response:
  `
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
