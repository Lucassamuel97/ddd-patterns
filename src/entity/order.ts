import OrderItem from "./order_item";

export default class Order{

    _id: string;
    _customerId: string;
    _items: OrderItem[] = [];
    _total: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    validate(){
        if(this._id === ""){
            throw new Error("Id is required");
        }

        if(this._customerId === ""){
            throw new Error("Customer Id is required");
        }
    }

    set total(total: number){
        this._total = total;
    }

    get total(){
        return this._total;
    }

}