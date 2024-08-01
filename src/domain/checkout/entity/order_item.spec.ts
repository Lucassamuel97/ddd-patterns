import Order from "./order";
import OrderItem from "./order_item";

describe("Order item unit tests", () => { 
    it("should throw error when id is empty", () => {
        expect(() => {
          let orderItem = new OrderItem("", "Item 1", 100, "p1", 2);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
          let orderItem = new OrderItem("i1", "", 100, "p1", 2);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is 0", () => {
        expect(() => {
          let orderItem = new OrderItem("i1", "Item 1", 0, "p1", 2);
        }).toThrowError("Price is required");
    });

    it("should calculate total", () => {
        let orderItem = new OrderItem("i1", "Item 1", 100, "p1", 2);
        expect(orderItem.total()).toBe(200);
    });
});