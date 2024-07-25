class Custumer{
  _id: string;
  _name: string;
  _address: string = "";
  _active: boolean = true;

  constructor(id: string, name: string){
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate(){
    if(this._name === ""){
      throw new Error("Name is required");
    }

    if(this._id === ""){
      throw new Error("Id is required");
    }
  }

  set name(name: string){
    this._name = name;
  }

  changeName(name: string){
    this._name = name;
    this.validate();
  }

  activate(){
    if(this._address.length === 0){
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }
  
  deactivate(){
    this._active = false;
  }

}