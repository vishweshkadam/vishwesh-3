var PLAY = 1;
var END = 0;
var gameState = PLAY;
var x1 = 0;
var x2;
var ground, ground_image
var girl, girl_running, girl_collided, girlImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var garbageGroup, garbage1, garbage2, garbage3, garbage4,garbage5,garbage6,garbage7
var jumpSound, dieSound, checkpointSound,sweepersound;
var score,scoreImage,scoreBoard;
var gameOver, restart, gameOverImage, restartImage;
var level=1,levelImage,levelBoard;
var  invisible_sky,invisible_ground
var winText,winText_img

function preload() {
  ground_image = loadImage("bg level1.png");
  girl_running = loadAnimation("boy lv1.png");
obstacle2 = loadImage("tea table.png");
  obstacle1 = loadImage("table1.png");
  garbage1 = loadImage("x.png");
  garbage2 = loadImage("gitar.png");
  garbage3 = loadImage("duck.png");
  garbage4 = loadImage("car.png");
  garbage5 =loadImage("block.png")
  garbage6 =loadImage("toy-car.png")
  garbage7 =loadImage("trian.png")
  winText_img =loadImage("win.png"); 
  gameOverImage = loadImage("go1.png");
  restartImage = loadImage("RS1.png");
  girl_collided = loadImage("Idle1.png");
  girlImage = loadImage("Idle1.png");

  scoreImage = loadImage("Score.png");
  
  levelImage = loadImage("Level1.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);



  x2 = width;
  ground = createSprite(0, 0, 600, 1000);

  ground.addImage("ground_image", ground_image);

  ground.x = -40
  ground.y=180
  girl = createSprite(300, 470, 600, -20);
  girl.addAnimation("girl_running", girl_running);
  girl.addImage("girl_collided", girl_collided);
  girl.addImage("girlImage", girlImage);
 
  girl.scale =0.4;
girl.x =200
girl.y=200
  // girl.velocityX=2;
  //girl.debug = true;
  girl.setCollider("circle", 0, 0, 300);


  winText = createSprite(windowWidth/2, windowHeight/2);
  winText.addImage(winText_img);
  winText.scale = 0.55;
  winText.visible = false;


  invisible_ground=createSprite(400,650,2000,10);
  invisible_ground.visible = false;
  invisible_sky = createSprite(200, 10, 3000, 6);
  invisible_sky.visible = false;


  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImage);

  restart = createSprite(windowWidth/2, windowHeight/2 - 150,200,200);
  restart.addImage(restartImage);
  restart.scale=0.60;

  scoreBoard = createSprite(100, 80);
  scoreBoard.addImage(scoreImage);
  scoreBoard.scale=0.50;

  levelBoard = createSprite(0.9* windowWidth, 85);
  levelBoard.addImage(levelImage);
  levelBoard.scale=0.50;

  obstaclesGroup = new Group();
  garbageGroup = new Group();


  score = 0;
}

 
    
  

    


 
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    girl.velocityX = -6;
  } 
   if (keyCode === RIGHT_ARROW) {
    girl.velocityX = 1;
  } 
   if (keyCode === DOWN_ARROW) {
    girl.velocityY = 1;
  }  if (keyCode === UP_ARROW) {
    girl.velocityY = -1;

  }
}

function draw() {
  girl.collide(invisible_ground);
  girl.collide(invisible_sky);

 
  if(scoreBoard === 100){
    winText.visible = true;
    gameState = "WIN";

   }
   if(gameState === "WIN"){
    button = createButton('LEVEL 2');
    button.position(300,300);
    button.mousePressed(goToNextLevel);
  
}
  if (gameState === PLAY) 
  {
    gameOver.visible = false;
    restart.visible = false;
    winText.visible = false;


    spawnObstacles();
    spawnObstacles2();
    spawnObstacles3();
    spawngarbag();
    spawngarbag2();
    spawngarbag3();
    spawngarbag4();
    spawngarbag5();
    spawngarbag6();
    spawngarbag7();


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

 
    if ((keyDown("space") && girl.y >= 380)) {
      girl.velocityY = -12;
    
    }



    if (girl.isTouching(obstaclesGroup)) {
      gameState = END;
      
    }



    for(var i = 0; i < garbageGroup.length; i++){
   
      if(girl.isTouching(garbageGroup.get(i))){
        garbageGroup.get(i).destroy();
        score = score + 10;   
       
      }
     }
    
  }
  
   if(score>100){
     window.location=("LEVEL 2.html")
   }

  else if (gameState === END) {
    gameOver.visible = true;
  
    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0
    girl.changeImage("girlImage", girlImage);


    //set lifetime of the game objects so that they are never destroyed
    // obstaclesGroup.setLifetimeEach(-1);
    // obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
  fill("black");
  textSize(25);
  text("Score:" + score,40, 85);
  text("Level : " + level, 0.87* windowWidth, 85);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation("girl_running", girl_running);
  obstaclesGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if (frameCount % 150 === 0 ) {
    var obstacle = createSprite(1200, 450, 30, 40);
    // obstacle.velocityX = -3 ;//+ score/100);

    //generate random obstacles
   
    obstacle.addImage(obstacle2);
   
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("circle", 0, 0, 1);
  }

}

function spawnObstacles2() {
  if (frameCount % 100 === 0 ) {
    var obstacle = createSprite(400, 350, 30, 40);
    // obstacle.velocityX = -3 ;//+ score/100);

    //generate random obstacles
   
    obstacle.addImage(obstacle1);
   
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("circle", 0, 0, 1);
  }

}

function spawnObstacles3() {
  if (frameCount % 100 === 0 ) {
    var obstacle = createSprite(700, 360, 30, 40);
    // obstacle.velocityX = -3 ;//+ score/100);

    //generate random obstacles
   
    obstacle.addImage(obstacle1);
   
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("circle", 0, 0, 1);
  }

}
function spawngarbag() {
  if (frameCount % 50 === 0) {
    var garbages = createSprite(900, 450, 10, 40);


    //generate random obstacles
    //var rand = Math.round(random(1, 6));

    var rand = Math.round(random(1,2));

      
    
    switch(rand){
      case 1: garbages.addImage(garbage3);
    }
    garbages.scale = 0.90;
    
    //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages.setCollider("circle", 0, 0, 70);
  }
}



function spawngarbag2() {
  if (frameCount % 50 === 0) {
    var garbages = createSprite(350, 500, 30, 40);


    //generate random obstacles
    //var rand = Math.round(random(1, 6));

    var rand = Math.round(random(1,2));

    
    garbages.addImage(garbage2);
    garbages.scale = 0.90;
    garbageGroup.add(garbages);
    //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages.setCollider("circle", 0, 0, 70);
  }
}
function spawngarbag3() {
  if (frameCount % 50 === 0) {
    var garbages = createSprite(550, 360, 30, 40);


    //generate random obstacles
    //var rand = Math.round(random(1, 6));

    var rand = Math.round(random(1,2));

    switch(rand){
     
      case 2: garbages.addImage(garbage1);
     
      
      
    }
    //garbages.addImage(garbage1);
    garbages.scale = 0.60;
    garbageGroup.add(garbages);
    //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages.setCollider("circle", 0, 0, 70);
  }
}
function spawngarbag4() {
  if (frameCount % 50 === 0) {
    var garbages = createSprite(650, 450, 30, 40);


    //generate random obstacles
    //var rand = Math.round(random(1, 6));

    var rand = Math.round(random(1,2));

    switch(rand){
     
      case 2: garbages.addImage(garbage4);
     
      
      
    }
    //garbages.addImage(garbage1);
    
    garbages.scale = 0.90;
    garbageGroup.add(garbages);
    //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages.setCollider("circle", 0, 0, 70);
  }
}
function     spawngarbag5(){
  if (frameCount % 50 === 0) {
    var garbages1 = createSprite(500, 560, 30, 40);
      garbages1.addImage(garbage5);
    garbages1.scale = 0.90;
    garbageGroup.add(garbages1);
    //garbages1.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages1.setCollider("circle", 0, 0, 70);
  }
  }
  function  spawngarbag6(){
    if (frameCount % 50 === 0) {
    var garbages2= createSprite(200, 560, 30, 40);
      garbages2.addImage(garbage6);
    garbages2.scale = 0.90;
    garbageGroup.add(garbages2);
    //garbages1.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages2.setCollider("circle", 0, 0, 70);
    }
  }
  function  spawngarbag7(){
    if (frameCount % 50 === 0) {
      
        var garbages3= createSprite(200, 560, 30, 40);
     
    
       
    
        
   
    garbages3.scale = 0.90;
    garbageGroup.add(garbages3);
    //garbages1.debug = true //by doing this you will be able to see the collider and later comment it in final code
    garbages3.setCollider("circle", 0, 0, 70);
  
    }
}

// function goToNextLevel() {
//   window.location=("LEVEL 2.html")
  