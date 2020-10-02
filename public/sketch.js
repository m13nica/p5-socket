//check README.md for more information

// below helps recognize p5 commands
/// <reference path="TSDef/p5.global-mode.d.ts" />

//create a socket connection
var socket;

//square on key
var square;

function setup() {
    //create a canvas
    createCanvas(800, 600);
    //paint it white
    background(255, 255, 255);
    
    //I create socket but I wait to assign all the functions before opening a connection
    socket = io({
        autoConnect: false
    });

    //detects a server connection 
    socket.on('connect', onConnect);
    //handles the messages from the server, the parameter is a string
    socket.on('message', onMessage);
    //handles the user action broadcast by the server, the parameter is an object
    socket.on('action', onAction);

    socket.open();
}

//this function is called continuously
function draw() {
    
}

//p5 func for keyPressed to generate user placed squares
function keyPressed() {
    var constraintX = random(0, width);
    var constraintY = random(0, height)

    if (socket.id) {

        console.log("Key pressed at " + constraintX + " " + constraintY);
        //send 
        socket.emit('clientAction', { keyX: constraintX, keyY: constraintY });

    }
    }

//p5 function called on mouse press - send coordinates to server
function mousePressed() {
    //make sure the connection is established
    if (socket.id) {

        console.log("Mouse pressed at " + mouseX + " " + mouseY);
        //send 
        socket.emit('clientAction', { x: mouseX, y: mouseY });

    }
}

//called by the server upon any user action including me
function onAction(obj) {
    //change fill color to black
    let r = random(0, 255);
    let g = random(110, 255);
    let b = random(10, 255);
    
    noStroke();
    fill(r, g, b);
    //draw a circle
    ellipse(obj.x, obj.y, 20, 20);

    if(keyIsPressed = true) {
        rect(obj.keyX, obj.keyY, 20, 20);
    }
}

//connected to the server
function onConnect() {
    if (socket.id) {
        console.log("Connected to the server");
    }
}

//a message from the server
function onMessage(msg) {
    if (socket.id) {
        console.log("Message from server: " + msg);
    }
}