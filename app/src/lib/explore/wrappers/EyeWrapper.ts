import type EyeDisplay from "$lib/explore/displays/EyeDisplay.svelte";
import type { ExploreWrapper } from "../explore_wrapper";

export class EyeWrapper implements ExploreWrapper {
    display: EyeDisplay;
    description = 'The exploration section contains a series of blog entries and projects I have worked on, enjoy!';
    primary_title = 'Welcome visitor';
    secondary_title = 'Explore!';

    handle_mouse_move(event: MouseEvent) {
        this.display.handle_mouse_move(event);
    }
}
