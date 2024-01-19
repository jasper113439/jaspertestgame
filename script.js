/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var floorY = 710;

var playerX = 600; // x-positie van speler
var playerY = floorY - 25; // y-positie van speler
var playerHealth = 100;
var playerXSpeed = 2;
var playerJumps = false;
var jumpSpeed;
var jumpStartSpeed =11;
var gravity = 0.4;

var enemyX = 800;
var enemyY = 685;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(37)){
  playerX = playerX-playerXSpeed;
  }
  if (keyIsDown(39)){
    playerX = playerX+playerXSpeed;
  }
  if(keyIsDown(67) && playerJumps === false){
    playerJumps = true;
    jumpSpeed = jumpStartSpeed;
  }
  if(playerJumps === true){
    playerY = playerY-jumpSpeed;
    jumpSpeed = jumpSpeed - gravity;
  }
  if(playerY > floorY - 25){
    playerJumps = false;
  }
  
  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
  if (playerX - enemyX<50 
    && playerX - enemyX>-50
    && playerY - enemyY<50 
    && playerY - enemyY>-50 
    && playerHealth >0) {
    playerHealth --;
    }
  
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("green");
  rect(0,0,1280,720);
  // floor
  fill("black");
  rect(0,floorY, 1280, 10)
  // vijand
  fill("red");
  rect(enemyX - 25, enemyY - 25, 50, 50);
  fill("black");
  ellipse(enemyX, enemyY, 10, 10);
  // kogel

  // speler
  fill("wit");
  rect(playerX - 25, playerY - 25, 50, 50);
  fill("black");
  ellipse(playerX, playerY, 10, 10);

  // punten en health
  strokeWeight(5);
  fill("green");
  rect(10,10, 210, 40);
  stroke("red");
  fill("red");
  rect(15,15,playerHealth *2,30);
  fill("white");
  stroke("black");
  textSize(20);
  text("health:"+ playerHealth, 10, 70);
  stroke("black");
  strokeWeight(1);
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  if (playerHealth === 0 ){
    return true;
  }
  return false;
};
var gameOver = function(){
  // teken game-over scherm
  fill("green");
  rect(0,0,1280,720); //achtergrond 
  fill("white");
  textSize(50);
  text("game over", 100, 100);
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    gameOver();
  }
}
