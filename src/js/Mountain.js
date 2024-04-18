export class Mountain {
    id
    name
    game
    details
    imgPath
    height
    climate
    constructor(id, name, game, details, imgPath, height, climate){
        this.id = id
        this.name = name
        this.game = game
        this.details = details
        this.imgPath = imgPath
        this.height = height
        this.climate = climate
    }

    toJson(){
        return JSON.stringify(this);
    }
}