class Invader_Shot extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, sprite)
  {
		super(scene, x, y, sprite).setOrigin(0.5, 0.5);
		scene.add.existing(this);
	}
	update(){
		bulletEnemigo = 1;
		this.y += 5;
		if(this.y > 450)
    { 
			this.destroy(); 
			bulletEnemigo = 0; 
		}
		var DistImpactoPlayer = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
		if(DistImpactoPlayer < 35)
    {
			lives--;
			playerVivo = 0;
			this.destroy();
			bulletEnemigo = 0;
		}
		if(contadorVictoria > 0)
    { 
				this.destroy();
				bulletEnemigo = 0;
		}
	}
}
