<script lang="ts">
    import eye_base_svg from "$lib/images/eye.svg";
    import eye_center_svg from "$lib/images/eye_center.svg";
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';

    let enabled = false;
    let show_eye = false;
    let show_text = false;

    let eye_base: Element;
    let eye_center: Element;
    let eye_center_style = {
        width: 100,
        height: 100
    }

    $: eye_box_center = {x: 0, y: 0};

    function set_eyebox_center() {
        if(!eye_base) {
            return;
        }

        let eye_box = eye_base.getBoundingClientRect();

        eye_box_center = {
            x: ((eye_box.left + eye_box.right) / 2) - (eye_center_style.width / 2),
            y: ((eye_box.top + eye_box.bottom) / 2) - (eye_center_style.height / 2)
        };
    }

    function is_mouse_in_window(event: MouseEvent) {
        if (
            event.clientY <= 0
            || event.clientX <= 0
            || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)
        ) {
            return false;
        }
        return true;
    }

    export function handle_mouse_move(event: MouseEvent) {
        set_eyebox_center();

        if(!is_mouse_in_window(event)) {
            show_eye = false;
            return;
        }

        show_eye = true;

        // Calculate location towards the mouse
        let new_location = {
            x: eye_box_center.x + 0.2 * (event.clientX - eye_box_center.x),
            y: eye_box_center.y + 0.2 * (event.clientY - eye_box_center.y)
        }

        // Calculate distance between eye center and the eye ball
        let dx = new_location.x - eye_box_center.x;
        let dy = new_location.y - eye_box_center.y;
        let distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate the closest point in bounding circle
        let bounding_radius = 90;
        if(distance > bounding_radius) {
            new_location = {
                x: eye_box_center.x + dx / distance * bounding_radius,
                y: eye_box_center.y + dy / distance * bounding_radius
            }
        }

        eye_box_center = new_location;
    }

    onMount(() => {
        set_eyebox_center();
    });
</script>

<div id="eye-container" class="p-5">
    <a href="/">
        <img
            id="eye-base"
            bind:this={eye_base}
            src={eye_base_svg}
            alt="Eye"
        />
        {#if show_eye}
            <img
                id="eye-center"
                bind:this={eye_center}
                in:fade={{duration: 1000}}
                out:fade={{duration: 500}}
                src={eye_center_svg}
                style="
                    left: {eye_box_center.x}px;
                    top: {eye_box_center.y}px;
                    width: {eye_center_style.width}px;
                    height: {eye_center_style.height}px;
                "
                alt="Eye"
            />
        {/if}
    </a>
</div>

<style>
    #eye-center {
        height: 100%;
        position: absolute;
    }

    #eye-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        background-position: center;
    }
</style>