<script>
    import { goto } from '$app/navigation';
    import Pocketbase from 'pocketbase'
    const client = new Pocketbase('http://127.0.0.1:8090')

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

            client.records.create('expenses', newDocument)
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
        <label for="name">Purchase Name</label>
        <input type="text" name="name" id="name" bind:value={formdata.name} required/>
    </div>

    <div class="form-row">
        <label for="description">Description</label>
        <input
            type="text"
            name="description"
            id="description"
            bind:value={formdata.description}
        />
    </div>

    <div class="form-row">
        <label for="date">Date of Purchase</label>
        <input
            type="date"
            name="date"
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
        <input type="file" name="files" id="files" bind:files multiple required/>
    </div>

    <div class="form-row">
        <input type="submit" value="Submit" disabled={loading}/>
    </div>
</form>

<pre>
    {JSON.stringify(formdata, null, 2)}
</pre>