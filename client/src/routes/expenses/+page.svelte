<script>
    import Pocketbase from "pocketbase";
    import FileIcon from "$lib/components/file-icon.svelte";
    import { vars } from "$lib/vars";
    import { goto } from "$app/navigation";
    import ExpenseEntry from "$lib/components/expense-entry.svelte";
    let client = new Pocketbase(vars.dbUrl);

    const getExpenses = async () => {
        if (!client.authStore.token) {
            goto("/login");
        }

        let data = await client.records.getList("expenses", 1, 30, {
            sort: "-purchase_date",
        });
        return data;
    };
    
</script>


<h2 class="page-title">Incoming / Outgoing Records</h2>
<a class="btn" href="expenses/new_expense">+ Add Expense</a>

{#await getExpenses()}
    Loading...
{:then { items }}
    {#if items.length > 0}
        <table>
            <thead>
                <th class="left">Record</th>
                <th class="center">Status</th>
                <th class="right">Amount</th>
            </thead>
            <tbody>
                {#each items as expenseItem}
                    <tr>
                        <td>
                            <a href="/expenses/{expenseItem.id}">
                                <div class="record-item">
                                    <p class='name'>{expenseItem.name}</p>
                                    <p class='description'>{expenseItem.description}</p>
                                    <p class='date'>{(new Date(expenseItem.purchase_date)).toLocaleDateString()}</p>
                                </div>
                            </a>
                        </td>
                        <td class="center"><p class="tablet">{expenseItem.isIncome ? "Income" : "Expense"}</p></td>
                        <td class="right"><p>${expenseItem.amount}</p></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        No Expenses to report...
    {/if}
{/await}

