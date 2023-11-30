import type PaymentDisplay from "$lib/explore/displays/PaymentDisplay.svelte";
import type { ExploreWrapper } from "../explore_wrapper";

export class PaymentWrapper implements ExploreWrapper {
    display: PaymentDisplay;
    description = 'Payment solutions require a fast, yet secure backend. In Maksu-by-rahalaitos we solved this with typescript ran microservices and AWS VPCs. Learn more about this greenfield payment solution!';
    primary_title = 'Typescript Microservices';
    secondary_title = 'Development of Maksu';

    handle_mouse_move(event: MouseEvent) {
        return event;
    }
}
