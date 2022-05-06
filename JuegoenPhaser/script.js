var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
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

function preload ()
{
    this.load.image('Fondo', 'Assets/bg2.jpg');
    this.load.image('nave', 'Assets/nave3.png');
    this.load.image('ground', 'Assets/platform.png');
    this.load.image('greenEnemy', 'Assets/green.png')
    this.load.image('redEnemy', 'Assets/red.png')
    this.load.image('yellowEnemy', 'Assets/yellow.png')
    this.load.image('bullet', 'Assets/laserBullet.png')
}

var score = 0;
var lives = 3;
var gameStarted = false;
var bullets;
var shootTime = 0;
function create ()
{
    scene = this;
    //Fondo
    this.add.image(0, 0, 'Fondo').setOrigin(0, 0);

    //Suelo
    platforms = this.physics.add.staticGroup();
    platforms.create(1000, 1030, 'ground').setScale(5).refreshBody();

    //Player
    player = this.physics.add.sprite(400, 820, 'nave');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //Colision con la plataforma
    this.physics.add.collider(player, platforms);

    //Input teclado
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    /* Esto lo sigo probando, segun la doc de phaser lo puedo usar para eliminar las balas
    //Borde de la pantalla para destruir las balas del jugador
    playerEdge = this.add.rectangle(0,0,800,10, 0x000).setOrigin(0);

    //Borde de la pantalla para destruir las balas del enemigo
    enemyEdge = this.add.rectangle(0,590,800,10, 0x000).setOrigin(0);

    //Borde de la pantalla para destruir la nave roja 
    shipEdge = this.add.rectangle(790,0,10,600, 0x000).setOrigin(0);

    //Añadiendo fisica a los bordes ¿? Lo vi en un video a ver que pasa
    scene.physics.add.existing(playerEdge);
    scene.physics.add.existing(enemyEdge);
    scene.physics.add.existing(shipEdge); */ 

    //Life text
    lifeText = this.add.text(650, 25, 'Vidas:' + lives, { color: '#FFFBFB',  fontSize: 20 });
    //Score text
    scoretext = this.add.text(16, 16, 'Puntaje:' + score, { color: '#FFFBFB',  fontSize: 20 });
    //Start text
    startText = this.add.text(280, 300, 'Click para empezar',  { color: '#FFFBFB',  fontSize: 25 });
    
    //Funcion para que al hacer click empiece el juego
    /*Si se usa E.isDown para empezar el juego solo desactiva el texto pero 
    el juego no empieza, creo que se debe a que solo funciona mientras la tecla este
    presionada, por lo que esta funcion es mas viable*/
    this.input.on('pointerdown', function () 
    {
        if (gameStarted == false) 
        {
            gameStarted = true;
            startText.destroy()
        }        
    });

    //Creando mis balas
    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(20,'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill',true);
    bullets.setAll('checkWorldBounds', true);

    var child = thiss.add.rectangle(x,y,30,20, 0x1ff56);
    new Rectangle(this.add.rectangle(x,y,30,20, 0x1ff56));
}

function update ()
{
    //Condicion para darle el movimiento al jugador
    if (gameStarted == true)
    {
        //Movimiento Jugador
        if (cursors.left.isDown || keyA.isDown)
        {
            player.setVelocityX(-200);
        }
        else if (cursors.right.isDown || keyD.isDown)
        {
            player.setVelocityX(200);
        }
        else if (keySpace.isDown)
        {
            this.shoot();
        }
        else
        {
            player.setVelocityX(0);
        }
    }
}
//¿Que hace el player? Se mueve, dispara a voluntad/cierto tiempo, muere
function shoot()
{
    var bullet;
    if (this.time.now > shootTime)
    {
        bullet = bullets.getFirstExists(false);
        if(bullet)
        {
            bullet.reset(player.x,player.y);
            bullet.body.velocity.y = -600;
            shootTime = this.time.now + 100;
        }
    }
}
function playerDie()
{

}

//¿Que hace el enemigo? Se mueve, dispara cada x tiempo, muere
function enemies()
{

}

//¿Que hace la nave? Aparece cada x tiempo, se va de la pantalla, muere
function ship()
{

}