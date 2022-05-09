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
var playerTimeShoot = 1;
var bulletQuantity = 0;
var bullet1 = 0;
var bullet2 = 0;
var cuadroDir = 1;
var cuadroVel = 1;
var cuadroX = 400;
var cuadroY = 50;

var score = 0;
var lives = 3;
var scoreString
var livesString;
var array =[
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
]
var limiteEsq = -250;
var limiteDir = 250;
var limiteBai = 200;
var playerPuedeMover = 1;
var cantEnemigos = 0;
var contadorVictoria = 0;



function preload ()
{
    this.load.image('Fondo', 'Assets/bg2.jpg');
    this.load.image('Player', 'Assets/player.png');
    this.load.image('Bullet', 'Assets/bullet2.png');
    this.load.image('cuadro', 'Assets/base.png');
    this.load.spritesheet('invader1', 'Assets/invader1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('invader2', 'Assets/invader2.png', { frameWidth: 44, frameHeight: 32 });
    this.load.spritesheet('invader3', 'Assets/invader3.png', { frameWidth: 48, frameHeight: 32 });
}


function create ()
{    
    //Fondo
    this.add.image(0, 0, 'Fondo').setOrigin(0, 0);

    //Player
    player = this.add.image(400,570, 'Player').setOrigin(0.5,1);

    //Input
    cursors = this.input.keyboard.createCursorKeys();

    //Enemies

    //Enemigos
    this.Group_Enemy = this.add.group({runChildUpdate:true})
    var origenX = 175;
    var origenY = 50;
    for(i = 0; i<= 9; i++)
    {
        for(j = 0; j <= 2; j++)
        {
            var sprite = '';
            if(j==0){ sprite = 'invader1';}
            if(j==1){ sprite = 'invader2';}
            if(j==2){ sprite = 'invader3';}
            this.Group_Enemy.add(enemy = new Enemy(this, origenX + 50 * i, origenY + 50 * j, sprite));
        }
    }

    cuadro = this.add.sprite (400, 50, 'cuadro').setOrigin(0.5,0.5);

    //Texto    
    scoreText = this.add.text(16, 16,'' , { fontSize: '18px', fill: '#FFF' })
    livesText = this.add.text(696, 16, '', { fontSize: '18px', fill: '#FFF' })

    //Debug
    strDebug = this.add.text (400, 200,'-DEBUG-' , { fontSize: '18px', fill: '#FFF' }).setOrigin(0.5,0);
    graphics = this.add.graphics();
    
}

function update (time, delta)
{
    //Debug
    strDebug.setText(
        array[0] + '\n' +
        array[1] + '\n' +
        array[2] + '\n' +
        array[3] + '\n' 
    )
    cantEnemigos = 0;
    var buscandoEsquina = 1;
    limiteEsq = 0;
    limiteDir = 0;
    
    for(i = 0; i<=9; i++)
    {   
        for(j = 0; j<=3; j++)
        {
            cantEnemigos += array[j][i];
            var vTemp;
            if(i == 0){vTemp == -250;}
            if(i == 1){vTemp == -200;}
            if(i == 2){vTemp == -150;}
            if(i == 3){vTemp == -100;}
            if(i == 4){vTemp == -50;}
            if(i == 5){vTemp == 0;}
            if(i == 6){vTemp == 50;}
            if(i == 7){vTemp == 100;}
            if(i == 8){vTemp == 150;}
            if(i == 9){vTemp == 200;}
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
    for(i = 0; i<=3; i++)
    {   
        for(j = 0; j<=9; j++)
        {
            var vTemp;
            if(i == 0){vTemp == 50;}
            if(i == 1){vTemp == 100;}
            if(i == 2){vTemp == 150;}
            if(i == 3){vTemp == 250;}
            if(array[i][j] != 0)
            {
                limiteBai = vTemp;  
            }
        }
    }
    
    graphics.clear();
    graphics.fillStyle(0xff000, 0.5);
    graphics.fillRect(
        cuadro.x+limiteEsq,
        cuadro.y - 25,
        limiteDir - limiteEsq,
        limiteBai
    
    );

    if (cantEnemigos == 0)
    {
        playerPuedeMover = 0;
        contadorVictoria++;
    }




    if (playerPuedeMover == 1)
    {
        //Controles horizontales del jugador
        if(cursors.left.isDown)
        {   
            player.x -= 5;
        }
        if(cursors.right.isDown)
        {   
            player.x += 5;
        }

        //Control de disparo del jugador, aparece las balas y activa la condicion del disparo
        if (cursors.space.isDown && playerTimeShoot == 1 && bulletQuantity < 2)
        {
            if(bulletQuantity <= 1 && bullet1 == 0)
            {
                bala1 = this.add.image(player.x, player.y, 'Bullet').setOrigin(0.5,2);
                bullet1 = 1;
            }
            if(bulletQuantity == 1 && bullet2 == 0)
            {
                bala2 = this.add.image(player.x, player.y, 'Bullet').setOrigin(0.5,2);
                bullet2 = 1;
            }     
            playerTimeShoot = 0;
            bulletQuantity ++;
        }
    }
    


    
    //Reinicia la capacidad de disparar del jugador
    if(cursors.space.isUp)
    {   
        playerTimeShoot = 1;
    }

    //Destruye las balas que salen del limite y reinicia el contador para poder volver a disparar
    if(bullet1 == 1)
    {
        bala1.y-= 5;
        if(bala1.y < 75)
        {
            bala1.destroy();
            bullet1 = 0;
            bulletQuantity --;
        }
    }
    if(bullet2 == 1)
    {
        bala2.y-= 5;
        if(bala2.y < 75)
        {
            bala2.destroy();
            bullet2 = 0;
            bulletQuantity --;
        }
    }

    //Limita el movimiento del jugador
    if(player.x < 35)
    {   
        player.x = 35;
    }
    if(player.x > 765)
    {   
        player.x = 765;
    }

    //Movimiento del cuadro
    cuadroX = cuadro.x;
    cuadroY = cuadro.y;
    if(cuadro.x > 800){cuadroDir = -1; cuadro.x = 800;}
    if(cuadro.x <0){cuadroDir = 1; cuadro.x = 0;}
    cuadro.x += cuadroVel * cuadroDir;

    //actualizar score
    scoreText.setText ('Score: ' + score);
    livesText.setText ('Lives: '+ lives);

    

}

