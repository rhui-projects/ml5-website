let classifier;
let video;
let resultsP;
let attempts;

function setup() {
  attempts = 0;
  noCanvas();
  video = createCapture(VIDEO);
  video.parent("webcam");
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
  resultsP.parent("webcam");
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(gotResult);
}

function gotResult(err, results) {
  if (err) {
    console.error(err);
  } else {
    let labels = String(results[0].label);
    console.log(labels);
    labels = labels.split(", ");
    resultsP.html("What I think you have entered: ");
    for(let i = 0; i < labels.length; ++i) {
      resultsP.html(labels[i]);
      if (results[0].confidence > 0 && labels[i] === "Band Aid") {
        resultsP.html("Thank you for tolerating my silliness.");
        break;
      }
    }
    classifyVideo();
  }
  
}