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

const ffi = require("ffi-napi");

// Convert JSString to CString
function toCString(text) {
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

// import my own dll
var lib = ffi.Library('./cpp/MyLibrary/x64/Release/MyLibrary.dll', {
    'Sum': [
        "int", ["int", "int"]
    ],
    'Diff': [
        "int", ["int", "int"]
    ],
    'Multiply': [
        "int", ["int", "int"]
    ],
    'CreateNewFile': [
        "int", ["string", "string"]
    ]
})

//tell express what to do when the /form route is requested
app.post('/form', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Call the message box function #0 DLL
    const isAccepted = user32.MessageBoxW(
        0, toCString("Hello " + req.body.name + ". Please test DLL's"), toCString("Windows MessageBoxW DLL"), 1
    );

    // Set the cursor position
    user32.SetCursorPos(0, 0);

    console.log(lib.Sum(1, 5));
    console.log(lib.Diff(1, 5));
    console.log(lib.Multiply(3, 5));
    console.log(lib.CreateNewFile(toCString("file.txt"), toCString("content")));

    if (isAccepted == 1)
    //mimic a slow network connection only for visual effect
        setTimeout(() => {
        res.send(JSON.stringify({
            name: req.body.name || null
        }));
    }, 1000)

});

//get text file content
app.get('/text-content', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

});

//open file in text editor
app.get('/text-content', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

});

//wait for a connection
app.listen(3000, () => {
    console.log('Server is running. Point your browser to: http://localhost:3000');
});