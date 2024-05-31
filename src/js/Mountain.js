export class Mountain {
    id
    name
    game
    details
    imgPath
    height
    climate

    static idGenerator = 0;

    constructor(id=null, name, game, details, imgPath, height, climate){
        this.id = id !== null ? id : idGenerator;
        this.name = name
        this.game = game
        this.details = details
        this.imgPath = imgPath
        this.height = height
        this.climate = climate

        Mountain.idGenerator ++;
    }

    toJson(){
        return JSON.stringify(this);
    }
}