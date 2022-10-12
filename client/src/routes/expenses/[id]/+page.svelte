<script>
    import { goto, invalidateAll } from "$app/navigation";

    export let data;

    import ExpenseEntry from "$lib/components/expense-entry.svelte";
    import { generateDateString } from "$lib/generateDateString";
    import { vars } from "$lib/vars";
    import Pocketbase from "pocketbase";
    const client = new Pocketbase(vars.dbUrl);

    let formdata;
    let files;
    let loading;
    let fileDeleteQueue = [];

    const getEntry = async ({ id }) => {
        let res = await client.records.getOne("expenses", id);

        res.purchase_date = generateDateString(res.purchase_date);
        formdata = res;
        return 1;
    };

    const updateEntry = async () => {
        try {
            loading = true;
            // setup formdata object
            let uploaddata = new FormData();
            Object.keys(formdata).forEach((e) => {
                uploaddata.append(e, formdata[e]);
            });
            // append files to new formdata object
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    uploaddata.append("files", files[i]);
                }
            }
            // update formdata
            let res = await client.records.update(
                "expenses",
                formdata?.id,
                uploaddata
            );
            console.log(res);
            //redirect if successful
            goto("/expenses");
        } catch (err) {
            alert(err.message);
        } finally {
            loading = false;
        }
    };

    const queueFileDelete = async (file) => {
       if (confirm(`Are you sure you want to delete ${file} from ${formdata.name}`)) {
            let filedelete = await client.records.update("expenses", formdata.id, {
                [`files.${file}`]: null,
            });
            invalidateAll()
       }
    };

    const deleteEntry = async () => {
        try {

            if(confirm(`Are you sure you want to delete ${formdata.name}`)) {
                let res = await client.records.delete('expenses', formdata.id)
                console.log(res)
                goto('/expenses')
            }

        } catch (err) {
            alert(err.message)
        }
    }
</script>

{#await getEntry(data)}
    Loading...
{:then _}
    <button class="btn secondary" on:click={deleteEntry}>Delete Entry</button>

    <ExpenseEntry
        bind:files
        bind:loading
        onSubmit={updateEntry}
        bind:formdata
        deleteFile={queueFileDelete}
    />
{/await}
