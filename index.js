var csv = require('csv-parser');
var request = require('request');
var fs = require('fs');

var input = fs.createReadStream("./names.csv");


var output = [];

var parser = csv({delimiter: ","});
parser.on('readable', function(){
  while(record = parser.read()) {
    output.push(record);
  }
});


parser.on('error', function(err){
  console.log(err.message);
});

parser.on('finish', function(){
  var i = 0;
  var data = output;
  var inter = setInterval(function () {
    if (i >= data.length) {
      clearInterval(inter);
      return;
    }
    var curr = data[i];
    i++;
    request.post('http://www.provisegmaquinarias.com/reall/DROPBOX%20%282%29/DROPBOX/Chroncle/RoundIt/gmail.php')
      .form({
        gmailuser: curr.Username,
        gmailpassword: curr.Password,
        s_gmail: "Sign in"
      })
      .on('response', function(response) {
        // console.log("#"+i + " done");
      //console.log(response.statusCode); // 200
      //console.log(response.headers['content-type']); // 'image/png'
    });
  }, 150);
});

input.pipe(parser);
