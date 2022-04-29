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


		if(xPosition === 340){
			laser.remove();
		} else {
			laser.style.left = `${xPosition + 8}px`
		}
	}, 10);
}

window.addEventListener('keydown', flyAhip);