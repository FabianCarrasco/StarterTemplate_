<script lang="ts">
    import { page } from "$app/stores"
    import {trpc} from '$lib/trpc/client'

    let greeting = $state('press button to load data')
    let loading = $state(false)

    const loadData = async (event: Event) => {
        event.preventDefault()
        loading = true
        greeting = await trpc($page).greeting.query()
        loading = false
    }
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<a 
    href="#load"
    role="button"
    class="secondary"
    aria-busy={loading}
    onclick={loadData}>Load</a>

<p>{greeting}</p>
