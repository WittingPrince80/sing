
selection = ["lyin.mp3", "met.mp3", "sosus.mp3", "showyou.mp3","dream.mp3","dreem.mp3"];
song = "";
random_number = Math.floor(Math.random() * 6);
console.log(selection[random_number]);
change = false;

function preload()
{
	song = loadSound(selection[random_number]);
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	   console.log(results);
     ScoreRightWrist = results[0].pose.keypoints[10].score;
	   ScoreLeftWrist = results[0].pose.keypoints[9].score;
     console.log("LeftWrist Score Is " + ScoreLeftWrist + " and RightWrist score is " + ScoreRightWrist);
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
  fill("#FF0000");
  stroke("#FF0000");
  if(ScoreRightWrist > 0.2)
  {
  circle(rightWristX, rightWristY, 20);

  if(rightWristY >0 && rightWristY <100)
  {
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);s
  }
  else if(rightWristY >100 && rightWristY <200)
  {
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
  }
  else if(rightWristY >200 && rightWristY <300)
  {
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
  }
  else if(rightWristY >300 && rightWristY <400)
  {
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
  }
  else if(rightWristY >400 && rightWristY <500)
  {
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
  }

  if (ScoreLeftWrist > 0.2)
  {
  circle(leftWristX, leftWristY,20);
  InNumberleftWristY = Number(leftWristY);
  remove_decimals = floor(InNumberleftWristY);
  volume = remove_decimals/400;
 document.getElementById("volume").innerHTML = "Volume = " + volume * 100;
 song.setVolume(volume);
  }
  }
}



function play()
{
  if(change == false)
  {
	song.play();
	song.setVolume(1);
	song.rate(1);
  change = true;
  }
   else
  {
     change = false;
    song.pause();
    song.currentTime = 0;
    random_number = Math.floor(Math.random()*8);
    console.log(selection[random_number]);
    song = loadSound(selection[random_number]);
    song.play();
    song.setVolume(1);
    song.rate(1);
  }

}