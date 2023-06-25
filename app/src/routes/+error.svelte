<script>
    import { page } from '$app/stores';
    import Logo from '$lib/Logo.svelte';
</script>

<svelte:head>
	<title>Error | lphaap.com</title>
</svelte:head>

<div id="main-container" class="h-screen p-4 bg-lphaap-dark-blue">
    <div id="error-container" class="p-5 border border-lphaap-light-grey flex flex-col">
        <p id="logo" class="text-6xl text-white self-center">
            <a href="/">lphaap.com</a>
        </p>
        <div class="flex flex-col h-[400px] justify-center">
            <p class="error-text mt-5">
                Error: {$page.status ?? "Unknow"}
            </p>
            <p class="error-text">(╯°□°）╯︵ ┻━┻</p>
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

    #error-container {
        min-width: 800px;
        min-height: 600px;
    }

    .error-text {
        font-size: 3.5rem;
    }
</style>