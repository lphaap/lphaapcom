<script lang="ts">

    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';

    let enabled = false;
    let show_text  = false;
    let show_dot = false;
    let text = "hello";

    let counter = 0;
    let leave_counter = 0;

    onMount(() => {
        show_text = true;

        const tick = setInterval(() => {
            show_dot = !show_dot;
        }, 1000);

        return () => {
            clearInterval(tick);
        };
    });

    export function handle_button_hover(event: Event) {
        leave_counter= leave_counter + 1;
        if(leave_counter % 3 == 0) {
            toggle_text("please");
            return;
        }
        toggle_text("don't leave");
    }

    export function handle_button_exit(event: Event) {
        counter = counter + 1;
        if(counter % 3 == 0) {
            toggle_text("friends");
            return;
        }
        if(counter % 2 == 0) {
            toggle_text("");
            return;
        }

        toggle_text("thank you");
    }

    export function disable_component() {
        enabled = false;
    }

    export function enable_component() {
        enabled = true;
    }

    async function toggle_text(new_text: string,) {
        if(!enabled) {
            return;
        }
        show_text = false;
        text = new_text;
        await new Promise(r => setTimeout(r, 600));
        show_text = true;
    }

</script>

{#if enabled}
    <div id="eye-bottom-container" class="p-4">
        {#if show_text}
            <h1 transition:fade="{{duration: 500}}">
                {#if show_dot}
                    {text} . .
                {:else}
                    {text} . . .
                {/if}
            </h1>
        {/if}
    </div>
{/if}


<style>
    #eye-bottom-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 5rem;
        color: white;
        margin-bottom: 10px;
    }
</style>