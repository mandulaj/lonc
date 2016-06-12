#! /usr/bin/env node

var faker = require('faker');
var fs = require('fs');
var request = require('request');
var complete = 0;

var defaultTask = {
  "target": "http://0.0.0.0/index.php",
  "method": "POST",
  "requestCount": 10000,
  "requestQueueSize": 10,
  "localization": "en",
  "payload": {
    "firstName": "{{name.firstName}}",
    "lastName": "{{name.lastName}}",
    "email": "{{internet.email}}",
    "password": "{{internet.password}}"
  }
};

function mergeDefaults(options, defaults) {
  var options_final = {};
  for (var attr in defaults) {
    options_final[attr] = defaults[attr];
  }
  if(!options) {
    return options_final;
  }
  for (var attr2 in options) {
    options_final[attr2] = options[attr2];
  }
  return options_final;
}


function init(){
  var projectFile;
  var filePos = 1;
  if ((/node/).test(process.argv[0])) {
    filePos = 2;
  }
  if (process.argv.length > filePos) {
    projectFile = process.argv[filePos];
  } else {
    console.log("You need to provide a project file.");
    console.log("Exiting...");
    process.exit();
    return;
  }

  var fc = fs.readFileSync(projectFile);
  var jsonInstructions;
  try {
    return JSON.parse(fc);
  } catch(SyntaxError){
    console.log("The instruction JSON could not be parsed.");
    console.log("Exiting...");
    process.exit();
    return;
  }
}

function fillFake(object) {
  var newObject = {};
  for (var id in object){
    newObject[id] = faker.fake(object[id]);
  }
  return newObject;
}

function dispatchRequest(req) {
  return request({
    method: req.method,
    url: req.target,
    form: req.payload
  });
}


function startTask(task) {
  var req = {
    method: task.method,
    target: task.target,
    payload: fillFake(task.payload)
  };
  dispatchRequest(req).on('response', function (response) {
    if (response.statusCode !== 200) {
      console.log("Error", response.statusCode, ",", complete, "complete");
    }
    if (complete < task.requestCount) {
      complete += 1;
      startTask(task);
    } else {
      return;
    }
  });
}

/* START ***************************/
console.log("Welcome to lonc!");
console.log();
var task = init();

task = mergeDefaults(task, defaultTask);

console.log("Hold on to your buts because I am about to do", task.requestCount, "requests....");
faker.locale = task.localization;

var queueSize = task.requestQueueSize || 10;

// Start queue
for (var i = 0; i< queueSize; i++){
  startTask(task);
}
