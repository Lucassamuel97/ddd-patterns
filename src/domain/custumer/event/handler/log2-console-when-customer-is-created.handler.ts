import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreatedEvent } from "../custumer-created.event";

export class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}