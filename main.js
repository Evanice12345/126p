songs="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    songs= loadSound("songs.mp4");  
    
  }

  function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function modelLoaded(){
    console.log("POSENET MODEL HAS LOADED!!!!! YESSSSSSSSSSS")
}
function gotPoses(results){
if(results.length > 0){
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    score_leftWrist = results[0].pose.keypoints[9].score;
}
}


function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    songs.setVolume(volume);
   
}

function play(){
    songs.play();
    songs.setVolume(1)
    songs.rate(1)
   
}


if(rightWristY > 0){
    songs.stop();
   
}


