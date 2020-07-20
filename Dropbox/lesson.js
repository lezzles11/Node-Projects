import fetch from "node-fetch";
const promise = new Promise((resolve, reject) => {
  resolve();
});

promise
  .then(() => console.log("I ran"))
  .then(() => console.log("I ran afterwards"))
  .then(() => console.log("Then I ran"))
  .catch((err) => console.log("uh oh error", err));

const url = "https://jsonplaceholder.typicode.com/posts";

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
