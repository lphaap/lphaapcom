<script lang='ts'>
import { Canvas, Layer, t, type Render } from 'svelte-canvas';

export let spinner_height: number
export let spinner_width: number

const circles = new Array(11).fill(0.1)

let render: Render;
$: render = ({ context, width, height }) => {
    const screen_min = Math.min(height, width)

    // Circle variables
    const circle_center_x = width / 2
    const circle_center_y = height / 2
    const circle_angle_start = 0
    const circle_angle_stop = Math.PI * 2
    const max_circle_radius = screen_min / 2 - 10
    const min_cicle_radius = screen_min / 5
    const circle_inrement = (max_circle_radius - min_cicle_radius) / 10

    const calculate_opacity = (
        currentTime: number,
        lastImpactTime: number,
        baseOpacity: number,
        maxOpacity: number,
        duration: number
    ) => {
        const timeSinceImpact = currentTime - lastImpactTime;
        const percentage = Math.min(timeSinceImpact / duration, 1);
        const opacityDelta = maxOpacity - baseOpacity;
        return (maxOpacity - (opacityDelta * percentage)).toFixed(2);
    }

    for (let index = 0; index < circles.length; index++) {


        const circle_radius = max_circle_radius - (circle_inrement * index)

        // Ball variables
        const ball_velocity = Math.PI * 2 * (index + 1) / 900
        const ball_to_circle_angle = (Math.PI + (ball_velocity * $t/25))
        const ball_radius = screen_min * 0.008
        const ball_center_x = circle_center_x + circle_radius * Math.cos(ball_to_circle_angle)
        const ball_center_y = circle_center_y + circle_radius * Math.sin(ball_to_circle_angle)

        const is_ball_horizontal = Math.round(Math.cos(ball_to_circle_angle)) === 1
        const is_ball_vertical = Math.sin(ball_to_circle_angle).toFixed(1) === "0.0"

        const outer_ball_velocity = Math.PI * 2 / 900
        const outer_ball_to_circle_angle = (Math.PI + (outer_ball_velocity * $t/25))
        const is_outer_ball_horizontal_neg = Math.round(Math.cos(outer_ball_to_circle_angle)) === -1
        const is_outer_ball_vertical = Math.sin(outer_ball_to_circle_angle).toFixed(2) === "0.00"

        if (
            (is_ball_horizontal && is_ball_vertical) ||
            (is_outer_ball_horizontal_neg && is_outer_ball_vertical)
        ) {
            circles[index] = $t
        }

        const circle_opacity = calculate_opacity($t, circles[index], 0.1, 0.9, 800)
        const ball_color = "rgba(255,255,255, 0.9)";
        const circle_color = `rgba(255,255,255, ${circle_opacity ?? 0.1})`;

        // Draw circle
        context.strokeStyle = circle_color;
        context.beginPath();
        context.arc(
            circle_center_x,
            circle_center_y,
            circle_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.stroke();

        // Draw ball
        context.fillStyle = ball_color;
        context.beginPath();
        context.arc(
            ball_center_x,
            ball_center_y,
            ball_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.fill();

        const static_ball_center_left = circle_center_x + circle_radius * Math.cos(Math.PI)
        const static_ball_center_right = circle_center_x + circle_radius * Math.cos(Math.PI*2)
        const static_ball_radius = Math.PI * 1.2

        // Draw static balls
        context.fillStyle = circle_color;
        context.beginPath();
        context.arc(
            static_ball_center_left,
            circle_center_y,
            static_ball_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.fill();

        context.beginPath();
        context.arc(
            static_ball_center_right,
            circle_center_y,
            static_ball_radius,
            circle_angle_start,
            circle_angle_stop
        );
        context.fill();

    }
};
</script>

<Canvas width={spinner_width} height={spinner_height}>
    <Layer {render} />
</Canvas>
