<script lang='ts'>
import { onMount } from 'svelte';

import TimeDisplay from '$lib/TimeDisplay.svelte';
import OrbSpinner from '$lib/OrbSpinner.svelte';
import MouseTracker from '$lib/MouseTracker.svelte';
import RecordPlayerArm from '$lib/images/record_player_arm.svg'

let screen_height: number
let screen_width: number
let title_height: number
let title_width: number
let time_height: number
let time_width: number

let mouse_tracker: MouseTracker

$: screen_center_x = screen_width / 2
$: screen_center_y = screen_height / 2

const handle_window_resize = () => {
    if(window.innerWidth < 1900) {
        window.location.href = '/explore'
    }
}

onMount(() => {
    handle_window_resize()

    window.addEventListener('resize', handle_window_resize);

    return () => {
        window.removeEventListener('resize', handle_window_resize);
    }
});

</script>

<svelte:head>
	<title>Welcome | lphaap.com</title>
</svelte:head>

<svelte:window on:mousemove={mouse_tracker.handle_mouse_move} />

<div id="main-container" class="h-screen w-screen bg-lphaap-dark-blue">

    <MouseTracker bind:this={mouse_tracker} />

    <div
        class="w-full h-full absolute pointer-events-none"
        bind:clientWidth={screen_width}
        bind:clientHeight={screen_height}
    >
        <OrbSpinner spinner_width={screen_width} spinner_height={screen_height} />
    </div>

    <a
        href="/"
        on:mousemove={() => mouse_tracker.expand()}
        on:mouseleave={() => mouse_tracker.shrink()}
        on:focus
    >
        <h1
            id="title"
            class="
                text-white
                absolute
                text-5xl
            "
            style="
                top: {screen_center_y - (title_height / 2) - (time_height / 2)}px;
                left: {screen_center_x - (title_width / 2)}px;
            "
            bind:clientHeight={title_height}
            bind:clientWidth={title_width}
        >
            lphaap
        </h1>
    </a>

    <div
        id="time-container"
        class="text-white absolute"
        style="
            top: {screen_center_y + title_height - (time_height / 2)}px;
            left: {screen_center_x - time_width / 2}px;
        "
        bind:clientHeight={time_height}
        bind:clientWidth={time_width}
    >
        <TimeDisplay/>
    </div>


    <img
        alt="Record player arm"
        class="absolute hidden min-[1800px]:block"
        src="{RecordPlayerArm}"
        style="
            left: {screen_center_x + 330}px;
            top: 170px;
        "
    />

    <div id="desktop-content-container" class="h-full w-full hidden min-[1800px]:flex flex-row justify-between">
        <div
            id="left-content-container"
            class="w-full h-full flex flex-1 flex-col p-4 justify-around items-end"
        >

            <a
                href="/explore"
                on:mousemove={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
            >
                <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[200px] h-[200px] flex justify-center items-center">
                    <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[160px] h-[160px] flex justify-center items-center">
                        <h2
                            class="
                                text-lphaap
                                text-white
                                text-4xl
                            "
                        >
                            Explore
                        </h2>
                    </div>
                </div>
            </a>

            <a
                href="/wip"
                on:mousemove={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
            >
                <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[200px] h-[200px] flex justify-center items-center">
                    <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[160px] h-[160px] flex justify-center items-center">
                        <h2
                            class="
                                text-lphaap
                                text-white
                                text-4xl
                            "
                        >
                            Blog
                        </h2>
                    </div>
                </div>
            </a>

        </div>
        <div
            id="center-content-container"
            style="
                width: {screen_height}px;
                heigth: {screen_height}px;
            "
        >
        </div>
        <div
            id="right-cotent-container"
            class="md:w-full h-full flex flex-1 flex-col p-4 justify-around"
        >

            <div style="visibility: hidden;" class="w-[200px] h-[200px]" />

            <a
                href="/wip"
                on:mousemove={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
            >
                <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[200px] h-[200px] flex justify-center items-center">
                    <div class="border border-1 hover:border-white border-lphaap-light-grey rounded-full w-[160px] h-[160px] flex justify-center items-center">
                        <h2
                            class="
                                text-lphaap
                                text-white
                                text-4xl
                            "
                        >
                            About
                        </h2>
                    </div>
                </div>
            </a>

        </div>
    </div>

</div>

<style>
    #title, .text-lphaap {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
    }

    :global(body) {
        overflow: hidden;
	}
</style>
