let classifier;
let canvas;
let label;
let confidence;

function preload() {
  // Load the DoodleNet Image Classification model
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
  // Create a canvas with 280 x 280 px
  canvas = createCanvas(280, 280);
  canvas.parent("p5-canvas");
  // Set canvas background to white
  background(255);
  // Whenever mouseReleased event happens on canvas, call "classifyCanvas" function
  canvas.mouseReleased(classifyCanvas);
  // Create a clear canvas button
  const button = createButton('Clear Canvas');
  button.parent("canvas-buttons");
  button.position('sticky');
  button.mousePressed(clearCanvas);
  // Create 'label' and 'confidence' div to hold results
  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');
  label.parent("p5-canvas");
  confidence.parent("p5-canvas");
}

function clearCanvas() {
  background(255);
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Show the first label and confidence
  label.html(`Label: ${results[0].label}`);
  confidence.html(`Confidence: ${nf(results[0].confidence, 0, 2)}`); // Round the confidence to 0.01
}