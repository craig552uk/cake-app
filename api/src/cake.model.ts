import { BadRequest } from 'http-errors';

export class Cake {

    id!: number;
    name!: string;
    comment!: string;
    imageUrl!: string;
    yumFactor!: number;

    constructor(cake: Partial<Cake>) {
        this.id = cake.id ? cake.id : 0;
        this.name = cake.name ? cake.name : '';
        this.comment = cake.comment ? cake.comment : '';
        this.imageUrl = cake.imageUrl ? cake.imageUrl : '';
        this.yumFactor = cake.yumFactor ? cake.yumFactor : 0;
    }

    /**
     * Validate this instance
     */
    validate(): boolean {
        if ( this.id == undefined ) { throw new BadRequest('Cake id is required'); }
        if ( !Number.isInteger(this.id) ) { throw new BadRequest('Cake id must be numeric'); }

        if ( !this.name ) { throw new BadRequest('Cake name is required'); }
        if ( this.name.length === 0 ) { throw new BadRequest('Cake name is required'); }

        if ( !this.comment ) { throw new BadRequest('Cake comment is required'); }
        if ( this.comment.length < 5 ) { throw new BadRequest('Cake comment must be greater than 5 characters'); }
        if ( this.comment.length > 200 ) { throw new BadRequest('Cake comment must be less than 200 characters'); }

        if ( !this.imageUrl ) { throw new BadRequest('Cake image URL s required'); }

        if ( !this.yumFactor ) { throw new BadRequest('Cake yum factor is required'); }
        if ( !Number.isInteger(this.yumFactor) ) { throw new BadRequest('Cake yum factor must be numeric'); }
        if ( this.yumFactor < 1 ) { throw new BadRequest('Cake yum factor must be between 1 and 5'); }
        if ( this.yumFactor > 5 ) { throw new BadRequest('Cake yum factor must be between 1 and 5'); }

        return true;
    }
}
