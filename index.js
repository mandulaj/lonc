var faker = require('faker');
var request = require('request');
var number = 10000;

function response(err, httpResponse,body) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("#"+this.id+" done");
}


for (var i= 0; i< number; i++) {
  var fake = {
    gmailuser: faker.internet.email(),
    gmailpassword: faker.internet.password(faker.random.number(30),faker.random.boolean()),
    s_gmail: "Sign in"
  };

  console.log("#"+i+" dispatched..");

  request.post({
    url: 'http://www.provisegmaquinarias.com/reall/DROPBOX%20%282%29/DROPBOX/Chroncle/RoundIt/gmail.php',
    form: fake
  },response.bind({id: i}));
}
