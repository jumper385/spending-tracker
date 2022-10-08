<script>
    import { goto } from '$app/navigation';
    import Pocketbase from 'pocketbase'

    let client = new Pocketbase('http://127.0.0.1:8090');

    let formdata = {
        email: "", 
        password: ""
    }

    let login = async () => {
        try {
            let {email, password} = formdata
            let {token} = await client.users.authViaEmail(email, password)
            if (token) {
                goto('/')
            }
        } catch (err) {
            alert (err.message)
        }
    }

</script>

<form on:submit|preventDefault={login}>
    <div class="form-row">
        <label for="E-Mail">E-Mail</label>
        <input type="email" name="email" id="email" bind:value={formdata.email}>
    </div>
    <div class="form-row">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" bind:value={formdata.password}>
    </div>
    <div class="form-row">
        <input type="submit" value="Login">
    </div>
</form>

<p>Don't have an Account? <a href="signup">Sign Up Here</a></p>