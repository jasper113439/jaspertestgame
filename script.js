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

const playerNoDirection = 0;
const playerUp = 1;
const playerUpRight =2;
const playerRight = 3;
const playerDownRight = 4;
const playerDown = 5;
const playerDownLeft = 6;
const playerLeft = 7;
const playerUpLeft = 8; 

var buttonColour = "red";

var floorY = 710;

var playerX = 600; // x-positie van speler
var playerY = floorY - 25; // y-positie van speler
var playerHealth = 100;
var playerXSpeed = 4;

var playerScore = 0;

var playerGrounded = true;
var jumpSpeed;
var jumpStartSpeed = 11;
var gravity = 0.4;

var playerDirection = playerNoDirection;
var dashX = 10;
var dashY = 10;
var isDashing = false;

var playerDirection = 0;

var enemyX = 800;
var enemyY = 685;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(37)) {
    playerX = playerX - playerXSpeed;
    playerDirection = playerLeft;
  }
  if (keyIsDown(39)) {
    playerX = playerX + playerXSpeed;
    playerDirection = playerRight;
  }
  if (keyIsDown(38)){
    playerDirection = playerUp;
  }
  if(keyIsDown(40)){
    playerDirection = playerDown;
  }
  if (keyIsDown(38) && keyIsDown(39)){
    playerDirection = playerUpRight;
  }
  if (keyIsDown(40) && keyIsDown(39)){
    playerDirection = playerDownRight;
  }
  if (keyIsDown(37) && keyIsDown(40)){
    playerDirection = playerDownLeft;
  }
  if (keyIsDown(38) && keyIsDown(37)){
    playerDirection = playerUpLeft;
  }
  // sprong
  if (keyIsDown(67) && playerGrounded === true) {
    playerGrounded = false;
    jumpSpeed = jumpStartSpeed;
  }
  if (playerGrounded === false) {
    playerY = playerY - jumpSpeed;
    jumpSpeed = jumpSpeed - gravity;
  }
  if (playerY > floorY - 25) {
    playerGrounded = true;
  }

  // vijand

  // dash
  if (isDashing === false && keyIsDown(88)) { //X
    isDashing = true;
  }
  if (isDashing === true) {
    dashY = dashY - 10;
  }
  if (isDashing === true && dashY < 0) {
    isDashing = false;
  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand
  if (playerX - enemyX < 50
    && playerX - enemyX > -50
    && playerY - enemyY < 50
    && playerY - enemyY > -50
    && playerHealth > 0) {
    playerHealth--;
  }

  // botsing kogel tegen vijand

  // update punten en health
  playerScore = playerScore + 1;
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("green");
  rect(0, 0, 1280, 720);
  // floor
  fill("black");
  rect(0, floorY, 1280, 10)
  
  // vijand
  fill("red");
  rect(enemyX - 25, enemyY - 25, 50, 50);
  fill("black");
  ellipse(enemyX, enemyY, 10, 10);
  // speler
  fill("brown");
  rect(playerX - 25, playerY - 25, 50, 50);
  fill("black");
  ellipse(playerX, playerY, 10, 10);

  // punten en health
  strokeWeight(5);
  fill("green");
  rect(10, 10, 210, 40);
  stroke("red");
  fill("red");
  rect(15, 15, playerHealth * 2, 30);
  fill("white");
  stroke("black");
  textSize(20);
  text("health:" + playerHealth, 10, 70);
  text("score:"+ playerScore, 10, 90);
  stroke("black");
  strokeWeight(1);
  // console log
  console.log (playerDirection);
}

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  if (playerHealth === 0) {
    return true;
  }
  return false;
};
var gameOver = function () {
  if (mouseX > 500 && mouseX < 700 && mouseY > 600 && mouseY < 700) {
    buttonColour = "crimson";

  }
  else {
    buttonColour = "red";
  }
  if (mouseX > 500 && mouseX < 700 && mouseY > 600 && mouseY < 700 && mouseIsPressed) {
    buttonColour = "darkRed";
    spelStatus = SPELEN;
    playerX = 600;
    playerY = floorY - 25;
    playerHealth = 100;
    playerScore = 0;
  }

}
var tekenGameOver = function () {
  // teken game-over scherm
  fill("green");
  rect(0, 0, 1280, 720); //achtergrond 
  fill("white");
  textSize(50);
  text("back to the lobby", 100, 100);
  text("restart?", 500, 500);
  fill(buttonColour);
  rect(500, 600, 200, 100);
  fill("white");
  text("klik hier", 500, 650);
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
    tekenGameOver();
  }
}
