require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    let matheusTK = new Person({
      name:"Matheus",
      age: 24,
      favoriteFoods: ['Lasagna', 'Beans']
    });
    matheusTK.save(function(err, data) {
      if(err) return console.log(err);
      done(null, data);
    })
    };

    var arrayOfPeople = [{
      name:"Matheus",
      age: 24,
      favoriteFoods: ['Lasagna', 'Beans']
    },
    {
      name:"Laura",
      age: 31,
      favoriteFoods: ['Rice', 'Beans']
    },
    {
      name:"Max",
      age: 20,
      favoriteFoods: ['Taco', 'Rice']
    }];

var createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  });
  
};

var findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  });
};

var findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, id) {
    if(err) return console.log(err);
    done(null, id);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, id) {
    if(err) return console.log(err);
    id.favoriteFoods.push(foodToAdd);
    id.save((err, updateId) => {
      if(err) return console.log(err);
      done(null, updateId);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},
    {age: ageToSet},
    {new: true},
    function(err, person) {
      if(err) return console.log(err);
      done(null, person);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete({_id: personId}, 
    null,
    function(err, id) {
      if (err) return console.log(err);
      done(null, id);
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
