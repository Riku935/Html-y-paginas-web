
class Escudo extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, sprite){
		super(scene, x, y, sprite).setOrigin(0.5, 0.5);
		scene.add.existing(this);
	}
	update(){
		var DistLaser1;
		var DistLaser2;
		if(bullet1==1){
			DistLaser1 = Phaser.Math.Distance.Between(bala1.x, bala1.y, this.x, this.y);
		}
		if(bullet2==1){
			DistLaser2 = Phaser.Math.Distance.Between(bala2.x, bala2.y, this.x, this.y);
		}
		if(DistLaser1 < 20){ 
			this.destroy(); 
			bala1.destroy(); 
			bullet1 = -1; 
			bulletQuantity--;
		}
		if(DistLaser2 < 20){ 
			this.destroy(); 
			bala2.destroy(); 
			bullet2 = -1; 
			bulletQuantity--;
		}
		var DistEnemyLaser;
		if(bulletEnemigo==1){
			DistEnemyLaser = 
				Phaser.Math.Distance.Between(enemy_shot.x, enemy_shot.y, this.x, this.y);
		}
		if(DistEnemyLaser < 20){ 
			this.destroy(); 
			enemy_shot.destroy(); 
			bulletEnemigo = 0;
		}
		if(limiteBai+cuadro.y>this.y+20){
			this.destroy();
		}
	}
}