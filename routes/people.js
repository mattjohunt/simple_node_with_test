const express = require("express");
const router = express.Router();
const axios = require('axios');

let coordEndPoint = "https://bpdts-test-app-v4.herokuapp.com/users"; 

let cityEndPoint = "https://bpdts-test-app-v4.herokuapp.com/city/London/users";

const requestOne = axios.get(coordEndPoint);

const requestTwo = axios.get(cityEndPoint);	

// @route   GET people/peopleInLondon
// @desc    Get all people that are either listed to live in London or live within 60 miles of London. 
// @access  Public

router.get("/peopleInLondon", (req, res) => {

let result = [];

axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
	
result.push(requestCallOne(responses[0]));

result.push(requestCallTwo(responses[1]));

res.send(result);

  })).catch(error => {
	  console.log(error);
  });

});

let requestCallOne = (input) => {

let result = [];

	input.data.forEach(function (item, index) {
		if (item.latitude >= 50 && item.latitude <= 52 && item.longitude >= -1 && item.longitude <= 1) {
			result.push(item);
		}
  })

  return result;
}

let requestCallTwo = (input) => {

	let result = [];

	input.data.forEach(function (item, index) {
		result.push(item);
})

	  return result;
	}

module.exports = router;
