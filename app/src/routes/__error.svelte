<script>
    import { page } from '$app/stores';
    import Logo from '$lib/Logo.svelte';
</script>

<svelte:head>
	<title>lphaap.com</title>
</svelte:head>

<div id="main-container" class="h-screen p-4">
    <div id="error-container" class=" pt-0 p-5 border border-pink-500 shadow-2xl shadow-pink-500">
        <div id="logo-container">
            <a href="/" class="mr-4">
                <Logo/>
            </a>
            <p id="frown" class="ml-4 mt-2 text-pink-500">
                :(
            </p>
        </div>
        <p id="error-text" class="mt-2 text-pink-500">
            Error: {$page.status}
        </p>



    </div>
</div>

<style>
    #main-container {
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #error-container {
        min-width: 800px;
        min-height: 600px;
    }

    #logo-container {
        display: flex;
        align-items: center;
    }

    #error-text {
        font-size: 3.5rem;
    }

    #frown {
        font-size: 2rem;
    }
</style>