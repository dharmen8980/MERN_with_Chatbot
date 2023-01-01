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
// });

// const Product = mongoose.model("Product", productSchema, "ecom.products");

// /* ROUTES */
// app.post("/api/insert", (req, res) => {
//   const name = req.body.name;
//   const price = req.body.price;
//   const description = req.body.description;
//   const image = req.body.image;
//   const newProduct = new Product({
//     name: name,
//     price: price,
//     description: description,
//     image: image,
//   });
//   newProduct.save((err) => {
//     if (err) {
//       console.log(err);
//     } else {
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
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

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

app.get('/api/get', (req, res) => {
    MongoClient.connect(process.env.MONGO_URL, (err, client) => {
      if (err) {
        return console.log(err);
      }
      const db = client.db('ecom');
      const collection = db.collection('products');
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
  
  app.post('/api/completion', async (req, res) => {
    if (!configuration.apiKey) {
      res.status(500).json({
        error: {
          message: 'OpenAI API key not configured, please follow instructions in README.md',
        },
      });
      return;
    }
  
    const question = req.body.question || '';
    if (question.trim().length === 0) {
      res.status(400).json({
        error: {
          message: 'Please enter a valid question/prompt.',
        },
      });
      return;
    }
  
    try {
      const completion = await openai.createCompletion({
        model: 'text-ada-001',
        prompt: generatePrompt(question),
        max_tokens: 1000,
        temperature: 0,
      });
      res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          },
        });
      }
    }
  });
  
  function generatePrompt(question) {
    console.log(question);
    return `${question}
  `;
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));