
export class User {
    
    public name: string;
    public email: string;
    public uid: string;

    constructor( obj: dataObj ) {
        this.name = obj && obj.name || null;
        this.email = obj && obj.email || null;
        this.uid =  obj && obj.uid   || null;
    }
}

interface dataObj {
    uid: string;
    email: string;
    name: string;
}
