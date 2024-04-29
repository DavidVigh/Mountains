export class Page {
    id
    title
    description
    sections
    constructor(id, title, description, sections){
        this.id = id
        this.title = title
        this.description = description
        this.sections = sections
    }

    toJson(){
        return JSON.stringify(this);
    }
}