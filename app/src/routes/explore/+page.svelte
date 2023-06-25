<script lang="ts">
    import arrow_tail_up from "$lib/images/tail_arrow_up.svg";
    import rotate_shape from "$lib/images/rotate_shape.svg";
    import github_logo from "$lib/images/github.svg";
    import linkedin_logo from "$lib/images/linkedin.svg";    
    import EyeMain from "$lib/explore/eye/eye_display.svelte";
    import Eye from "$lib/explore/eye/Eye";
    import { spring } from 'svelte/motion';
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    const nav_arrow_left_pos = spring(40);
    const nav_arrow_right_pos = spring(40);
    const rotate_shape_deg = spring(-45);

    let text_display = true
    let current_mode = 0;
    let eye_display = new Eye();
    const modes = [
        eye_display,
    ];

    function swap_display(increment: number) {
        const available_mode_count = Object.keys(modes).length;
        const next_mode = Math.min(
            Math.max((current_mode + increment), 0),
            available_mode_count
        );

        current_mode = next_mode;
    }

    function on_mouse_move(event: MouseEvent) {
        if(typeof modes[current_mode].on_mouse_move === 'function') {
            modes[current_mode].on_mouse_move(event);
        }
    }

    function on_bottom_box_enter() {
        text_display = false
        rotate_shape_deg.set(90);
    }

    function on_bottom_box_exit() {
        text_display = true
        rotate_shape_deg.set(-45);
    }

    onMount(() => {
        // FIXME: Mount starting component
    });
</script>

<svelte:head>
	<title>Explore | lphaap.com</title>
</svelte:head>

<svelte:window on:mousemove={on_mouse_move} />

<div id="screen-container" class="h-screen bg-lphaap-dark-blue text-lphaap-dark-grey">
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
            <a href="/">
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
            <a href="/wip" class="uppercase">About</a>
            <a href="/wip" class="uppercase">Blog</a>
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
            <a href="https://github.com/lphaap/" target="_blank">
                <img id="github-logo" alt="Github logo" src="{github_logo}" />
            </a>
            <a href="https://www.linkedin.com/in/lassi-haapala-527391263/" target="_blank">
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
            <a href="mailto:lassi.p.haapala@gmail.com" class="uppercase">Contact Me</a>
        </div>

        <div class="border border-lphaap-light-grey border-t-0 border-r-0 col-span-4 row-span-6" id="main-block">
            <EyeMain bind:this={eye_display.display}></EyeMain>
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
                <p>The exploration section contains a series of blog entries and projects I have worked on, enjoy!</p>
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
                        Welcome visitor
                    </h1>
                {:else}
                    <h1 
                        class="text-7xl font-bold text-white uppercase"
                        in:fly={{ y: 25, duration: 600 }}
                    >
                        Explore!
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
                on:mouseover={() => {nav_arrow_left_pos.set(25);}}
                on:mouseleave={() => {nav_arrow_left_pos.set(40);}}
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
                on:mouseover={() => {nav_arrow_right_pos.set(25);}}
                on:mouseleave={() => {nav_arrow_right_pos.set(40);}}
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