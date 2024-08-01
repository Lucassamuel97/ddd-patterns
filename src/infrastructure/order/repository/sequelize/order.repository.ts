import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      // Itens atuais salvos no banco
      const currentItems = await OrderItemModel.findAll({
        where: { order_id: entity.id },
        transaction
      });

      // Itens que foram enviados na requesição
      const newItems = entity.items;

      // Atualiza dados dos itens que foram enviados e cria novos itens
      for (const newItem of newItems) {
        const currentItem = currentItems.find((item) => item.id === newItem.id);
        if (currentItem) {
          // Atualiza o item existente
          await OrderItemModel.update(
            {
              name: newItem.name,
              price: newItem.price,
              product_id: newItem.productId,
              quantity: newItem.quantity,
            },
            {
              where: { id: currentItem.id },
              transaction,
            }
          );
        } else {
          // Cria um novo item
          await OrderItemModel.create(
            {
              id: newItem.id,
              name: newItem.name,
              price: newItem.price,
              product_id: newItem.productId,
              quantity: newItem.quantity,
              order_id: entity.id,
            },
            {
              transaction,
            }
          );
        }
      }

      // Itens que foram removidos
      const removedItems = currentItems.filter(
        (currentItem) => !newItems.some((newItem) => newItem.id === currentItem.id)
      );

      if (removedItems.length > 0) {
        for (const removedItem of removedItems) {
          await OrderItemModel.destroy({
            where: { id: removedItem.id },
            transaction,
          });
        }
      }

      // Atualiza o OrderModel
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating Order");
    }
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel, as: "items" }],
      });

      const items: OrderItem[] = orderModel.items.map((item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      );

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        items
      );
    } catch (error) {
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
    });

    return orderModels.map(orderModel => {
      const items = orderModel.items.map(item =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      );

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        items
      );
    });
  }
  async delete(id: string): Promise<void> {
    try {
      await OrderModel.destroy({ where: { id } });
    } catch (error) {
      throw new Error("Error deleting Order");
    }
  }
}


