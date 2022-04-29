const yourShip = document.querySelector(".player-shooter"); 
const playArea = document.querySelector("#main-play-area");

//tiro da nave e movimentos
function flyAhip(event){
	if(event.key === 'ArrowUp'){
		event.preventDefault();
		moveUp();
	}else if(event.key === 'ArrowDown'){
		event.preventDefault();
		moveDown();
	}else if(event.key === " "){
		event.preventDefault();
		fireLaser();
	}
}


//função de subir
function moveUp(){
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if(topPosition === "8px"){
		return
	}else {
		let position = parseInt(topPosition)
		position -= 50;
		yourShip.style.top = `${position}px`;
	}
} 

 //função de descer
function moveDown(){
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
	if(topPosition === "510px"){
		return
	}else{
		let position = parseInt(topPosition)
		position += 50;
		yourShip.style.top = `${position}px`;
	}
}


//funcão de tiro da nave (criar o tiro)
function fireLaser(){
	let laser = createLaserElement();
	playArea.appendChild(laser);
	moveLaser(laser);
}


//função de criar o evento do tiro
function createLaserElement(){
	let xPosition  = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
	let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
	let newLaser = document.createElement('img');
	newLaser.src = 'img/shoot.png';
	newLaser.classList.add('laser');
	newLaser.style.top = `${yPosition - 05}px`;
	newLaser.style.left = `${xPosition - 05}px`;
	return newLaser;
} 



//função de movimento do tiro
function moveLaser(laser){
	let laserInterval = setInterval(() =>{
		let xPosition = parseInt(laser.style.left);
		let enemies = document.querySelectorAll('.enemy');

		enemies.forEach((enemy) => { //faz a comparação com a posição do laser e do inimigo 
			if(enemyColision(laser, enemy)) {
				enemy.src = 'img/explosion.png';
				enemy.classList.remove('enemy');
				enemy.classList.add('dead-enemy')
			}
		})


		if(xPosition > 340){
			laser.remove();
		} else {
			laser.style.left = `${xPosition + 8}px`;
		}
	}, 10);
} 

//função para criar inimigos aleatorios
function createEnemy(){
	let newEnemy = document.createElement('img');
	let enemySprite = enemyImg[Math.floor(Math.Random() * enemyImg.length)] //Math é responsavel por gerar as imagens aleatoriamente.
	newEnemy.src = enemySprite;
	newEnemy.classList.add('enemy');
	newEnemy.classList.add('enemy-Transition');
	newEnemy.style.left = '370px';
	newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`
	playArea.appendChild(newEnemy);
	moveEnemy(newEnemy);
}


// função de movimento dos inimigos
function moveEnemy(enemy) {
	let moveEnemyInterval = setInterval(() => {
		let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
			if(xPosition<= 50){
				if(Array.from(enemy.classList).includes('dead-enemy')) {
					enemy.remove()
				} else {
					gameOver();
				}  
			} else {
					enemy.style.left = `${xPosition - 4}px`
			}
	}, 30)
}


//função de colisão do laser com o inimigo
function enemyColision(laser, enemy){
	let laserTop = parseInt(laser.style.top);
	let laserLeft = parseInt(laser.style.left);
	let laserBotton = laserTop - 20;
	let enemyTop = parseInt(enemy.style.top);
	let enemyLeft = parseInt(enemy.style.left);
	let enemyBotton = enemyTop - 30

		if(laserLeft != 340 && laserLeft + 40 >= enemyLeft) {
			if(laserTop <= enemyTop && laserTop >= enemyBotton) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
}

window.addEventListener('keydown', flyAhip);