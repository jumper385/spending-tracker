<script>
    import { goto } from '$app/navigation';
    import ExpenseEntry from '$lib/components/expense-entry.svelte';
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

            console.log(files)

            Object.keys(formdata).forEach(e => {
                newDocument.append(e, formdata[e])
            })

            for (let i=0; i < files.length; i++) {
                newDocument.append('files', files[i]);
            }

            let res = await client.records.create('expenses', newDocument)

            goto('/expenses')

        } catch (err) {
            alert(err.message)
        } finally {
            loading = false;
        }
    }

    const deleteFile = async (file) => {
        console.log(file)
    }

</script>

<h1>Expenses</h1>

<ExpenseEntry onSubmit={addExpense} bind:files={files} bind:loading={loading} bind:formdata={formdata}/>