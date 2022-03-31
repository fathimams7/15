const PLAY = -1;
const END = 1;
const START = 0;
var gameState = START;

var jack,jack2;
var platform,platform2;
var jack_image, platform_image;
var platform1,platform2,platform3,platform4,platform5,platform6;
var score=0;


function preload(){
  jack_image=loadImage("images/jack2.png");
platform1 = loadImage("images/platform1.png");
platform2 = loadImage("images/platform2.png");
platform3 = loadImage("images/platform3.png");
platform4 = loadImage("images/platform4.png");
platform5 = loadImage("images/platform5.png");
platform6 = loadImage("images/platform6.png");
bg = loadImage('images/bg.png');
gameOverImg = loadImage("images/gameOver.png");
restartImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(500, 500);
  player = createSprite(250,300,20,50);
  player.addImage("player",jack_image)

  platform = createSprite(250,350,100,10);
  platform.addImage("platform", platform3)
  platform.scale=0.1;
 platformGroups = new Group(); 

 gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(250,300);
  restart.addImage(restartImg);
  gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(bg);
  spawnPlatform();
  textSize(22);
  fill('white');
  text("Score: "+ score, 350,50);
  
  score = score + Math.round(getFrameRate()/30);
 
  if(gameState==START)
  {
  fill(255);
  textSize(16);
  text("Press UP to start and make Jack jump",95,80);
  text("Press right and left arrow to make Jack go right and left",50,100);
  if(keyDown("up"))
  {
    platform.y =700;
    player.velocityY=-16;
    gameState = PLAY;
  }
  }

  if(gameState == PLAY){
    //spawnPlatform();

    player.collide(platform);
  

    if(platformGroups.isTouching(player) 
   && player.velocityY>5) {
      player.velocityY = -16;
 
    }

  
  if(keyDown("left"))
  {
    player.x = player.x - 7;
    
  }

  if(keyDown("right"))
  {
    player.x = player.x + 7;
   
  }

  player.velocityY = player.velocityY +0.8;

  
  }

  else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
        reset();
    }

  }
  drawSprites();
  
  
}

function spawnPlatform(){
  if(frameCount % 40 ===0){
     
    var platforms = createSprite(250,0,50,50);
  platforms.velocityY = 4;

  var r = Math.round(random(1,6))
  switch (r){
    case 1 : platforms.addImage(platform1);
    break;
    case 2 : platforms.addImage(platform2);
    break;
    case 3 : platforms.addImage(platform3);
    break;
    case 4 : platforms.addImage(platform4);
    break;
    case 5 : platforms.addImage(platform5);
    break;
    case 6 : platforms.addImage(platform6);
    break;
  }
 
  platforms.scale = 0.1;
  platforms.lifetime = 200;
  platforms.x = random(0,500);

  platformGroups.add(platforms);

  }
}