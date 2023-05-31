var backGround
var score
var hero,heroShoot,heroJump
var bullet,bulletImg
var enemy,enemyImg,enemyDead
var mainVillain,mainVillainImg
var forestImg,cityImg
var bulletGroup,enemyGroup
var gameState = "play"
function preload() {
  forestImg = loadImage("assets/forestBackground.png")
  cityImg = loadImage("assets/image.png")
  heroShoot = loadAnimation("assets/heroshoot.png")
  heroWalk = loadAnimation("assets/herowalk.png","assets/herowalk1.png","assets/herowalk2.png")
  heroJump =loadAnimation("assets/herojump.png")
  bulletImg = loadImage("assets/bullet.png")
  enemyImg = loadAnimation("assets/guyhit1.png")
  enemyHit = loadAnimation("assets/guyhit2.png","assets/guyhit3.png","assets/guyhit4.png")
  enemyDead = loadAnimation("assets/thugdead.png")
  mainVillainImg = loadAnimation("assets/Gangster1kill.png","assets/Gangster1kill1.png") 
  enemyDead = loadAnimation("assets/thugdead.png")

}
function setup() {
  createCanvas(1000,600);
  // creating ground to stand
  ground = createSprite(500,575,1000,20);
  ground.visible = false
  ground.x = ground.width /2;
  // adding background
  backGround = createSprite(600,300)
  backGround.addImage(cityImg)
  backGround.scale = 1.5
  backGround.velocityX = -7

  ammo = 9
  score = 1
  life = 3

  // creating hero
  hero = createSprite(50, 450, 50, 50)
  hero.addAnimation("Walk",heroWalk)
  hero.addAnimation("Jump",heroJump)
  hero.addAnimation("Shoot",heroShoot)

  bulletGroup = new Group()
  enemyGroup = new Group()
}

function draw() {
  background("white"); 
  //console.log(backGround.x)


  if (gameState == "play"){
  if(backGround.x<100){
    backGround.x=width/2
  }
  
  //jump when the space key is pressed
  if(keyDown("up")&& hero.y >= 400) {
    hero.velocityY = -15;
    
  }
    //add gravity
    hero.velocityY = hero.velocityY + 0.8
  //giving shoot ability to hero
  if(keyWentDown(RIGHT_ARROW) && hero.y >= 250 && ammo>0){
    bullets()
    ammo-=1
    
  }
  if(life <= 0){
    gameState = "nolife"
  }
  if(ammo<=0){
    gameState = "nobullets"
  }

   if(enemyGroup.isTouching(bulletGroup)){
   
    for(var i = 0;i< enemyGroup.length;i++){
      if(enemyGroup[i].isTouching(bulletGroup)){
        enemyGroup[i].changeAnimation("dies" )
        enemyGroup[i].lifetime = 5
        //enemyGroup[i].destroy()
        bulletGroup.destroyEach()
        score -= 1
        // setTimeout(()=>{
        //   enemyGroup[i].remove()
        // },1000)
      }


    }

  
  }

  if(enemyGroup.isTouching(hero)){
    for(var i = 0;i< enemyGroup.length;i++){
      if(enemyGroup[i].isTouching(hero)){
        life -= 1
        enemyGroup[i].destroy()
        enemyGroup[i].changeAnimation("strikes")
      }

    }


  }

  spawnEnemies()
  if (score == 0){
    gameState="win"
  }
}

  hero.collide(ground)
  drawSprites();
  textSize(20)
  text("Enemies remaining : " + score,200,100)
  text("Lives : " + life,450,100)
  text("Bullets remaining : " + ammo,600,100)
  if(gameState=="win"){
    backGround.velocityX = 0
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
    textSize(50)
    fill("red")
    text("GAME OVER . YOU WON !",300,300)
  }
  if(gameState == "nolife"){
    textSize(30)
    fill("black")
    text("SORRY YOU WERE KILLED",100,300)
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
    backGround.velocityX = 0
  }
  if (gameState=="nobullets"){
    textSize(30)
    fill("black")
    text("SORRY RAN OUT OF BULLETS",500,300)
    backGround.velocityX = 0
  }
}

function bullets(){
  hero.changeAnimation("Shoot")
  bullet = createSprite(hero.x + 20,hero.y,30,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.25
  bullet .velocityX = 15
  bullet.lifetime = 300;
  bulletGroup.add(bullet)
}

function spawnEnemies(){
  if(frameCount%200==0){
    enemy = createSprite(800,450,50,50)
    enemy.addAnimation("Appear",enemyImg)
    enemy.addAnimation("strikes",enemyHit)
    enemy.addAnimation("dies",enemyDead)
    enemy.scale=1.25
    enemy.velocityX = -2
    enemyGroup.add(enemy)
  }
}