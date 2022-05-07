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

function preload ()
{
    this.load.image('Fondo', 'Assets/bg2.jpg');
    this.load.image('Player', 'Assets/player.png');
    this.load.image('Bullet', 'Assets/bullet2.png');
}


function create ()
{    
    //Fondo
    this.add.image(0, 0, 'Fondo').setOrigin(0, 0);

    //Player
    player = this.add.image(400,570, 'Player').setOrigin(0.5,1);

    //Input
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    //Controles del jugador
    if(cursors.left.isDown)
    {   
        player.x -= 5;
    }
    if(cursors.right.isDown)
    {   
        player.x += 5;
    }
    if (cursors.space.isDown && playerTimeShoot == 1)
    {
        bala = this.add.image(player.x, player.y, 'Bullet').setOrigin(0.5,0.25);
        playerTimeShoot = 0;
    }
    if(cursors.space.isUp)
    {   
        playerTimeShoot = 1;
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
}
