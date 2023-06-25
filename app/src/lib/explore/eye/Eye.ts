import type EyeMain from "$lib/explore/eye/eye_display.svelte";

export default class Eye {
    display: EyeMain;   

    on_mouse_move(event: MouseEvent) {
        this.display.handle_mouse_move(event);
    }
}