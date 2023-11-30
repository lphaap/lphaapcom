import type EyeDisplay from "$lib/explore/displays/EyeDisplay.svelte";
import type { ExploreWrapper } from "../explore_wrapper";

export class EyeWrapper implements ExploreWrapper {
    display: EyeDisplay;
    description = 'The exploration section contains glimpses into my journey as a software developer, enjoy and explore!';
    primary_title = 'Welcome visitor';
    secondary_title = 'Explore!';

    handle_mouse_move(event: MouseEvent) {
        this.display.handle_mouse_move(event);
    }
}
