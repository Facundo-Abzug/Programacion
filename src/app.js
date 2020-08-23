//const { Game } = require("phaser");

const config = {
    width: 1025,
    height: 510,
    parent: "container",
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    scene: {preload, create, update}
};

new Phaser.Game(config);

var Personaje;
var AtlasPj;
function preload(){
    //mapa
    this.load.image("Fondo", "assets/Mapa/Fondo.png");
    this.load.image("pared", "assets/Mapa/Pared.png"); 
    this.load.tilemapTiledJSON('mapa1', 'assets/Mapa/Mapa1.json');
    this.load.tilemapTiledJSON('mapa2', 'assets/Mapa/Mapa2.json');

    //personaje
    this.load.atlas('Personaje', 'assets/Personaje/atlas_personaje.png','assets/Personaje/atlas_personaje_atlas.json');
    this.load.atlas("AnimPersonaje", "assets/Personaje/atlas_personaje.png", "assets/Personaje/atlas_personaje_anim.json")
}

function create(){
    //MAPA
    const backgroundImage = this.add.image(0,0, "Fondo").setScale(7, 2);

    const map = this.make.tilemap({ key: 'mapa1' });

    const tileset = map.addTilesetImage('Pared', 'pared');

    const Paredes = map.createStaticLayer('Pared', tileset, 0, 0);

    Paredes.setCollisionByExclusion(-1, true);


    //PERSONAJE
    AtlasPj = this.textures.get("Personaje");
    var frames = AtlasPj.getFrameNames();

    Personaje = this.physics.add.sprite(528, 400, AtlasPj, frames[3]);
    this.physics.add.collider(Personaje, Paredes);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'arribaAnim',
        frames: [
            { key: "Personaje",frame:"arriba1" },
            { key: "Personaje",frame:"arriba2" },
            { key: "Personaje",frame:"arriba3" },
        ],
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'abajoAnim',
        frames: [
            { key: "Personaje",frame:"abajo1" },
            { key: "Personaje",frame:"abajo2" },
            { key: "Personaje",frame:"abajo3" },
        ],
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'izquierdaAnim',
        frames: [
            { key: "Personaje",frame:"izquierda1" },
            { key: "Personaje",frame:"izquierda2" },
            { key: "Personaje",frame:"izquierda3" },
        ],
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'derechaAnim',
        frames: [
            { key: "Personaje",frame:"derecha1" },
            { key: "Personaje",frame:"derecha2" },
            { key: "Personaje",frame:"derecha3" },
        ],
        frameRate: 8,
        repeat: -1
    });
}

function update(){
    if(this.cursors.up.isDown){
        Personaje.setVelocityY(-220);
        Personaje.play("arribaAnim");
    }else if(this.cursors.down.isDown){
        Personaje.setVelocityY(220);
        Personaje.play("abajoAnim");
    }else if(this.cursors.left.isDown){
        Personaje.setVelocityX(-220);
        Personaje.play("izquierdaAnim");
    }else if(this.cursors.right.isDown){
        Personaje.setVelocityX(220);
        Personaje.play("derechaAnim");
    };    
}