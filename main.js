var previsao = "";

Webcam.set({
   width: 350,
   height: 300,
   image_format: "png",
   png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function takePhoto() {
   Webcam.snap(function(DataURI){
      document.getElementById("result").innerHTML = "<img id='captureImg' src='" + DataURI + "'>"
   });
}

console.log("ML5 Version: ", ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/66Zu-3dzD/model.json", modelLoaded);

function modelLoaded() {
   console.log("Modelo carregado");
}

function speak() {
   var synth = window.speechSynthesis;
   var fala = "A primeira previsão é " + previsao1;
   var utterThis = new SpeechSynthesisUtterance(fala);
   synth.speak(utterThis);
}

function check() {
   var img = document.getElementById("captureImage");
   classifier.classify(img, gotResult);
}

function gotResult(error, results) {
   if(error) {
      console.error(error);
   } else {
      document.getElementById("resultEmotionName").innerHTML = results[0].label;
      previsao1 = results[0].label;
      speak();
      if(previsao1 == "dboa") {
         document.getElementById("updateEmoji").innerHTML = "&#129305;";
      }

      if(previsao1 == "joinha") {
         document.getElementById("updateEmoji").innerHTML = "&#128077;";
      }

      if(previsao1 == "soco") {
         document.getElementById("updateEmoji").innerHTML = "&#128548;";
      }
   }
}