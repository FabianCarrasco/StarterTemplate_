<script lang="ts">
	import '../app.css';
    import Icon from '@iconify/svelte'
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData, children: Snippet } = $props();
	let pictureUrl: string = $state('');

	$effect(() => {
        if (data.user?.profilePictureURL) {
            pictureUrl = data.user.profilePictureURL
        } else {
            pictureUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
        }
    });
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl hover:bg-transparent">SITE NAME</a>
    </div>
    <div class="flex-none gap-2">
        {#if data.user}
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        {#if data.user}
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar">
                        {:else}
                            <Icon icon="carbon:user-avatar" class="h-full w-full"/>
                        {/if}
                    </div>
                </div>
                <ul 
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a class="justify-between">
                            Profile 
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        {:else}
            <a href="/login" class="btn btn-neutral">Login</a>
        {/if}
    </div>
</div>
{@render children()}
