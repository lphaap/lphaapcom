<script lang="ts">
    import arrow_left from "$lib/images/tail_arrow_up.svg";
    import arrow_right from "$lib/images/tail_arrow_up.svg";
    import arrow_tail_up from "$lib/images/tail_arrow_up.svg";
    import rotate_shape from "$lib/images/rotate_shape.svg";
    import EyeMain from "$lib/explore/eye/_eye_main.svelte";
    import EyeBottom from "$lib/explore/eye/_eye_bottom.svelte";
    import EyeRight from "$lib/explore/eye/_eye_right.svelte";
    import EyeAdapter from "$lib/explore/eye/_eye_adapter";
    import { spring } from 'svelte/motion';
    import { onMount } from "svelte";

    type NumberDict = {
        [key: string]: any
    }

    const nav_arrow_left_pos = spring(40);
    const nav_arrow_right_pos = spring(40);
    const rotate_shape_deg = spring(-45);


    let current_mode = 0;
    let eye_adapter = new EyeAdapter();
    const modes = [
        eye_adapter,
    ];

    function swap_mode(increment: number) {
        const available_mode_count = Object.keys(modes).length;
        const next_mode = Math.min(
            Math.max((current_mode + increment), 0),
            available_mode_count
        );

        modes[current_mode].disable_components();
        modes[next_mode].enable_components();
        current_mode = next_mode;
    }

    function on_mouse_move(event: MouseEvent) {
        if(typeof modes[current_mode].on_mouse_move === 'function') {
            modes[current_mode].on_mouse_move(event);
        }
    }

    function on_navigation_hover(event: Event) {
        if(typeof modes[current_mode].on_navigation_hover === 'function') {
            modes[current_mode].on_navigation_hover(event);
        }
    }

    function on_navigation_exit(event: Event) {
        if(typeof modes[current_mode].on_navigation_exit === 'function') {
            modes[current_mode].on_navigation_exit(event);
        }
    }

    function on_rotate_enter() {
        if(typeof modes[current_mode].on_rotate_enter === 'function') {
            modes[current_mode].on_rotate_enter();
        }
    }

    function on_rotate_exit() {
        if(typeof modes[current_mode].on_rotate_exit === 'function') {
            modes[current_mode].on_rotate_exit();
        }
    }

    onMount(() => {
        modes[current_mode].enable_components();
    });
</script>

<svelte:head>
	<title>lphaap.com</title>
</svelte:head>

<svelte:window on:mousemove={on_mouse_move} />

<div id="screen-container" class="h-screen">
    <div
        id="main-container"
        class="grid grid-cols-6 grid-rows-10"
    >
        <div class="col-span-2 row-span-1 border border-r-0 border-pink-500 border-1">
        </div>
        <div class="col-span-2 row-span-1 border border-r-0 border-pink-500 border-1">
        </div>
        <div class="col-span-1 row-span-1 border border-r-0 border-pink-500 border-1">
        </div>
        <div class="col-span-1 row-span-1 border border-pink-500 border-1">
        </div>

        <div class="border border-pink-500 border-t-0 col-span-4 row-span-6" id="main-block">
            <EyeMain bind:this={eye_adapter.main}></EyeMain>
        </div>

        <div class="border-b border-pink-500 col-span-2 row-span-6" id="right-block">
            <EyeRight bind:this={eye_adapter.right}></EyeRight>
        </div>

        <div class="col-span-3 row-span-3" id="bottom-block">
            <EyeBottom bind:this={eye_adapter.bottom}></EyeBottom>
        </div>

        <div class="col-span-1 row-span-3">
            <div id="rotate-shape-container">
                <img
                    id="rotate-shape"
                    src="{rotate_shape}"
                    style="transform: rotate({$rotate_shape_deg}deg);"
                    alt="Rotating menu shape"
                    on:mouseover={() => {
                        rotate_shape_deg.set(90);
                        on_rotate_enter();
                    }}
                    on:mouseleave={() => {
                        rotate_shape_deg.set(-45);
                        on_rotate_exit();
                    }}
                    on:focus
                />
            </div>
        </div>

        <div
            on:focus
            on:mouseover={on_navigation_hover}
            on:mouseleave={on_navigation_exit}
            class="border border-pink-500 border-t-0 col-span-1 row-span-3"
        >
            <div
                id="arrow-container-left"
                class="arrow-container hover:shadow-[inset_0_3px_6px_0] hover:shadow-pink-500"
                on:mouseover={() => {nav_arrow_left_pos.set(25);}}
                on:mouseleave={() => {nav_arrow_left_pos.set(40);}}
                on:click={() => {swap_mode(-1);}}
                on:focus
            >
                <img
                    class="nav-arrow"
                    id="nav-arrow-left"
                    src="{arrow_tail_up}"
                    style="left: {$nav_arrow_left_pos}%; transform: rotate(-90deg);"
                    alt="Navigation arrow left"
                />
            </div>
        </div>

        <div
            on:focus
            on:mouseover={on_navigation_hover}
            on:mouseleave={on_navigation_exit}
            class="border border-pink-500 border-t-0 col-span-1 row-span-3"
        >
            <div
                id="arrow-container-right"
                class="arrow-container hover:shadow-[inset_0_3px_6px_0] hover:shadow-pink-500"
                on:mouseover={() => {nav_arrow_right_pos.set(25);}}
                on:mouseleave={() => {nav_arrow_right_pos.set(40);}}
                on:click={() => {swap_mode(1);}}
                on:focus
            >
                <img
                    class="nav-arrow"
                    id="nav-arrow-right"
                    src="{arrow_tail_up}"
                    style="right: {$nav_arrow_right_pos}%; transform: rotate(90deg);"
                    alt="Navigation arrow right"
                />
            </div>
        </div>
    </div>
</div>

<style>
    #screen-container {
        font-family: 'Trispace';
        font-weight: 300;
    }

    #screen-container {
        background-color: black;
    }

    #main-container {
        height: 100%;
    }

    #rotate-shape-container {
        height: 100%;
        width: 100%;
        position: relative;
        cursor: pointer;
    }

    #rotate-shape {
        position: absolute;
        right: 38%;
        top: 42%;
    }

    .arrow-container {
        height: 100%;
        width: 100%;
        position: relative;
        cursor: pointer;
    }

    .nav-arrow {
        top: 40%;
        position: absolute;
    }

</style>