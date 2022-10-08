<script>
    import Pocketbase from 'pocketbase'
        import FileIcon from '$lib/components/file-icon.svelte';
        import { vars } from '$lib/vars';
        import { goto } from '$app/navigation';
        let client = new Pocketbase(vars.dbUrl)
    
        const getExpenses = async () => {
    
            if (!client.authStore.token){
                goto('/login')
            }
    
            let data = await client.records.getList('expenses', 1, 30, );   
            return data
        }
    </script>
    
    <h1>Expenses</h1>
    <p><a href="expenses/new_expense">+ Add Expense</a></p>
    
    {#await getExpenses()}
        Loading...
    {:then {items}}
        {#if items.length > 0}
        <table>
            <thead>
                <th>Purchase Date</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Supporting Material</th>
            </thead>
            <tbody>
                {#each items as expenseItem}
                <tr>
                    <td>{(new Date(expenseItem.purchase_date)).toLocaleDateString()}</td>
                    <td>{expenseItem.name}</td>
                    <td>${expenseItem.amount}</td>
                    <td>
                        {#each expenseItem.files as file}
                        <FileIcon link="{vars.dbUrl}/api/files/expenses/{expenseItem.id}/{file}"/>
                        {/each}
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
        {:else}
        No Expenses to report...
        {/if}
    {/await}
    