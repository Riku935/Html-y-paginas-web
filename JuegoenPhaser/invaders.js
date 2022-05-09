class Enemy extends Phaser.GameObjects.Sprite 
{
    constructor (scene, x, y, sprite)
    {
        super(scene,x ,y,sprite).setOrigin(0.5, 0.5);
        scene.add.existing(this);
    }
    update()
    {
        cuadroX = cuadro.x;
        cuadroY = cuadro.y;
        if(cuadro.x > (400 - limiteDir)+ 400)
        {
            cuadroDir = -1; 
            cuadro.x = (400 - limiteDir)+ 400;
            //cuadro.y += 5;
        }
        if(cuadro.x < limiteEsq *- 1)
        {
            cuadroDir = 1; 
            cuadro.x = limiteEsq *- 1;
            //cuadro.y += 5;
        }
        cuadro.x += cuadroVel*cuadroDir;

        
        this.x = (cuadro.x - cuadroX) + this.x;
        this.y = (cuadro.y - cuadroY) + this.y;
        var distBala1;
        var distBala2;
        if(bullet1 == 1)
        {
            distBala1 = Phaser.Math.Distance.Between(bala1.x, bala1.y, this.x, this.y);
        }
        if(bullet2 == 1)
        {
            distBala2 = Phaser.Math.Distance.Between(bala2.x, bala2.y, this.x, this.y);
        }

        var enemyArrayX = ((Math.floor (this.x) - Math.floor( cuadro.x)) + 225)/50;
        var enemyArrayY = (Math.floor (this.y) - Math.floor ( cuadro.y)) /50;

        if(distBala1 < 50)
        {
            this.destroy();
            array[enemyArrayY][enemyArrayX] = 0;
            bala1.destroy();
            bullet1 = 0;
            bulletQuantity--;
            score += 10;
        }
        if(distBala2 < 50)
        {
            this.destroy();
            array[enemyArrayY][enemyArrayX] = 0;
            bala2.destroy();
            bullet2 = 0;
            bulletQuantity--;
            score += 10;
        }
    }
}