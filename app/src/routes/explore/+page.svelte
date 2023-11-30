<script lang="ts">
    import arrow_tail_up from "$lib/images/tail_arrow_up.svg";
    import rotate_shape from "$lib/images/rotate_shape.svg";
    import github_logo from "$lib/images/github.svg";
    import linkedin_logo from "$lib/images/linkedin.svg";

    import * as Wrappers from "$lib/explore/wrappers";
    import type { ExploreWrapper } from "$lib/explore/explore_wrapper";
    import EyeDisplay from "$lib/explore/displays/EyeDisplay.svelte";
    import BrokerDisplay from "$lib/explore/displays/BrokerDisplay.svelte";
    import PaymentDisplay from "$lib/explore/displays/PaymentDisplay.svelte";

    import { spring } from 'svelte/motion';
    import { fly } from "svelte/transition";

    import MouseTracker from "$lib/MouseTracker.svelte";

    import emblaCarouselSvelte from 'embla-carousel-svelte'

    const nav_arrow_left_pos = spring(40);
    const nav_arrow_right_pos = spring(40);
    const rotate_shape_deg = spring(-45);

    let text_display = true

    let mouse_tracker: MouseTracker

    let carousel_controller: any
    const on_carousel_init = (event: any) => {
        carousel_controller = event.detail
    }

    let current_wrapper_index = 0;
    const eye_wrapper = new Wrappers.EyeWrapper();
    const broker_wrapper = new Wrappers.BrokerWrapper();
    const payment_wrapper = new Wrappers.PaymentWrapper();
    const wrappers: ExploreWrapper[] = [
        eye_wrapper,
        payment_wrapper,
        broker_wrapper
    ];

    let current_wrapper: any;
    current_wrapper = wrappers[current_wrapper_index]

    function next_display() {
        carousel_controller.scrollNext();
        change_display(-1);
    }

    function previous_display() {
        carousel_controller.scrollPrev();
        change_display(1);
    }

    function change_display(increment: number) {
        const wrapper_count = Object.keys(wrappers).length;
        const incremented_count = current_wrapper_index + increment
        if (incremented_count >= wrapper_count) {
           current_wrapper_index = incremented_count - wrapper_count
        }
        else if (incremented_count < 0) {
            current_wrapper_index = incremented_count + wrapper_count
        }
        else {
            current_wrapper_index = incremented_count
        }

        current_wrapper = wrappers[current_wrapper_index];
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
                href="https://blog.lphaap.com/"
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

        <div class="
                border
                border-lphaap-light-grey
                border-t-0
                border-r-0
                col-span-4
                row-span-6
            "
            id="main-block"
        >
            <div
                class="embla"
                use:emblaCarouselSvelte="{{
                    options: {
                        loop: true
                    },
                    plugins: [
                    ]
                }}"
                on:emblaInit="{on_carousel_init}"
            >
                <div class="embla__container">
                    <div class="embla__slide">
                        <EyeDisplay bind:this={eye_wrapper.display}></EyeDisplay>
                    </div>
                    <div class="embla__slide">
                        <BrokerDisplay bind:this={broker_wrapper.display}></BrokerDisplay>
                    </div>
                    <div class="embla__slide">
                        <PaymentDisplay bind:this={payment_wrapper.display}></PaymentDisplay>
                    </div>
                </div>
            </div>
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
                on:click={() => previous_display()}
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
                on:click={() => next_display()}
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
    .embla {
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .embla__container {
        display: flex;
        height: 100%;
        width: 100%;
    }
    .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
        height: 100%;
        width: 100%;
    }

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
