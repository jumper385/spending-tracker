<script>
    import { goto } from '$app/navigation';
    import { vars } from '$lib/vars';
    import Pocketbase from 'pocketbase'
    const client = new Pocketbase(vars.dbUrl)

    let loading = false;

    let formdata = {
        name: null, 
        description: null, 
        amount: null, 
        purchase_date: null, 
        user_id: client?.authStore?.model?.profile?.id
    }

    let files = [];

    const addExpense = async () => {
        try {
            loading = true;
            let newDocument = new FormData();

            Object.keys(formdata).forEach(e => {
                newDocument.append(e, formdata[e])
            })

            for (let i=0; i < files.length; i++) {
                newDocument.append('files', files[i]);
            }

            let res = await client.records.create('expenses', newDocument)
            console.log(res)

            goto('/')

        } catch (err) {
            alert(err.message)
        } finally {
            loading = false;
        }
    }

</script>

<h1>Expenses</h1>

<form on:submit|preventDefault={addExpense}>
    <div class="form-row">
        <label for="purchase name">Purchase Name</label>
        <input type="text" name="purchase name" id="purchase-name" bind:value={formdata.name} required/>
    </div>

    <div class="form-row">
        <label for="purchase description">Description</label>
        <input
            type="text"
            name="purchase description"
            id="description"
            bind:value={formdata.description}
        />
    </div>

    <div class="form-row">
        <label for="purchase date">Date of Purchase</label>
        <input
            type="date"
            name="purchase date"
            id="date"
            bind:value={formdata.purchase_date}
            required
        />
    </div>

    <div class="form-row">
        <label for="cost">Amount</label>
        <input
            type="number"
            name="cost"
            id="cost"
            step="0.01"
            bind:value={formdata.amount}
            required
        />
    </div>

    <div class="form-row">
        <label for="files">Files</label>
        <input type="file" name="files" id="files" bind:files multiple/>
    </div>

    <div class="form-row">
        <input type="submit" value="Submit" disabled={loading}/>
    </div>
</form>

<pre>
    {JSON.stringify(formdata, null, 2)}
</pre>