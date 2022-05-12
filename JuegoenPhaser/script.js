var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: true
    }
},
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var playerTimeShoot = 1; //
var playerPuedeMoverse = 1;  //
var cantEnemigos = 0; //
var contadorVictoria = 0; //
var playerVivo = 1; //
var contadorDerrota = 0; //
var bulletQuantity = 0; //
var bullet1 = 0; //
var bullet2 = 0; //
var bulletEnemigo = 0; //
var cuadroDir = 1; //
var cuadroVel = 1; //
var cuadroX = 400; //
var cuadroY = 50; //
var array = [ //
	[1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1]
];
var limiteEsq = -250; //
var limiteDir =  250; //
var limiteBai =  200; //
var score = 0; //
var lives = 3; //
var intervaloTirosEnemigos = 0; //
var strDebug;
var scoreString ; //	
var livesString ; //

function init ()
{
}

function preload ()
{
	this.load.image('Fondo', 'img/bg2.jpg'); //Fondo
	this.load.image('Cuadro', 'img/base.png'); //Cuadro
	this.load.image('Player', 'img/player.png'); //Player
	this.load.image('Bullet', 'img/bullet2.png'); //Bullet
	this.load.image('EnemyBullet', 'img/bullet.png'); //EnemyBullet
	this.load.image('Invader1', 'img/yellow.png'); //invader1
	this.load.image('Invader2', 'img/green.png'); //invader2
	this.load.image('Invader3', 'img/red.png'); //invader3
	this.load.image('Escudo', 'img/base.png');	
	this.load.image('GameOver', 'img/gameover.png');
}

function create ()
{
	//Fondo
	this.add.image(0, 0, 'Fondo').setOrigin(0, 0);

	//Player
	player = this.add.image(400, 440, 'Player').setOrigin(0.5, 1);
	player.depth = 1;

	//Input
	cursors = this.input.keyboard.createCursorKeys();
	
	//Enemigos
	this.Group_Enemy = this.add.group({runChildUpdate:true});	
	this.Group_Enemy_Shot = this.add.group({runChildUpdate:true});
	this.Group_Escudo = this.add.group({runChildUpdate:true});
	var OrigemX = 175;
	var OrigemY =  50;
	for(i=0; i<=9; i++){
		for(j=0; j<=3; j++){
			var sprite = '';
			if(j==0){ sprite = 'Invader1'; }
			if(j==1){ sprite = 'Invader2'; }
			if(j>=2){ sprite = 'Invader3'; }
			this.Group_Enemy.add(enemy = new Enemy(this, OrigemX+50*i, OrigemY+50*j, sprite));
		}
	}

	//Escudos
	var LayoutEscudos = [
		[0,0,1,0,0],
		[0,1,1,1,0],
		[1,1,1,1,1]
	];
	for(i=0; i<=2; i++){
		for(j=0; j<=4; j++){
			for(k=-1; k<=1; k++){
				if(LayoutEscudos[i][j] == 1){ 
				this.Group_Escudo.add(escudo = 
					new Escudo(this, k*250+360+20*j, 330+20*i, 'Escudo')); 
				}
			}
		}
	}

	//Iniciando el movimiento con cuadro
	cuadro = this.add.sprite(400, 100, 'Cuadro').setOrigin(0.5, 0.5);
	cuadro.visible = 0;

	//Texto
	scoreString  = this.add.text(16, 16, '', { fontSize: '20px', fill: '#FFFFFF'}).setOrigin(0,0.5);
	livesString  = this.add.text(500, 20, '', { fontSize: '20px', fill: '#FFFFFF'}).setOrigin(0,0.5);

	//Debug
	graphics = this.add.graphics();
}

function update ()
{
	intervaloTirosEnemigos++;
	if(intervaloTirosEnemigos>120)
	{
		intervaloTirosEnemigos = 0;
	}
	
	//Limita el movimiento del grupo de enemigos
	cantEnemigos = 0;
	var buscandoEsquina = 1;
	limiteEsq = 0;
	limiteDir = 0;
	for(i=0; i<=9; i++)
	{
		for(j=0; j<=3; j++){
			cantEnemigos += array[j][i];
			var vTemp;
			if(i == 0){ vTemp = -250; }
			if(i == 1){ vTemp = -200; }
			if(i == 2){ vTemp = -150; }
			if(i == 3){ vTemp = -100; }
			if(i == 4){ vTemp = - 50; }
			if(i == 5){ vTemp =    0; }
			if(i == 6){ vTemp =   50; }
			if(i == 7){ vTemp =  100; }
			if(i == 8){ vTemp =  150; }
			if(i == 9){ vTemp =  200; }
			if(buscandoEsquina == 1 && array[j][i] != 0)
			{
				limiteEsq = vTemp;
				buscandoEsquina = 0;
			}
			if(array[j][i] != 0)
			{
				limiteDir = vTemp+50;
			}
		}
	}
	limiteBai = 0;
	for(i=0; i<=3; i++)
	{
		for(j=0; j<=9; j++){
			var vTemp;
			if(i == 0){ vTemp =  50; }
			if(i == 1){ vTemp = 100; }
			if(i == 2){ vTemp = 150; }
			if(i == 3){ vTemp = 200; }
			if(array[i][j] != 0)
			{
				limiteBai = vTemp;
			}
		}
	}
	
	cuadroX = cuadro.x;
	cuadroY = cuadro.y;
	if(cuadro.x > (400-limiteDir)+400) 
	{ 
		cuadroDir = -1; 
		cuadro.x = (400-limiteDir)+400; 
		cuadro.y += 5;
	}
	if(cuadro.x < limiteEsq*-1) 
	{ 
		cuadroDir =  1; 
		cuadro.x = limiteEsq*-1;
		cuadro.y += 5;
	}
	if(contadorVictoria==0)
	{
		cuadro.x += cuadroVel * cuadroDir;
	}
	
	//Disparo del enemigo
	if(cantEnemigos>0)
	{
		var EVEPA = 0; 
		var Disparo_Linea = 0;
		var Disparo_Columna = 0;
		while(EVEPA == 0){
			var sorteo = Phaser.Math.Between(0, 39);
			var sorteo = sorteo/10;
			var parte_entera = Math.floor(sorteo);
			var parte_fraccionada = Math.round((sorteo - parte_entera) * 10);
			EVEPA = array[parte_entera][parte_fraccionada];
			Disparo_Linea = parte_entera;
			Disparo_Columna = parte_fraccionada;
		}
		if(Disparo_Linea == 0){ Disparo_Linea = cuadro.y+ 50-25; }
		if(Disparo_Linea == 1){ Disparo_Linea = cuadro.y+100-25; }
		if(Disparo_Linea == 2){ Disparo_Linea = cuadro.y+150-25; }
		if(Disparo_Linea == 3){ Disparo_Linea = cuadro.y+200-25; }
		if(Disparo_Columna == 0){ Disparo_Columna = cuadro.x-250+25; }
		if(Disparo_Columna == 1){ Disparo_Columna = cuadro.x-200+25; }
		if(Disparo_Columna == 2){ Disparo_Columna = cuadro.x-150+25; }
		if(Disparo_Columna == 3){ Disparo_Columna = cuadro.x-100+25; }
		if(Disparo_Columna == 4){ Disparo_Columna = cuadro.x- 50+25; }
		if(Disparo_Columna == 5){ Disparo_Columna = cuadro.x-  0+25; }
		if(Disparo_Columna == 6){ Disparo_Columna = cuadro.x+ 50+25; }
		if(Disparo_Columna == 7){ Disparo_Columna = cuadro.x+100+25; }
		if(Disparo_Columna == 8){ Disparo_Columna = cuadro.x+150+25; }
		if(Disparo_Columna == 9){ Disparo_Columna = cuadro.x+200+25; }
		if( intervaloTirosEnemigos == 0 && contadorDerrota == 0 ){
			this.Group_Enemy.add(enemy_shot = 
				new Enemy_Shot(this, Disparo_Columna, Disparo_Linea, 'EnemyBullet'));
		}
	}
	
	
	//Condicion para comenzar a moverse 
	if(cantEnemigos == 0)
	{ 
		playerPuedeMoverse = 0; 
		contadorVictoria++;
		if (bullet1 == 1) { bala1.y-=10; }
		if (bullet2 == 1) { bala2.y-=10; }
	}
	if(contadorVictoria>0)
	{
		bullet1 = 0;
		bullet2 = 0;
	}

	//Inicia el movimiento del jugador
	if(playerPuedeMoverse == 1)
	{
		//Controles horizontales del jugador
		if (cursors.left.isDown )
		{ 
			player.x -= 5; 
		}
		if (cursors.right.isDown)
		{
			player.x += 5; 
		}
		
		//Control de disparo del jugador
		if (cursors.space.isDown && playerTimeShoot == 1 && bulletQuantity < 2)
		{ 
		if(bulletQuantity <= 1 && bullet1 == 0) 
		{ 
			bala1 = this.add.image(player.x, player.y-55, 'Bullet').setOrigin(0.5, 0.25); 			
			bullet1 = 1;
		}
		if(bulletQuantity == 1 && bullet2 == 0)
		{ 
			bala2 = this.add.image(player.x, player.y-55, 'Bullet').setOrigin(0.5, 0.25); 
			bullet2 = 1;
		}
		playerTimeShoot=0;
		bulletQuantity++;	
		}

		//Reinicia la capacidad de disparar al jugador
		if (cursors.space.isUp)
		{ 
			playerTimeShoot = 1; 
		}

		//Destruyen las balas que salen del limite y reinicia al contador
		if (bullet1 == 1) 
		{ 
			bala1.y-=10; 
			if(bala1.y < -70){ 
				bala1.destroy(); 
				bullet1 = 0; 
				bulletQuantity--;
			}
		}
		if (bullet2 == 1) 
		{ 
			bala2.y-=10; 
			if(bala2.y < -70){ 
				bala2.destroy(); 
				bullet2 = 0; 
				bulletQuantity--;
			}
		}
		if (bullet1 == -1){
			bullet1 = 0;				
		}

		if (bullet2 == -1){
			bullet2 = 0;
		}
		
		//Limita el movimiento del jugador
		if (player.x <  35) 
		{ 
			player.x =  35; 
		}
		if (player.x > 765) 
		{ 
			player.x = 765; 
		}
	}
	
	
	
	//Condicion para finalizar juego
	if(limiteBai+cuadro.y>410)
	{
		playerVivo = 0;
		lives = 0;
		cuadro.y += 2;
	}
	
	if(contadorDerrota == 60)
	{
		if(lives == 0){
		obj_gameover = this.add.image(400, 225, 'GameOver').setOrigin(0.5, 0.5);
		obj_gameover.alpha = 0;
		}else{
			playerVivo = 1;
			playerPuedeMoverse = 1; 
			player.visible = 1;
			if(bullet1 == 1) { bala1.visible = 1; }
			if(bullet2 == 1) { bala2.visible = 1; }
			contadorDerrota = 0;
		}
	}
	if(playerVivo == 0)
	{ 
		if(contadorDerrota>60 && lives==0) { obj_gameover.alpha+=0.02; }
		playerPuedeMoverse = 0; 
		player.visible = 0;
		if(bullet1 == 1) { bala1.visible = 0; }
		if(bullet2 == 1) { bala2.visible = 0; }
		cuadro.x = cuadroX;
		if(contadorDerrota < 60){ cuadro.y = cuadroY; }
		contadorDerrota++;
	}
	
	//Actualizar score
	scoreString .setText('Score:  ' + score);
	livesString .setText('Lives:  ' + lives);
	if(scoreString .x < 150){ scoreString .x+=2; }
	if(livesString .x > 500){ livesString .x-=2; }
}

