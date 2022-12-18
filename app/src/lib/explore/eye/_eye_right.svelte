<script lang="ts">

/*
<p class="mb-4">Time could carry our weight</p>
<p>if only we could paint dice</p>
<p>to wait on the windowsill</p>
<p>Wait for a guest</p>
<p>Wait for a moment of your pride</p>
<p>or patience</p>
<p>And let it be</p>
<p>Dusty or kept</p>
*/
    let enabled = false;

    export function disable_component() {
        enabled = false;
    }

    export function enable_component() {
        enabled = true;
    }

</script>
{#if enabled}
    <div id="eye-right-container">
        <div id="eye-right-text-container">
            <p>Anthropomorphism is the attribution of human traits, emotions, or intentions to non-human entities. It is considered to be an innate tendency of human psychology.</p>
        </div>
    </div>
{/if}


<style>
    #eye-right-container {
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #eye-right-text-container {
        height: 20%;
        width: 70%;
        text-align: left;
        font-size: 1.2rem;
    }
</style>