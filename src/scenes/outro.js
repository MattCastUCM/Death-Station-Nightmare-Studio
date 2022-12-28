import LEVEL_BASE from './LEVEL_BASE.js';

/**
 * Escenas introductorias
 * @extends LEVEL_BASE
 */

export default class outro extends LEVEL_BASE {
	constructor() {
		let nextlevel = "menu";
		super("outro", nextlevel, '', '', 560, true);
	}

	// Creación de los elementos de la escena
	create() {
	
		this.cameras.main.fadeIn(500, 255 ,255, 255);
		this.img=this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'outro1');
		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');
		this.scene.sleep(this.hud);
        
		// SoundManager
		this.soundManager = this.scene.get('soundManager');
        
		// DialogManager
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');
        
        this.actualEvent=0;
        this.eventFinished=false;
        this.soundManager.play("sudden")
		this.soundManager.playBGM("night");

        this.hud.events.on('dialogFinished',()=> {this.actualEvent++;this.eventFinished=false;}); 
	}

	// Secuencia de eventos marcados por tiempo
	update(t, dt) {
        if( this.actualEvent==0 && ! this.eventFinished ){
            this.eventFinished=true;
			setTimeout( ()=>{
                
                this.newText(["!!!!"]);
			}, 500);
		}

		else if(this.actualEvent==1 && !this.eventFinished){
            this.eventFinished=true;
            setTimeout( ()=>{
               
				this.cameras.main.fadeOut(200, 0, 0, 0);
				setTimeout( ()=>{
					this.cameras.main.fadeIn(200,0,0,0);
                    setTimeout( ()=>{
                        
                       this.cameras.main.fadeOut(200, 0, 0, 0);
                        setTimeout( ()=>{
                          this.cameras.main.fadeIn(200,0,0,0);
                            setTimeout( ()=>{this.actualEvent++;}, 1200);
                        }, 1000);
                    }, 500);
				}, 1000);
            }, 500);
			
		}
		else if(this.actualEvent==2 ){
			this.newText(["....¿Dónde estoy?"]);
		}
        else if(this.actualEvent==3 && !this.eventFinished){
            this.eventFinished=true;
			setTimeout( ()=>{
                this.img.setTexture('outro2');

				setTimeout( ()=>{
                    this.img.setTexture('outro3');
					setTimeout( ()=>{
                        this.actualEvent++;this.eventFinished=false;
                        this.img.setTexture( 'outro1');
                    }, 1500);
				}, 1000);
			}, 500);
		}
        else if(this.actualEvent==4 && !this.eventFinished){
            this.eventFinished=true;
			this.newText(["¿Estoy en mi habitación?","...............",".....Entonces","¿Todo lo de antes era un sueño?"]);
            
		}
        else if(this.actualEvent==5 && !this.eventFinished){
            this.eventFinished=true;
            setTimeout( ()=>{
                this.newText([".........."]);
            }, 1000);
        }
        else if(this.actualEvent==6 && !this.eventFinished){
            this.eventFinished=true;
            setTimeout( ()=>{
                this.soundManager.stopBGM("night")
                this.img.setTexture('outro4');
                this.soundManager.playWithListener("cat1", ()=>{ 
                    this.img.setTexture('outro5');
                    this.newText(["......??!!"]);
                    this.soundManager.play("terror")});
            
            }, 2000);
        
        }
        else if(this.actualEvent>6 &&!this.eventFinished){
            this.eventFinished=true;
            setTimeout( ()=>{
                this.cameras.main.fadeOut(200, 0, 0, 0);
                setTimeout( ()=>{
                this.scene.start('menu');
                }, 2000);
            }, 500);
        
        }


	}

	newText(text) {
		this.dialogManager.initDialog(text);
	}
}
