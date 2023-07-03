<script lang="ts">
    import { fade } from 'svelte/transition';
    import { spring } from 'svelte/motion';

    export function expand() {
        handle_hover_size_change(60)
    }

    export function shrink() {
        handle_hover_size_change(14)
    }

    function handle_hover_size_change(size: number) {
        if (
            $tracker_size.w === size &&
            $tracker_size.h === size
        ) {
            return
        }
        tracker_size.set({ w: size, h: size })
    }

    export function handle_mouse_move(event: MouseEvent) {
        tracker_location.set(
            {
                x: event.clientX,
                y: event.clientY
            }
        )
        visible = is_mouse_in_window(event)
    }

    function is_mouse_in_window(event: MouseEvent) {
        if (
            event.clientX >= (window.innerWidth - 20) ||
            event.clientY >= (window.innerHeight - 20)||
            event.clientX <= 10 ||
            event.clientY <= 10
        ) {
            return false;
        }

        return true;
    }

    let tracker_location = spring(
        {
            x: 0,
            y: 0
        },
        {
            stiffness: 0.1,
            damping: 0.25
        }
    );

    let tracker_size = spring(
        {
            w: 14,
            h: 14
        },
        {
            damping: 1.5
        }
    );

    $: tracker_cordinates = {
        x: $tracker_location.x - $tracker_size.w / 2,
        y: $tracker_location.y - $tracker_size.h / 2
    }

    let visible = false
    $: tracker_visibility = visible ? 'block' : 'hidden'

</script>

{#if visible}
    <div
        in:fade={{duration: 500}}
        out:fade={{duration: 500}}
        id="mouse-tracker"
        style="
            left: {tracker_cordinates.x}px;
            top: {tracker_cordinates.y}px;
            width: {$tracker_size.w}px;
            height: {$tracker_size.h}px;
        "
        class="
            {tracker_visibility}
            rounded-full
            bg-white
            absolute
            pointer-events-none
            mix-blend-difference
            z-50
        "
    />
{/if}
