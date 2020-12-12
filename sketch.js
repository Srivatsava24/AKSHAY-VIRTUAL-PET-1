//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1350, 630);
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(650,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.5;
}


function draw() {  
  background("blue");
  if(foodS!== undefined){
    textSize(30);    
    fill(255);    
    text("Note: Press UP ARROW to feed SWEETY milk", 420,600);
    text("Food Remaining: "+foodS, 100,380);

    fill("WHITE");
  textSize(50);
  textStyle(BOLD);
  textFont("segoe script");
  text("AKSHAY'S VIRTUAL PET - 1 2020",250,80);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }


    if(foodS === 0){
      foodS = 20;
    }


    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}
