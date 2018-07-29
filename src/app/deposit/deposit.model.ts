
export class Deposit {
    description: string;
    acount: number;
    type: string;
    uid?: string;

    constructor( obj: any ) {
        this.description = obj && obj.description || null;
        this.acount = obj && obj.acount || null;
        this.type = obj && obj.type || null;
        // this.uid = obj && obj.uid || null;
    }
}
