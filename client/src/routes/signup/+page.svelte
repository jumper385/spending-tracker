<script>
    import { goto } from '$app/navigation';
    import { vars } from '$lib/vars';
    import Pocketbase from 'pocketbase'

    let client = new Pocketbase(vars.dbUrl);

    let loading = false;

    let formdata = {
        name: "",
        email: "", 
        password: "", 
        passwordConfirm: ""
    }

    let signup = async () => {
        try{
            loading = true;
            let {email, password, passwordConfirm} = formdata
            let res = await client.users.create({email, password, passwordConfirm})
            goto('/signup/success');
        } catch (err) {
            alert(err)
        } finally {
            loading = false;
        }
    }

</script>

<form on:submit|preventDefault={signup}>

    <div class="form-row">
        <label for="Name">Name</label>
        <input type="text" name="name" id="name" bind:value={formdata.name}>
    </div>

    <div class="form-row">
        <label for="E-Mail">E-Mail</label>
        <input type="email" name="email" id="email" bind:value={formdata.email}>
    </div>

    <br>

    <div class="form-row">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" bind:value={formdata.password}>
    </div>
    <div class="form-row">
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" id="password-confirm" bind:value={formdata.passwordConfirm}>
    </div>
    <div class="form-row">
        <input type="submit" value="Signup">
    </div>
</form>

<p>Already have an Account? <a href="login">Login Here!</a></p>