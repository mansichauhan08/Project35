//Create variables here
var dog, dogImage, happyDog, database, foodS, foodStock;
foodS = 21;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
  writeStock(foodS);
}


function draw() {  
  background("lavender");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("Press up arrow key for feeding the dog", 100,30);
  text("Food Remaining : "+ foodS, 150,100)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food : x
  })
}