<script>
    import { invalidate } from '$app/navigation';
    import Pocketbase from 'pocketbase'
    let client = new Pocketbase('http://127.0.0.1:8090')

    const logout = async () => {
        await client.authStore.clear()  
    }
</script>

<nav>
    <a href="/">Home</a>
    {#if client.authStore.token}
    <a href="/logout" on:click|preventDefault={logout}>Logout</a>
    {:else}
    <a href="/login">Login</a>
    {/if}
</nav>