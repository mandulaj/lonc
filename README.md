# lonc
Low orbit nano cannon - When Phishers piss me off...

![http://rack.0.mshcdn.com/media/ZgkyMDEzLzA2LzEyLzY2L0phY2tOaWNob2xzLjIxZTBhLmdpZgpwCXRodW1iCTEyMDB4OTYwMD4/a7087029/e2b/Jack-Nicholson.gif](http://rack.0.mshcdn.com/media/ZgkyMDEzLzA2LzEyLzY2L0phY2tOaWNob2xzLjIxZTBhLmdpZgpwCXRodW1iCTEyMDB4OTYwMD4/a7087029/e2b/Jack-Nicholson.gif)


If you ever come across a phishing site that asks the victims to enter their personal information, do us all the favor and flood their database with this simple tool... Just make a simple project file that describes the fields to be POST-ed and run the script. The program will use faker.js to post thousands of fake submissions to the scammer's database. Besides the effective DDOS, this tool will help to hide the real information of any victims that already submitted to the database in a flood of garbage....


###Example
Create a project file like this:
```json
{
  "target": "http://iamtryingtophish.you/index.php",
  "method": "POST",
  "requestCount": 10000,
  "localization": "en",
  "payload": {
    "name": "{{name.firstName}}",
    "lastname": "{{name.lastName}}",
    "address": "{{address.streetAddress}}",
    "phone": "{{phone.phoneNumber}}",
    "email": "{{internet.email}}"
  }
}
```
Start the scipt like this:
```bash
$ lonc projectFile.json
```
Sit back and watch the database get flooded :D

###Disclaimer
With great force comes great responsibility - use this tool at your own risk!
