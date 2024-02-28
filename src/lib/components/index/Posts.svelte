<script lang="ts">
    import {createTable, Render, Subscribe} from "svelte-headless-table";
    import {readable} from "svelte/store";
    import * as Table from "$lib/components/ui/table";

    export let data;
    data.items.forEach((item: any) => {
        item.tags = item.expand.tags;
        item.expand = undefined;
    });

    const posts: App.Post[] = data.items;
    const table = createTable(readable(posts));

    const columns = table.createColumns([
        table.column({
            accessor: "displayName",
            header: "المنشورات",
        }),
    ]);

    const {headerRows, pageRows, tableAttrs, tableBodyAttrs} =
        table.createViewModel(columns);
</script>

<section id="posts" class="mt-24 scroll-m-20 flex flex-col gap-2">
    <h3 class="text-2xl font-semibold tracking-tight">
        المنشورات
    </h3>
    <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
            <Table.Body {...$tableBodyAttrs}>
                {#each $pageRows as row (row.id)}
                    <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                        <Table.Row {...rowAttrs}>
                            {#each row.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs>
                                    <Table.Cell {...attrs}>
                                        <Render of={cell.render()}/>
                                    </Table.Cell>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</section>