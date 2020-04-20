//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 
//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

// Import dependencies
// const ffi = require("@saleae/ffi");
const ffi = require("ffi-napi");

// Convert JSString to CString
function TEXT(text) {
    return Buffer.from(`${text}\0`, "ucs2");
}

// Import user32
const user32 = new ffi.Library("user32", {
    "MessageBoxW": [
        "int32", ["int32", "string", "string", "int32"]
    ],
    "SetCursorPos": [
        "bool", ["int32", "int32"]
    ]
});

//tell express what to do when the /form route is requested
app.post('/form',(req, res) => {
	res.setHeader('Content-Type', 'application/json');

	//mimic a slow network connection
	setTimeout(() => {
		res.send(JSON.stringify({
			fileName: req.body.fileName || null
		}));
	}, 1000)

	// Call the message box function
	const OK_or_Cancel = user32.MessageBoxW(
		0, TEXT("Hello from Node.js!"), TEXT(req.body.fileName), 1
	);

	// Show the output of the message box
	console.log(OK_or_Cancel);

	//debugging output for the terminal
	console.log('you posted: File Name: ' + req.body.fileName);

	// Set the cursor position
	user32.SetCursorPos(0, 0);

});

//wait for a connection
app.listen(3000, ()=> {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});