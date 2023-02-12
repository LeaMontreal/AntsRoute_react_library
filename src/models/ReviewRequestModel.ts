export default class ReviewRequestModel {
    constructor(public rating: number, 
        public bookId: number, 
        public reviewDescription?: string){}
};