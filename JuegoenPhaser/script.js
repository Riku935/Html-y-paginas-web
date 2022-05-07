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

function preload ()
{
    this.load.image('Fondo', 'Assets/bg2.jpg');
    this.load.image('Player', 'Assets/player.png');
    this.load.image('Bullet', 'Assets/bullet2.png');
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
    this.Group_Enemy = this.add.group({runChildUpdate: true});
}

function update (time, delta)
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
    //Reinicia la capacidad de disparar del jugador
    if(cursors.space.isUp)
    {   
        playerTimeShoot = 1;
    }

    //Destruye las balas que salen del limite y reinicia el contador para poder volver a disparar
    if(bullet1 == 1)
    {
        bala1.y-= 5;
        if(bala1.y < 225)
        {
            bala1.destroy();
            bullet1 = 0;
            bulletQuantity --;
        }
    }
    if(bullet2 == 1)
    {
        bala2.y-= 5;
        if(bala2.y < 225)
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


    //Enemigos
    this.Group_Enemy = this.add.group({runChildUpdate:true})
    var origenX = 150;
    var origenY = 50;

    this.Group_Enemy.add(enemy = new Enemy(this, origenX, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 2, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 3, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 4, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 5, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 6, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 7, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 8, origenY, 'invader1'));
    this.Group_Enemy.add(enemy = new Enemy(this, origenX+50 * 9, origenY, 'invader1'));
}

class Enemy extends Phaser.GameObjects.Sprite 
{
    constructor (scene, x, y, sprite)
    {
        super(scene,x ,y,sprite).setOrigin(0.5, 0.5);
        scene.add.existing(this);
    }
}
