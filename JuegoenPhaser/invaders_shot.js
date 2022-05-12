class Invader_Shot extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, sprite)
  {
		super(scene, x, y, sprite).setOrigin(0.5, 0.5);
		scene.add.existing(this);
	}
	update(){
		enemyBullet = 1;
		this.y += 5;
		if(this.y > 450)
    { 
			this.destroy(); 
			enemyBullet = 0; 
		}
		var DistImpactoPlayer = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
		if(DistImpactoPlayer < 35)
    {
			lives--;
			livesString.x=520;
			playerVivo = 0;
			this.destroy();
			enemyBullet = 0;
		}
		if(contadorVictoria > 0)
    { 
				this.destroy();
				enemyBullet = 0;
		}
	}
}
