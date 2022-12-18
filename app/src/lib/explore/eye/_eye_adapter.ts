import type EyeMain from "$lib/explore/eye/_eye_main.svelte";
import type EyeBottom from "$lib/explore/eye/_eye_bottom.svelte";
import type EyeRight from "$lib/explore/eye/_eye_right.svelte";

export default class EyeAdapter {
    right: EyeRight;
    bottom: EyeBottom;
    main: EyeMain;

    on_rotate_enter() {
        this.disable_components();
    }

    on_rotate_exit() {
        this.enable_components();
    }

    on_navigation_hover(event: Event) {
        this.bottom.handle_button_hover(event);
    }

    on_navigation_exit(event: Event) {
        this.bottom.handle_button_exit(event);
    }

    on_mouse_move(event: MouseEvent) {
        this.main.handle_mouse_move(event);
    }

    disable_components() {
        this.right.disable_component();
        this.bottom.disable_component();
        this.main.disable_component();
    }

    enable_components() {
        this.right.enable_component();
        this.bottom.enable_component();
        this.main.enable_component();
    }
}