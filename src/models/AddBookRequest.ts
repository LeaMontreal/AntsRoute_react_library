export default class AddBookRequest{
    constructor(
        public title: string,
        public author: string,
        public description: string,
        public copies: number,
        public category: string,
        public img?: string
    ){}
};