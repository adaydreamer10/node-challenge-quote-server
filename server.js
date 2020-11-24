// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
const quotesWithId = require("./quotes-with-id.json")

const { request, response } = require("express");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes",(request,response)=>{
  response.send(quotes)
})

app.get("/quotes/random", (req,res)=>{
  function pickFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  res.send(pickFromArray(quotesWithId))
})

// app.get request, making an endpoint
app.get("/quotes/search", (req, res) => {
// making variable "term"
  const term = req.query.term
// making function "search"
  function search (arr) {
// filter the array 
      return arr.filter ((item) => {
// using .includes on quotes
        if (item.quote.includes(term)) {
// retuen item
          return item
        }
      })
  }
// send the response 
  res.send(search(quotes))

})



//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
