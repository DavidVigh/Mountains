export class Mountain {
    id
    name
    game
    details
    imgPath
    height
    constructor(id, name, game, details, imgPath, height){
        this.id = id
        this.name = name
        this.game = game
        this.details = details
        this.imgPath = imgPath
        this.height = height
    }

    toJson(){
        return JSON.stringify(this);
    }
}