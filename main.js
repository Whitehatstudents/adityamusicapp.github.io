song1="";
song2=""
rightWristX= 0;
leftWristX= 0;

rightWristY= 0;
leftWristY= 0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload()
{
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('posenet is initialised');
}
function draw()
{
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if (song1_status==false){
        song1.play();
    }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,lefttWristY,20);
        song1.stop();
        if (song2_status==false){
            song2.play();
        }
        }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }
}
