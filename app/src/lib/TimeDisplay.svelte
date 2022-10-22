<script lang="ts">
    import { onMount } from 'svelte';

    let time = new Date();

    const parse_day = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const parse_month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let parse_single_digit = (digit: number) => {
        if(digit < 10) {
            return "0" + digit;
        }
        return digit;
    }

    $: hours = parse_single_digit(time.getHours());
    $: minutes = parse_single_digit(time.getMinutes());
    $: seconds = parse_single_digit(time.getSeconds());
    $: day = parse_day[time.getDay()];
    $: month = parse_month[time.getMonth()];
    $: date = time.getDate();
    $: year = time.getFullYear();

    onMount(() => {
        const tick = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(tick);
        };
    });
</script>

<p class="text-pink-500">{day}, {month} {date} {year}, {hours}:{minutes}:{seconds}</p>


<style>
    p {
        color: purple;
        font-weight: bold;
    }
</style>