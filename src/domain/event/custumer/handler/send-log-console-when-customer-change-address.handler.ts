import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-changed-address.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}`);
    }
}