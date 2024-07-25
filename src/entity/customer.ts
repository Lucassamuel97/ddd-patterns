import Address from "./address";

export default class Custumer{
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;

  constructor(id: string, name: string){
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string{
    return this._name;
  }

  isActive(): boolean{
    return this._active;
  }

  validate(){
    if(this._id === ""){
      throw new Error("Id is required");
    }
    if(this._name === ""){
      throw new Error("Name is required");
    }
  }

  set name(name: string){
    this._name = name;
  }

  changeName(name: string){
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
  }

  activate(){
    if(this._address === undefined){
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }
  
  deactivate(){
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }
}