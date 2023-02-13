import BookModel from "./BookModel"

export default class ShelfCurrentLoans {
    constructor(public book: BookModel, 
        public daysLeft: number){};
};