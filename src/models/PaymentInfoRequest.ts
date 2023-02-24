export default class PaymentInfoRequest{
    constructor(
        public amount: number,
        public currency: string,
        public receiptEmail: string){}
};