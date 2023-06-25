<script>
    import Logo from '$lib/Logo.svelte';
    import TimeDisplay from '$lib/TimeDisplay.svelte';
</script>

<svelte:head>
	<title>lphaap.com</title>
</svelte:head>

<div id="main-container" class="h-screen pl-3">
    <a href="/explore">
        <Logo/>
    </a>
    <div class="ml-1">
        <TimeDisplay/>
    </div>
</div>

<style>
    #main-container {
        background-color: black;
    }

</style>