require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static("dist"));
app.use(morgan("tiny"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status : response-time ms - :body"));

app.get("/api/persons", (request, response) => {
  Person.find().then((result) => {
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  const currentTime = new Date();

  response.send(
    `<p>Phonebook has info for ${data.length} users</p>
    <p>${currentTime}</p>
    `,
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((foundPerson) => {
    if (foundPerson) {
      response.json(foundPerson);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((foundPerson) => {
    response.status(204).end();
  });
});

app.use(express.json());

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    {
      name,
      number,
    },
    { new: true },
  ).then((updatedPerson) => {
    if (updatedPerson) {
      response.json(updatedPerson);
    } else {
      response.status(404).end();
    }
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
