import type BrokerDisplay from "$lib/explore/displays/BrokerDisplay.svelte";
import type { ExploreWrapper } from "../explore_wrapper";

export class BrokerWrapper implements ExploreWrapper {
    display: BrokerDisplay;
    description = 'The exploration section contains a series of blog entries and projects I have worked on, enjoy!';
    primary_title = 'PHP Loan brokering';
    secondary_title = 'Development of Omalaina.fi';

    handle_mouse_move(event: MouseEvent) {
        return event;
    }
}
