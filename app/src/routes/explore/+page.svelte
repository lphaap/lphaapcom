<script lang="ts">
    import arrow_tail_up from "$lib/images/tail_arrow_up.svg";
    import rotate_shape from "$lib/images/rotate_shape.svg";
    import github_logo from "$lib/images/github.svg";
    import linkedin_logo from "$lib/images/linkedin.svg";
    import EyeDisplay from "$lib/explore/eye/EyeDisplay.svelte";
    import * as Wrappers from "$lib/explore/";
    import { spring } from 'svelte/motion';
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import type { ExploreWrapper } from "$lib/explore/explore_wrapper";
    import MouseTracker from "$lib/MouseTracker.svelte";

    const nav_arrow_left_pos = spring(40);
    const nav_arrow_right_pos = spring(40);
    const rotate_shape_deg = spring(-45);

    let text_display = true

    let mouse_tracker: MouseTracker

    let current_wrapper: any;
    const eye_wrapper = new Wrappers.EyeWrapper();
    const modes: ExploreWrapper[] = [
        eye_wrapper,
    ];

    current_wrapper = modes[0]

    function swap_display(increment: number) {
        const available_mode_count = Object.keys(modes).length;
        const current_mode = modes.findIndex(current_wrapper)
        const next_mode = Math.min(
            Math.max((current_mode + increment), 0),
            available_mode_count
        );

        current_wrapper = modes[next_mode];
    }

    function on_mouse_move(event: MouseEvent) {
        current_wrapper.handle_mouse_move(event);
        mouse_tracker.handle_mouse_move(event)
    }

    function on_bottom_box_enter() {
        text_display = false
        rotate_shape_deg.set(90);
        mouse_tracker.expand()
    }

    function on_bottom_box_exit() {
        text_display = true
        rotate_shape_deg.set(-45);
        mouse_tracker.shrink()
    }
</script>

<svelte:head>
	<title>Explore | lphaap.com</title>
</svelte:head>

<svelte:window on:mousemove={on_mouse_move} />

<div id="screen-container" class="h-screen bg-lphaap-dark-blue text-lphaap-dark-grey">

    <MouseTracker bind:this={mouse_tracker} />

    <div
        id="main-container"
        class="grid grid-cols-6 grid-rows-10 h-full"
    >
        <div class="
            col-span-2
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            flex-row
            items-center
            p-4
            text-white
        ">
            <a
                href="/"
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
            >
                <p id="logo" class="text-5xl">lphaap</p>
            </a>
        </div>
        <div class="
            col-span-2
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            flex-row
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="/wip"
                class="uppercase"
            >
                About
            </a>
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="/wip"
                class="uppercase"
            >
                Blog
            </a>
        </div>
        <div class="
            col-span-1
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="https://github.com/lphaap/"
                target="_blank"
            >
                <img id="github-logo" alt="Github logo" src="{github_logo}" />
            </a>
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="https://www.linkedin.com/in/lassi-haapala-527391263/"
                target="_blank"
            >
                <img id="linkedin-logo" alt="Linkedin logo" src="{linkedin_logo}" />
            </a>
        </div>
        <div class="
            col-span-1
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="mailto:lassi.p.haapala@gmail.com"
                class="uppercase"
            >
                Contact Me
            </a>
        </div>

        <div class="border border-lphaap-light-grey border-t-0 border-r-0 col-span-4 row-span-6" id="main-block">
            <EyeDisplay bind:this={eye_wrapper.display}></EyeDisplay>
        </div>

        <div
            class="
                border
                border-lphaap-light-grey
                border-t-0 col-span-2
                row-span-6
                h-90
                flex
                justify-center
                items-center
                w-full
            "
            id="right-block"
        >
            <div
                id="right-text-container"
                class="
                    flex
                    flex-col
                    justify-end
                    items-center
                    w-3/4
                    h-5/6
                "
            >
                <p>{current_wrapper.description}</p>
            </div>

            <style>
                #eye-right-text-container {
                    height: 20%;
                    width: 70%;
                    text-align: left;
                    font-size: 1.2rem;
                }
            </style>
        </div>

        <div
            class="
                col-span-4
                row-span-3
                flex
                flex-row
                items-center
                justify-between
                p-4
            "
            on:mousemove={() => mouse_tracker.expand()}
            on:mouseover={on_bottom_box_enter}
            on:mouseleave={on_bottom_box_exit}
            on:focus
        >
            <div class="w-1/3 text-center">
                {#if text_display}
                    <h1
                        class="text-7xl font-bold text-white uppercase"
                        in:fly={{ y: -25, duration: 600 }}
                    >
                        {current_wrapper.primary_title}
                    </h1>
                {:else}
                    <h1
                        class="text-7xl font-bold text-white uppercase"
                        in:fly={{ y: 25, duration: 600 }}
                    >
                        {current_wrapper.secondary_title}
                    </h1>
                {/if}
            </div>
            <div
                class="w-1/4 flex items-center justify-center"
                id="rotate-shape-container"
            >
                <img
                    id="rotate-shape"
                    src="{rotate_shape}"
                    style="transform: rotate({$rotate_shape_deg}deg);"
                    alt="Rotating menu shape"
                />
            </div>
        </div>

        <div
            class="
                border
                border-lphaap-light-grey
                border-r-0
                border-t-0
                col-span-1
                row-span-3
                hover:bg-lphaap-light-grey/10
            "
        >
            <div
                id="arrow-container-left"
                class="arrow-container h-full w-full"
                on:mousemove={() => mouse_tracker.expand()}
                on:mouseover={() => {
                    nav_arrow_left_pos.set(25);
                    mouse_tracker.expand()
                }}
                on:mouseleave={() => {
                    nav_arrow_left_pos.set(40);
                    mouse_tracker.shrink()
                }}
                on:click={() => {swap_display(-1);}}
                on:keydown
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
            class="
                border
                border-lphaap-light-grey
                hover:bg-lphaap-light-grey/10
                border-t-0
                col-span-1
                row-span-3
            "
        >
            <div
                id="arrow-container-right"
                class="arrow-container h-full w-full"
                on:mousemove={() => mouse_tracker.expand()}
                on:mouseover={() => {
                    nav_arrow_right_pos.set(25);
                    mouse_tracker.expand()
                }}
                on:mouseleave={() => {
                    nav_arrow_right_pos.set(40);
                    mouse_tracker.shrink()
                }}
                on:click={() => {swap_display(1);}}
                on:keydown
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
    :global(body) {
		overflow: hidden;
	}

    #screen-container {
        font-family: 'Trispace';
        font-weight: 300;
    }

    #logo {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
    }

    .arrow-container {
        position: relative;
        cursor: pointer;
    }

    .nav-arrow {
        top: 40%;
        position: absolute;
    }

    #github-logo {
        height: 25px
    }

</style>
