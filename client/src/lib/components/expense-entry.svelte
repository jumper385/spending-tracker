<script>
    export let formdata = {
        name:"", 
        description:"", 
        purchase_date:"", 
        amount:"", 
    };

    export let files;
    export let onSubmit;
    export let loading;
    export let fileDeleteQueue = [];

    export let deleteFile;
</script>

<form on:submit|preventDefault={onSubmit}>
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

        {#if formdata?.files?.length > 0}
            {#each formdata?.files as file}
                <div class='file-list-entry'>
                    <div class='details'>
                        <p class='.filename'>{file}</p>
                    </div>
                    <button on:click|preventDefault ={()=> deleteFile(file)}>Delete</button>
                </div>
            {/each}
        {/if}

        <input type="file" name="files" id="files" bind:files={files} multiple/>
    </div>

    <div class="form-row">
        <input type="submit" value="Submit" disabled={loading}/>
    </div>
    
</form>