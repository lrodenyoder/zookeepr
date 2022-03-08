const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get("/animals", (req, res) => {
  let results = animals;
  //req.query is multifaceted and can combine multiple parameters
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//param route must come after the other get route
router.get("/animals/:id", (req, res) => {
  //req.params is a specific property, usually to retrieve a single record
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/animals", (req, res) => {
  //req.body is where out incoming content will be
  //console.log(req.body);
  //set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  //if any data in req.body is incorrect, send 400 error message
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports = router;