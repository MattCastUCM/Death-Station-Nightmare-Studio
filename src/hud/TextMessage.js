export default class TextMessage extends Phaser.GameObjects.Container {
  /**
 * 
 * @param {Phaser.Scene} scene - Escena a la que pertenece. 
 * @param {number} x - Posicion en x. 
 * @param {number} y - Posicion en y.
 * @param {number} width - Ancho.
 * @param {number} height - Alto.
 * @param {boolean} onComplete -si ha terminado la frase
 */
  constructor(scene, dialogManager, x, y, width,message) {
    super(scene, x, y);
    this.scene=scene;
    this.width = width;
    this.x = x;
    this.y = y;
    // this.initContainer(inter, width, height);

    //Variables para gestionar la escritura del diálogo

    this.dialogManager = dialogManager;
    this.contChar = 0; //para contar los characters escritas
    this.Message = message; 
    this.actWritten="";//las letras escritas de momento
    this.delay = 0; //contador para hacer paradas entre char
    this.finished = false;
    this.textSpeed = 100;

    //Creación del texto
    this.createText();
    this.scene.add.existing(this); //añadir a la escena para poder activar el preupdate
    //this.scene.add.existing(this.text);
  }
  /**
   * Resetea las variables de estado del cuadro de diálogo y cambia su texto al del nodo actual del dialog manager.
   */

  reset() {
    //this.Message = '';
    this.contChar = 0;
    this.delay = 0;
    this.finished = false;
    this.actWritten="";
  }


  /**
   * Inicializar las propiedades del texto del cuadro de dialogo
   * @returns {Phaser.GameObjects.Text} - El texto del cuadro de dialogo
   */
  createText() {
    let spacing = 20;
  //  this.text = new Phaser.GameObjects.Text(this.scene, this.x, this.y, '');
  
    this.text = this.scene.add.text(this.x, this.y, "",{ 
      font: 'bold 20px "Press Start 2P"' ,   
      color: "#000000",
    
    });
    this.text.setWordWrapWidth(this.width - 20 * 2);
  

    // //
    // this.text.setFont('Press Start 2P');
    // this.text.setFontSize(400);
    // this.text.setColor('#000');
    //this.text.anchor.setTo(0.5, 0.5);
    // this.scene.add.existing(this.text);
  }


  onMessageFinished() {
    if (this.dialogManager.NextParagraph()) {
     // this.finished = false;
      this.reset();
      //this.activate = true;
    }
  }

  setNewMessage(newMessage) {
    this.Message = newMessage;
  }


  preUpdate(t, dt) {
  //   this.input.once('pointerdown', function () {

  //     //  You can set the text proprety directly like this:
  //     title.text = 'Hello world';

  //     //  Or use the setText method if you need method chaining:
  //     title.setText('Hello world');

  // });
    if (!this.finished) {
      //console.log(dt);
      if (this.delay <= 0) {
        if (this.contChar < this.Message.length) {
         
          this.actWritten += this.Message[this.contChar];
          this.text.setText(this.actWritten); //imprime el texto
          console.log(this.text);
          console.log(this.actWritten);
          this.contChar++;
         this.delay = 100 - this.textSpeed;
        } else {
          this.finished = true;
          this.activate = false;
          this.onMessageFinished();
        }
      } else this.delay -= dt;
    }
  }



}