class Enemy extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, sprite){
		super(scene, x, y, sprite).setOrigin(0.5, 0.5);
		scene.add.existing(this);
	}
	update(){
		var sLado; 
		var sAjuste;
		if(this.x<400){ 
			sLado = 1; 
			sAjuste = 0;
		} else{ 
			sLado = -1; 
			sAjuste = -400;
		}
		this.scale = (((this.x-200+sAjuste)/20)*(0.02*sLado))+1;
		
		if(contadorDerrota == 1 && (limiteBai+cuadro.y>410) ){ this.y += 5; }


		this.x = (cuadro.x - cuadroX) + this.x;
		this.y = (cuadro.y - cuadroY) + this.y;
		var distBala1;
		var distBala2;
		if(bullet1==1)
		{
			distBala1 = Phaser.Math.Distance.Between(bala1.x, bala1.y, this.x, this.y);
		}
		if(bullet2==1)
		{
			distBala2 = Phaser.Math.Distance.Between(bala2.x, bala2.y, this.x, this.y);
		}
		var enemyArrayX = Math.round( ((Math.floor(this.x) - Math.floor(cuadro.x))+225)/50 );
		var enemyArrayY = Math.round( (Math.floor(this.y) - Math.floor(cuadro.y))/50 );
		if(distBala1 < 25){ 
			this.destroy(); 
			array[enemyArrayY][enemyArrayX] = 0;
			bala1.destroy(); 
			bullet1 = -1; 
			bulletQuantity--;
			cuadroVel += 0.225;
			if(enemyArrayY == 0) { score += 30;  }
			if(enemyArrayY == 1) { score += 20;  }
			if(enemyArrayY >= 2) { score += 10;  }			
		}
		if(distBala2 < 25){ 
			this.destroy(); 
			array[enemyArrayY][enemyArrayX] = 0;
			bala2.destroy(); 
			bullet2 = -1; 
			bulletQuantity--;
			cuadroVel += 0.225;
			//Suma distintos valores al score dependiendo el enemigo al que se de
			if(enemyArrayY == 0) { score += 30;  }
			if(enemyArrayY == 1) { score += 20;  }
			if(enemyArrayY >= 2) { score += 10;  }			
		}
	}
}