<script lang='ts'>
import { Canvas, Layer, t, type Render } from 'svelte-canvas';
import TimeDisplay from '$lib/TimeDisplay.svelte';

let screen_height: number
let screen_width: number
let title_height: number
let title_width: number
let time_height: number
let time_width: number

$: screen_center_x = (screen_width ?? 0) / 2
$: screen_center_y = (screen_height ?? 0) / 2

let render: Render;
$: render = ({ context, width, height }) => {
    const screen_min = Math.min(height, width)

    const max_circle_radius = screen_min / 2
    const min_cicle_radius = screen_min / 5
    const circle_inrement = (max_circle_radius - min_cicle_radius) / 10

    for (let index = 1; index <= 11; index++) {
        context.strokeStyle = "white";
        context.fillStyle = "white";

        // Circle variables
        const circle_radius = max_circle_radius - (circle_inrement * index)
        const circle_center_x = width / 2
        const circle_center_y = height / 2
        const circle_angle_start = 0
        const circle_angle_stop = Math.PI * 2

        // Draw circle
        context.beginPath();
        context.arc(
            circle_center_x,
            circle_center_y,
            circle_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.stroke();

        // Ball variables
        const circle_velocity = Math.PI * 2 * index / 900
        const ball_to_circle_angle = (Math.PI + (circle_velocity * $t/25))
        const ball_radius = screen_min * 0.01
        const ball_center_x = circle_center_x + circle_radius * Math.cos(ball_to_circle_angle)
        const ball_center_y = circle_center_y + circle_radius * Math.sin(ball_to_circle_angle)


        // Draw ball
        context.beginPath();
        context.arc(
            ball_center_x,
            ball_center_y,
            ball_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.fill();
    }
};
</script>


<svelte:head>
	<title>Welcome | lphaap.com</title>
</svelte:head>

<div id="main-container" class="h-screen bg-lphaap-dark-blue">
    <div class="h-full w-full" bind:clientHeight={screen_height} bind:clientWidth={screen_width}>
        <Canvas width={screen_width} height={screen_height}>
            <Layer {render} />
        </Canvas>
    </div>
    <a href="/explore">
        <h1
            id="title"
            class="
                text-white
                absolute
                text-5xl
            "
            style="
                top: {screen_center_y - (title_height / 2) - (time_height / 2)}px;
                left: {screen_center_x - title_width / 2}px;
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
</div>

<style>
    #title {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
    }

    #main-container {
        overflow: hidden;
    }
</style>
