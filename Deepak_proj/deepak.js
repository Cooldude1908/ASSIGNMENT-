const request = require("request");
let express = require("express");
let app = express();
const fs = require("fs");
var cors = require("cors");
app.use(cors());

const result = [];
request(
  {
    uri: "https://time.com/",
  },
  function (err, res, body) {
    //console.log(body);
    fs.writeFile("test.html", body, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }
);

fs.readFile("test.html", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const new_data = data.split('<li class="latest-stories__item">');
  for (var i = 1; i <= 6; i += 1) {
    // console.log(new_data[i]);
    const data_part = new_data[i];
    const final_array = data_part.split('"');
    const link = "https://time.com/" + final_array[1]; // link stored in this variable
    // file written successfully
    console.log(link); // printing link
    const title = final_array[4].split(">")[1].split("</h3")[0]; //title stored in this variable'
    result.push({title, link});
    console.log(title); //printing title
    console.log("========================================", i);
  }
});

console.log(result);
app.get("/getTimeStories", function (req, res) {
  res.json(result);
});
app.listen(3000);
