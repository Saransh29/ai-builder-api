const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const Postv2 = require("../mongo/postv2");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});
const openai = new OpenAIApi(configuration);

const systemMessage = {
  role: "system",
  content:
    "You are a world class developer Write code. with full functionality, descriptive sections,good animations, good design,vibrant colors, for the images add https://ai-builder-api-production.up.railway.app/api/v1/searchImages?q=?{prompt here} to the src.i am using gsap 3.11.5 for animations write code in body for animations. i am using bootstrap 5.2.3 for css. just write the body of the html. don't worry about the head. ",
};

exports.betaCompletion = async (req, res) => {
  try {
    const { command } = req.body;

    let apiMessages = {
      role: "user",
      content: command,
    };

    console.log(command);

    const airesponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, apiMessages],
    });

    // console.log(airesponse);
    res.status(200).json(airesponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.dummyCompletion = async (req, res) => {
  try {
    const { command } = req.body;
    console.log(command);

    const v2 = {
      id: "chatcmpl-75a2MGjyspyzo4wnZ6Msg1PgDYxlq",
      object: "chat.completion",
      created: 1681564522,
      model: "gpt-3.5-turbo-0301",
      usage: {
        prompt_tokens: 91,
        completion_tokens: 1270,
        total_tokens: 1361,
      },
      choices: [
        {
          message: {
            role: "assistant",
            content:
              '<body>\n  <!-- Navbar -->\n  <nav class="navbar navbar-expand-lg navbar-light bg-light">\n    <div class="container-fluid">\n      <a class="navbar-brand" href="#">My Car Showroom</a>\n      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"\n        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n        <span class="navbar-toggler-icon"></span>\n      </button>\n      <div class="collapse navbar-collapse" id="navbarNav">\n        <ul class="navbar-nav ms-auto">\n          <li class="nav-item">\n            <a class="nav-link active" href="#">Home</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Features</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Pricing</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Contact Us</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <!-- Main Content -->\n  <div class="container-fluid">\n    <div class="row">\n      <div class="col-lg-6 col-md-6 col-sm-12 my-auto">\n        <h1>Explore Our Collection</h1>\n        <p>Find the car that\'s perfect for you.</p>\n        <a href="#" class="btn btn-primary btn-lg">View Collection</a>\n      </div>\n      <div class="col-lg-6 col-md-6 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?cars" class="img-fluid" alt="Car Showroom">\n      </div>\n    </div>\n\n    <div class="row mt-5">\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?coupe" class="img-fluid" alt="Coupe Car">\n        <h3>Coupes</h3>\n        <p>Explore our collection of coupes and find the one that fits your lifestyle.</p>\n      </div>\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?sedan" class="img-fluid" alt="Sedan Car">\n        <h3>Sedans</h3>\n        <p>Find your perfect sedan from our vast selection of vehicles.</p>\n      </div>\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?sportscar" class="img-fluid" alt="Sports Car">\n        <h3>Sports Cars</h3>\n        <p>Experience thrill and adrenaline with our collection of sports cars.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Footer -->\n  <footer class="bg-light text-center text-lg-start">\n    <div class="container p-4">\n      <div class="row">\n        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">\n          <h5 class="text-uppercase">My Car Showroom</h5>\n          <p>\n            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat\n            pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque\n            cumque eum delectus sint!\n          </p>\n        </div>\n        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">\n          <h5 class="text-uppercase">Links</h5>\n          <ul class="list-unstyled mb-0">\n            <li>\n              <a href="#!" class="text-dark">Home</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Features</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Pricing</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Contact Us</a>\n            </li>\n          </ul>\n        </div>\n        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">\n          <h5 class="text-uppercase mb-0">Follow Us</h5>\n          <ul class="list-unstyled">\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-facebook"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-twitter"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-instagram"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-youtube"></i></a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">\n      &copy; 2022 My Car Showroom. All Rights Reserved.\n    </div>\n  </footer>\n\n  <!-- Bootstrap JS -->\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"\n    integrity="sha384-Wca9jKgW8Q/KxnV7q3+DmNHV7wsW8gjJd11LeHnnxX9RduKulBhKPDXtLzKFHThr"\n    crossorigin="anonymous">\n  </script>\n</body>',
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
    };

    const airesponse = {
      id: "chatcmpl-75ZLoh8THgsmy1reHZQz5G7x7akhI",
      object: "chat.completion",
      created: 1681561884,
      model: "gpt-3.5-turbo-0301",
      usage: {
        prompt_tokens: 107,
        completion_tokens: 3990,
        total_tokens: 4097,
      },
      choices: [
        {
          message: {
            role: "assistant",
            content:
              '<body>\n\n<!-- Navigation Bar -->\n<nav class="navbar navbar-expand-lg navbar-light bg-light">\n  <a class="navbar-brand" href="#">Tasty Eats</a>\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n    <span class="navbar-toggler-icon"></span>\n  </button>\n  <div class="collapse navbar-collapse" id="navbarNav">\n    <ul class="navbar-nav">\n      <li class="nav-item active">\n        <a class="nav-link" href="#">Home</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Menu</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Reservations</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Online Ordering</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Contact Us</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<!-- Banner -->\n<div class="jumbotron jumbotron-fluid">\n  <div class="container">\n    <h1 class="display-4">Welcome to Tasty Eats!</h1>\n    <p class="lead">Experience the best of local cuisine with our mouth-watering dishes.</p>\n    <a href="#" class="btn btn-lg btn-primary">View Menu</a>\n  </div>\n</div>\n\n<!-- Featured Dishes -->\n<div class="container">\n  <h2 class="text-center mb-5">Featured Dishes</h2>\n  <div class="card-deck">\n    <div class="card">\n      <img class="card-img-top" src="https://source.unsplash.com/featured/?pizza" alt="Pizza">\n      <div class="card-body">\n        <h5 class="card-title">Margherita Pizza</h5>\n        <p class="card-text">Freshly baked pizza with tomato sauce, mozzarella cheese, and basil.</p>\n        <a href="#" class="btn btn-primary">Order Now</a>\n      </div>\n    </div>\n    <div class="card">\n      <img class="card-img-top" src="https://source.unsplash.com/featured/?burger" alt="Burger">\n      <div class="card-body">\n        <h5 class="card-title">Classic Cheeseburger</h5>\n        <p class="card-text">Grilled beef patty with cheddar cheese, lettuce, tomato, and onion.</p>\n        <a href="#" class="btn btn-primary">Order Now</a>\n      </div>\n    </div>\n    <div class="card">\n      <img class="card-img-top" src="https://source.unsplash.com/featured/?pasta" alt="Pasta">\n      <div class="card-body">\n        <h5 class="card-title">Spaghetti Bolognese</h5>\n        <p class="card-text">Traditional Italian pasta dish with meat sauce and Parmesan cheese.</p>\n        <a href="#" class="btn btn-primary">Order Now</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Upcoming Events -->\n<div class="container mt-5">\n  <h2 class="text-center mb-5">Upcoming Events</h2>\n  <div class="row">\n    <div class="col-sm-6 col-md-4">\n      <div class="card">\n        <img class="card-img-top" src="https://source.unsplash.com/featured/?event" alt="Event">\n        <div class="card-body">\n          <h5 class="card-title">Wine Tasting</h5>\n          <p class="card-text">Join us for a special evening of wine tasting and food pairing.</p>\n          <p class="card-text"><small class="text-muted">November 30, 2021</small></p>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-6 col-md-4">\n      <div class="card">\n        <img class="card-img-top" src="https://source.unsplash.com/featured/?concert" alt="Concert">\n        <div class="card-body">\n          <h5 class="card-title">Live Music</h5>\n          <p class="card-text">Enjoy live music by talented local artists as you dine.</p>\n          <p class="card-text"><small class="text-muted">December 8, 2021</small></p>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-6 col-md-4">\n      <div class="card">\n        <img class="card-img-top" src="https://source.unsplash.com/featured/?cooking" alt="Cooking Class">\n        <div class="card-body">\n          <h5 class="card-title">Cooking Class</h5>\n          <p class="card-text">Learn how to cook delicious meals with our experienced chefs.</p>\n          <p class="card-text"><small class="text-muted">December 15, 2021</small></p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Footer -->\n<footer class="bg-dark text-light mt-5 py-3">\n  <div class="container">\n    <div class="row align-items-center">\n      <div class="col-12 col-md-6 text-center text-md-left mb-1 mb-md-0">\n        <p class="mb-0">2021 Tasty Eats. All rights reserved.</p>\n      </div>\n      <div class="col-12 col-md-6 text-center text-md-right">\n        <a href="#" class="footer-link">Privacy Policy</a>\n        <a href="#" class="footer-link ml-2">Terms of Service</a>\n      </div>\n    </div>\n  </div>\n</footer>\n\n<!-- Bootstrap JS -->\n<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>\n<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper"> </script>\n<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOUY4U9TOTfWpNc1vCnEpS+gPFSu6qGvMWUVRhxHovySpT6" crossorigin="anonymous"></script>\n\n</body>```\n\nThe code above includes a navigation bar, a banner showcasing your restaurant, a section for featured dishes, a section for upcoming events, and a footer. \n\nNotice how we\'re able to add images to the "Featured Dishes" and "Upcoming Events" sections using the following source link: https://source.unsplash.com/featured/?{prompt here}\n\nFor example, to show images of pizza, we used this link: https://source.unsplash.com/featured/?pizza\n\nLet\'s now move on to the Reservations page. Here\'s the HTML code for that:\n\n```\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Tasty Eats | Reservations</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <!-- Bootstrap CSS -->\n  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOUY4U9TOTfWpNc1vCnEpS+gPFSu6qGvMWUVRhxHovySpT6" crossorigin="anonymous">\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n<!-- Navigation Bar -->\n<nav class="navbar navbar-expand-lg navbar-light bg-light">\n  <a class="navbar-brand" href="#">Tasty Eats</a>\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n    <span class="navbar-toggler-icon"></span>\n  </button>\n  <div class="collapse navbar-collapse" id="navbarNav">\n    <ul class="navbar-nav">\n      <li class="nav-item">\n        <a class="nav-link" href="#">Home</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Menu</a>\n      </li>\n      <li class="nav-item active">\n        <a class="nav-link" href="#">Reservations</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Online Ordering</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Contact Us</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<!-- Reservation Form -->\n<div class="container mt-5">\n  <div class="row">\n    <div class="col-md-6 offset-md-3">\n      <h2 class="mb-4">Make a Reservation</h2>\n      <form>\n        <div class="form-group">\n          <input type="text" class="form-control" placeholder="Full Name">\n        </div>\n        <div class="form-group">\n          <input type="email" class="form-control" placeholder="Email Address">\n        </div>\n        <div class="form-group">\n          <input type="text" class="form-control" placeholder="Phone Number">\n        </div>\n        <div class="form-group">\n          <input type="date" class="form-control" placeholder="Date">\n        </div>\n        <div class="form-group">\n          <select class="form-control">\n            <option>Select Time</option>\n            <option>11:00 AM</option>\n            <option>12:00 PM</option>\n            <option>1:00 PM</option>\n            <option>2:00 PM</option>\n            <option>3:00 PM</option>\n            <option>4:00 PM</option>\n            <option>5:00 PM</option>\n            <option>6:00 PM</option>\n            <option>7:00 PM</option>\n            <option>8:00 PM</option>\n            <option>9:00 PM</option>\n          </select>\n        </div>\n        <div class="form-group">\n          <select class="form-control">\n            <option>Select Number of Guests</option>\n            <option>1</option>\n            <option>2</option>\n            <option>3</option>\n            <option>4</option>\n            <option>5</option>\n            <option>6</option>\n            <option>7</option>\n            <option>8</option>\n            <option>9</option>\n            <option>10</option>\n          </select>\n        </div>\n        <div class="form-group">\n          <textarea class="form-control" placeholder="Special Requests (optional)"></textarea>\n        </div>\n        <button type="submit" class="btn btn-primary btn-block">Submit Reservation</button>\n      </form>\n    </div>\n  </div>\n</div>\n\n<!-- Footer -->\n<footer class="bg-dark text-light mt-5 py-3">\n  <div class="container">\n    <div class="row align-items-center">\n      <div class="col-12 col-md-6 text-center text-md-left mb-1 mb-md-0">\n        <p class="mb-0">2021 Tasty Eats. All rights reserved.</p>\n      </div>\n      <div class="col-12 col-md-6 text-center text-md-right">\n        <a href="#" class="footer-link">Privacy Policy</a>\n        <a href="#" class="footer-link ml-2">Terms of Service</a>\n      </div>\n    </div>\n  </div>\n</footer>\n\n<!-- Bootstrap JS -->\n<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>\n<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper"> </script>\n<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOUY4U9TOTfWpNc1vCnEpS+gPFSu6qGvMWUVRhxHovySpT6" crossorigin="anonymous"></script>\n\n</body>\n</html>\n```\n\nThis code includes a simple reservation form where customers can enter their name, email, phone number, date and time of the reservation, number of guests, and any special requests.\n\nFor the Online Ordering page, we can use a similar form to collect menu items and order details. Here\'s the HTML code for that:\n\n```\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Tasty Eats | Online Ordering</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <!-- Bootstrap CSS -->\n  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-OgVRvuATP1z7JjHLkuOUY4U9TOTfWpNc1vCnEpS+gPFSu6qGvMWUVRhxHovySpT6" crossorigin="anonymous">\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n<!-- Navigation Bar -->\n<nav class="navbar navbar-expand-lg navbar-light bg-light">\n  <a class="navbar-brand" href="#">Tasty Eats</a>\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n    <span class="navbar-toggler-icon"></span>\n  </button>\n  <div class="collapse navbar-collapse" id="navbarNav">\n    <ul class="navbar-nav">\n      <li class="nav-item">\n        <a class="nav-link" href="#">Home</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Menu</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Reservations</a>\n      </li>\n      <li class="nav-item active">\n        <a class="nav-link" href="#">Online Ordering</a>\n      </li>\n      <li class="nav-item">\n        <a class="nav-link" href="#">Contact Us</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<!-- Order Form -->\n<div class="container mt-5">\n  <div class="row">\n    <div class="col-md-6 offset-md-3">\n      <h2 class="mb-4">Place an Order</h2>\n      <form>\n        <h4 class="mb-3">Select Your Items</h4>\n        <div class="form-group">\n          <label for="item-1">Pizza</label>\n          <select class="form-control" id="item-1">\n            <option>Choose...</option>\n            <option>Margherita Pizza</option>\n            <option>Pepperoni Pizza</option>\n            <option>Hawaiian Pizza</option>\n            <option>Vegetarian Pizza</option>\n          </select>\n          <small class="form-text text-muted">Price: $10.00</small>\n        </div>\n        <div class="form-group">\n          <label for="item-2">Burger</label>\n          <select class="form-control" id="item-2">\n            <option>Choose...</option>\n            <option>Classic Cheeseburger</option>\n            <option>BBQ Bacon Burger</option>\n            <option>Mushroom Swiss Burger</option>\n            <option>Veggie Burger</option>\n          </select>\n          <small class="form-text text-muted">Price: $8.00',
          },
          finish_reason: "length",
          index: 0,
        },
      ],
    };

    // console.log(airesponse);
    res.status(200).json(v2);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.createPost = async (req, res) => {
  try {
    const { prompt, html, author } = req.body;
    console.log("---Uploading---", prompt);

    const newPost = await Postv2.create({
      prompt,
      html,
      author,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    const { prompt } = req.body;
    console.log("---failed to upload---", prompt);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { prompt, html, css, js } = req.body;
  try {
    const post = await Postv2.findByIdAndUpdate(id, {
      prompt,
      html,
      css,
      js,
    });
    res.status(200).json({ success: true, data: { prompt, html, css, js } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to update a post, please try again",
    });
  }
};

exports.getPostbyId = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const post = await Postv2.find({ _id: id });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch a post, please try again",
    });
  }
};

exports.getPaginatedGenerations = async (req, res) => {
  try {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || "0");
    const total = await Postv2.countDocuments({ version: 2 });
    const posts = await Postv2.find({ version: 2 })
      .sort({ date: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      total: total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      data: posts,
    });

    // const generations = await Post.find().sort({ date: -1 });

    // res.status(200).json({ success: true, data: generations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get generations, please try again",
    });
  }
};

exports.getImages = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send({ error: 'Query parameter "q" is required.' });
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.GOOGLE_CSE_ID,
          q: query,
          searchType: "image",
          num: 1,
        },
      }
    );

    const items = response.data.items;
    if (items && items.length > 0) {
      const imageUrl = items[0].link;
      return res.redirect(imageUrl);
    } else {
      return res
        .status(404)
        .send({ error: "No images found for the given query." });
    }
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return res
      .status(500)
      .send({ error: "An error occurred while fetching images." });
  }
};
