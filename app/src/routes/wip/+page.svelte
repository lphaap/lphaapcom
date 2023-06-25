<script>
    import { page } from '$app/stores';
    import Logo from '$lib/Logo.svelte';
    import cat from "$lib/images/cat.webp";
</script>

<svelte:head>
	<title>WIP | lphaap.com</title>
</svelte:head>

<div id="main-container" class="h-screen p-4 bg-lphaap-dark-blue">
    <div id="wip-container" class="p-5 border border-lphaap-light-grey flex flex-col">
        <p id="logo" class="text-6xl text-white self-center">
            <a href="/">lphaap.com</a>
        </p>
        <div class="flex flex-col justify-center text-center text-white">
            <p class="text-4xl mt-5 mb-5">
                Working hard on more content! - WIP
            </p>
            <img
                class="nav-arrow"
                id="nav-arrow-right"
                src={cat}
                alt="Navigation arrow right"
            />
        </div>
    </div>
</div>

<style>
    #main-container {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
    }

    #main-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wip-text {
        font-size: 3.5rem;
    }
</style>