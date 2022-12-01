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
  constructor(scene, x, y, width, message) {
    super(scene, x, y);
    this.scene = scene; //DialogManager
    this.width = width;
    this.x = x;
    this.y = y;
    this.Message = message; //mensaje completo a imprimir

    this.createText(); //Creación del texto
    this.scene.add.existing(this); //añadir a la escena para poder activar el preupdate
  }

  /*
   * Resetea las variables de estado del cuadro de diálogo y cambia su texto al del nodo actual del dialog manager.
   */
  reset() {
    this.contChar = 0;
    this.delay = 0;
    this.finished = false;
    this.actWritten = "";
    this.text.setText(this.actWritten); 
  }


  /*
   * Inicializar las propiedades del texto del cuadro de dialogo
   */
  createText() {
    //Variables para gestionar la escritura del diálogo
    this.contChar = 0; //para contar los characters escritas
    this.actWritten = "";//las letras escritas de momento
    this.delay = 0; //contador para hacer paradas entre char
    this.finished = false; //informa si un mensaje ya se ha terminado de imprimir
    this.textSpeed = 100; //velocidad al imprimir el texto, en ms

    //crear objeto texto
    this.text = this.scene.add.text(this.x,this.y , "", {

      fontFamily:'VT323',fontSize:26,color:'#454545'

    });

    this.text.setWordWrapWidth(this.width - 20 * 2);
  }

  /*
  Al terminar todo los mensajes,se destruye
  */
  onMessageFinished() {
    this.text.destroy(); this.destroy() ;
  }

  /*
  Llamado por DialogManager para recibir el siguiente mensaje a imprimir
  */
  setNewMessage(newMessage) {
    this.reset();
    this.Message = newMessage;
  }

  preUpdate(t, dt) {
    if (!this.finished) {
      if (this.delay <= 0) {
        if (this.contChar < this.Message.length) {

          this.actWritten += this.Message[this.contChar];
          this.text.setText(this.actWritten); //imprime el texto

          this.contChar++;
          this.delay = 100 - this.textSpeed;
        } else {
          this.finished = true;
        }
      } else this.delay -= dt; //esperando en s para imprimir el sig char
    }
  }



}