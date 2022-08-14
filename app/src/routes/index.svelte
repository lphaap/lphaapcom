<script>
	let name = 'lphaap.com';

    let count = 0;
    $: doubled = count * 2;

    function handleClick() {
		count += 1;
	}

    $: if (count >= 10) {
        alert('count is dangerously high!');
        count = 9;
    }
</script>

<h1>Welcome to {name} - {doubled}</h1>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
    h1 {
        background-color: purple;
    }
</style>