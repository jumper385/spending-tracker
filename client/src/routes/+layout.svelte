<script>

    import Nav from "$lib/components/nav.svelte";
    import { vars } from "$lib/vars";
    import Pocketbase from 'pocketbase'

    const client = new Pocketbase(vars.dbUrl)

    client.authStore.exportToCookie({httpOnly: false})

</script>
<svelte:head>
    <link rel="stylesheet" href="src/global.scss">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <title>Dolly: Dollary Doo Spending Tracker</title>

</svelte:head>

<div class="body">
    <Nav />
    <div class="page">
        <slot />
    </div>
</div>

<style lang="scss" global></style>