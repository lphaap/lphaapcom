<script lang="ts">
    import eye_base_svg from "$lib/images/eye.svg";
    import eye_center_svg from "$lib/images/eye_center.svg";
    import { onMount } from "svelte";
    import { spring } from 'svelte/motion';

    let eye_base: Element;
    let eye_center: Element;
    let eye_center_style = {
        width: 45,
        height: 45,
        visibility: "hidden"
    }

    $: eye_box_center = {x: 0, y: 0};

    function set_eyebox_center() {
        let eye_box = eye_base.getBoundingClientRect();

        eye_box_center = {
            x: ((eye_box.left + eye_box.right) / 2) - (eye_center_style.width / 2),
            y: ((eye_box.top + eye_box.bottom) / 2) - (eye_center_style.height / 2)
        };
    }

    export function eye_handler(event: MouseEvent) {
        set_eyebox_center();

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
        eye_center_style.visibility = "visible";
    });
</script>

<div id="eye-container">
    <a href="/">
        <img
            id="eye-base"
            bind:this={eye_base}
            src={eye_base_svg}
            alt="Eye"
        />
        <img
            id="eye-center"
            bind:this={eye_center}
            src={eye_center_svg}
            style="
                left: {eye_box_center.x}px;
                top: {eye_box_center.y}px;
                width: {eye_center_style.width}px;
                height: {eye_center_style.height}px;
                visibility: {eye_center_style.visibility};
            "
            alt="Eye"
        />
    </a>
</div>

<style>
    #eye-container {
        height: 35rem;
    }

    #eye {
        max-height: 100%;
    }

    #eye-center {
        max-height: 100%;
        position: absolute;
    }
</style>