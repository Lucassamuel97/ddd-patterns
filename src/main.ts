import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

//Agregado ID
let customer = new Customer("123", "Samuca teste");
const address = new Address("Rua teste", 56, "852700000", "Palmital");
customer.Address = address;

// Agregado objeto -> Entidade
const item1 = new OrderItem("1", "Item 1", 10, "1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "2", 3);
const order = new Order("1", "123", [item1, item2]);

