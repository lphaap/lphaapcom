<script lang="ts">
    import MouseTracker from "$lib/MouseTracker.svelte";
    import github_logo from "$lib/images/github.svg";
    import linkedin_logo from "$lib/images/linkedin.svg";
    import me from "$lib/images/me.jpg"

    let mouse_tracker: MouseTracker

    function on_mouse_move(event: MouseEvent) {
        mouse_tracker.handle_mouse_move(event)
    }
</script>

<svelte:head>
	<title>About | Lassi Haapala</title>
    <meta
        name="description"
        content="
            Read further about Lassi Haapala's home page.
        "
    >
</svelte:head>

<svelte:window on:mousemove={on_mouse_move} />

<div id="screen-container" class="h-screen bg-lphaap-dark-blue text-lphaap-dark-grey">

    <MouseTracker bind:this={mouse_tracker} />

    <div
        id="main-container"
        class="grid grid-cols-12 grid-rows-10 h-full"
    >
        <div class="
            col-span-4
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            flex-row
            items-center
            p-4
            text-white
        ">
            <a
                href="/"
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
            >
                <p id="logo" class="text-5xl">lphaap</p>
            </a>
        </div>
        <div class="
            col-span-4
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            flex-row
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="/explore"
                class="uppercase"
            >
                Explore
            </a>
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="https://blog.lphaap.com/"
                class="uppercase"
            >
                Blog
            </a>
        </div>
        <div class="
            col-span-2
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="https://github.com/lphaap/"
                target="_blank"
            >
                <img id="github-logo" alt="Github logo" src="{github_logo}" />
            </a>
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="https://www.linkedin.com/in/lassi-haapala-527391263/"
                target="_blank"
            >
                <img id="linkedin-logo" alt="Linkedin logo" src="{linkedin_logo}" />
            </a>
        </div>
        <div class="
            col-span-2
            row-span-1
            border
            border-lphaap-light-grey
            border-r-0
            flex
            justify-evenly
            items-center
        ">
            <a
                on:mouseover={() => mouse_tracker.expand()}
                on:mouseleave={() => mouse_tracker.shrink()}
                on:focus
                href="mailto:lassi.p.haapala@gmail.com"
                class="uppercase"
            >
                Contact Me
            </a>
        </div>
        <div
            class="
                flex-col
                col-span-6
                col-start-4
                row-start-2
                row-[10_/_end_10]
                text-container
                flex
                items-center
                bg-lphaap-dark-blue
            "
        >
            <div
                class="
                    flex
                    flex-col
                    justify-evenly
                    items-center
                    h-full
                    p-2
                "
                style="max-width: 950px;"
            >
                <div class="flex mb-5">
                    <div
                        id="image-container"
                        class="overflow-hidden"
                        style="max-width: 260px;"
                    >
                        <img
                            class="nav-arrow rounded-lg"
                            id="self-portrait"
                            src={me}
                            alt="Self portrait"
                        />
                    </div>
                    <p class="ml-5">
                        <b class="chapter-lead">Hey</b> I'm Lassi welcome to my site.
                        Regardless of how you got here, this site is meant to act as a personal, yet public learning journal.
                        During my three or some years of professional software development, I've noticed we developers don't document enough.
                        This also applies to the skills we learn along the way.
                        Therefore, the goal of this site is to explore the key projects of my career and document the learnings in a meaningful way.

                    </p>
                </div>
                <div>
                    <p class="mb-6">
                        <b class="chapter-lead">About</b> me, Im a professional software developer and a computer science major.
                        My journey into software development started in 2018 and has escalated into a passion ever since.
                        I've worked professionally since 2021 getting to explore various systems and companies.
                        My focus lies in backend development and system design with a sprikle of devops.
                        However, during the years I have also worked with designers and marketing specialists to create SEO efficient frontends.
                        You can read more about my experience with spesific technologies over on my
                        <a
                            class="underline"
                            href="https://www.linkedin.com/in/lassi-haapala-527391263/"
                            on:mouseover={() => mouse_tracker.expand()}
                            on:mouseleave={() => mouse_tracker.shrink()}
                            on:focus
                        >linkedin</a>.
                    </p>
                </div>
                <p class="mb-6">
                    <b class="chapter-lead">
                        <a
                            href="/explore"
                            on:mouseover={() => mouse_tracker.expand()}
                            on:mouseleave={() => mouse_tracker.shrink()}
                            on:focus
                        >
                            Explore
                    </b> my journey into software development in the exploration section.
                    With the power of svelte this section will show you glimpses of different projects I've been involved in.
                    Even allowing you to read further if you'd like!
                </p>
                <div>
                <p class="mb-6">
                    <b class="chapter-lead">
                        <a
                            href="https://blog.lphaap.com/"
                            on:mouseover={() => mouse_tracker.expand()}
                            on:mouseleave={() => mouse_tracker.shrink()}
                            on:focus
                        >
                            Blog
                    </b> section contains the learning journal itself, published using a selfhosted ghost CMS.
                    Here you can read in depth into the many details I've found important during my career.
                </p>
                </div>
                <div>
                    <b class="chapter-lead">- Lassi Haapala</b>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .chapter-lead {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
        font-size: 40px;
        line-height: 80%;
    }

    .text-container {
        color: #E1E3E6;
        font-size: 22px;
        text-align: justify;
    }

    #screen-container {
        font-family: 'Trispace';
        font-weight: 300;
    }

    #logo {
        font-family: 'Kaushan Script', cursive;
        font-weight: 400;
    }

    #github-logo {
        height: 25px
    }
</style>
