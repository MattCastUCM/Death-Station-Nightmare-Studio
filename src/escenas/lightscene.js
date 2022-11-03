export default class lightlevel extends Phaser.Scene {

	constructor() {
		super({ key: 'lightlevel' });
	}l
	preload() {
		this.load.image('pik', 'assets/enviroment/taikodrummaster.jpg');
		this.load.image('mask','assets/enviroment/mask1.png');
	}

	create() {
		

        const pic=this.add.image(400, 300, 'pik');


        const spotlight = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: true
        });
        //spotlight.setScale(0.1);

       // pic.mask = new Phaser.Display.Masks.BitmapMask(this,spotlight);
        this.input.on('pointermove', function (pointer) {

            spotlight.x = pointer.x;
            spotlight.y = pointer.y;

        });
        //this.cameras.main.startFollow(personaje,this.cameras.FOLLOW_LOCKON, 0.1, 0.1);


		// const image = this.add.image(400, 300, 'fondo');

        // const shape = this.make.graphics();

        // //  Create a hash shape Graphics object
        // shape.fillStyle(0xffffff);

        // //  You have to begin a path for a Geometry mask to work
        // shape.beginPath();

        // shape.fillRect(50, 0, 50, 300);
        // shape.fillRect(175, 0, 50, 300);
        // shape.fillRect(0, 75, 275, 50);
        // shape.fillRect(0, 200, 275, 50);

        // const mask = shape.createGeometryMask();

        // image.setMask(mask);

        // this.input.on('pointermove', function (pointer) {

        //     shape.x = pointer.x - 140;
        //     shape.y = pointer.y - 140;

        // });
    }
}