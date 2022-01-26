song="";
dectect_status="";
objects = [];


function preload(){
    song = loadSound("alarm_breakbeat.mp3");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetecter=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Dectecting Objects";
}
function modelLoaded(){
    console.log("model is Loaded!");
    dectect_status=true;
    objectDetecter.detect(video, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else
    {console.log(results);
    objects = results;}
}

function draw(){
    image(video,0,0, 380, 380);
   
    if(dectect_status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are "+ objects.length;

            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                console.log("Stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("Play");
                song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("Play");
                song.play();
        }
    }
}