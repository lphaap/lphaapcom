import type BrokerDisplay from "$lib/explore/displays/BrokerDisplay.svelte";
import type { ExploreWrapper } from "../explore_wrapper";

export class BrokerWrapper implements ExploreWrapper {
    display: BrokerDisplay;
    description = 'Fintech is a unique field tasked with effective customer service and API solutions. My journey in fintech started with the development of the loan brokering solution omalaina.fi';
    primary_title = 'PHP Loan brokering';
    secondary_title = 'Omalaina.fi Development';

    handle_mouse_move(event: MouseEvent) {
        return event;
    }
}
