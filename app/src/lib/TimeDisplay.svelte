<script>
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

    $: hours = time.getHours();
    $: minutes = time.getMinutes();
    $: seconds = time.getSeconds();
    $: day = parse_day[time.getDay()];
    $: month = parse_month[time.getMonth()];
    $: date = time.getDate();

    onMount(() => {
        const tick = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(tick);
        };
    });
</script>

<p>{day}, {month} {date} {hours}:{minutes}:{seconds}</p>


<style>
    p {
        color: purple;
        font-weight: bold;
    }
</style>