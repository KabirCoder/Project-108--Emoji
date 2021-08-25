var prediction1="";
var prediction2="";

Webcam.set({
 width:360, 
 height:300, 
 image_format:"png", 
 png_quality: 90
});
var camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    
});
}
console.log("ml5 version= ", ml5.version);
var classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FJ2eRBCER/model.json", modelLoaded);
function modelLoaded(){
  console.log("Model Loaded");

}
function Speak(){
    var synth=window.speechSynthesis;
    var speak_data_1="The First Prediction Is "+ prediction1;
    var speak_data_2="The Second Prediction Is "+ prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+ speak_data_2);
    utterthis.rate=0.5;
    synth.speak(utterthis)

}
function check(){
    var img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error, results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_name1").innerHTML=results[0].label;
        document.getElementById("result_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        Speak();
        if(results[0].label=="Happy")
        {
                document.getElementById("result_emoji1").innerHTML="&#128513;";
        }
        if(results[0].label=="Crying")
        {
                document.getElementById("result_emoji1").innerHTML="&#128557;";

        }
        if(results[0].label=="Angry")
        {
                document.getElementById("result_emoji1").innerHTML="&#128544;";

        }

        if(results[0].label=="Shocked")
        {
                document.getElementById("result_emoji1").innerHTML="	&#x1F632;";

        }



        if(results[1].label=="Happy")
        {
                document.getElementById("result_emoji1").innerHTML="&#128513;";
        }
        if(results[1].label=="Crying")
        {
                document.getElementById("result_emoji2").innerHTML="&#128557;";

        }
        if(results[1].label=="Angry")
        {
                document.getElementById("result_emoji2").innerHTML="&#128544;";

        }

        if(results[1].label=="Shocked")
        {
                document.getElementById("result_emoji2").innerHTML="&#x1f632;";

        }
        
    }

}
