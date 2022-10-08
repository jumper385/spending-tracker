<script>
import Pocketbase from 'pocketbase'
    import FileIcon from '$lib/components/file-icon.svelte';
    let client = new Pocketbase('http://127.0.0.1:8090')

    const getExpenses = async () => {
        let data = await client.records.getList('expenses', 1, 30, );   
        return data
    }
</script>

<h1>Expenses</h1>
<p><a href="/new_expense">+ Add Expense</a></p>

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
                    <FileIcon link="http://127.0.0.1:8090/api/files/expenses/{expenseItem.id}/{file}"/>
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
