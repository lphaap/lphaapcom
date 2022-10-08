<script lang="ts">
    import kitty from "$lib/images/cat.webp";
    import Eye from "$lib/Eye.svelte";
    let eye: Eye;

    function handle_eye_movement(event: MouseEvent) {
        eye.eye_handler(event);
    }
</script>

<svelte:head>
	<title>lphaap.com</title>
</svelte:head>

<svelte:window on:mousemove={handle_eye_movement} />

<div id="main-container" class="h-screen">
    <div class="spacer"></div>
    <div id="eye-wrapper" class="h-50">
        <Eye bind:this={eye}></Eye>
        <h1>h e l l o . . .</h1>
    </div>
</div>

<style>
    h1 {
        font-size: 6rem;
        color: white;
        margin-bottom: 10px;
    }

    #main-container {
        background-color: black;
    }

    .spacer {
        height: 8rem;
    }

    #eye-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>