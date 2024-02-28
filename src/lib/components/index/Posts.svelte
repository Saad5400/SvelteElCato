<script lang="ts">
    import {createTable, Render, Subscribe} from "svelte-headless-table";
    import {readable} from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import type {PageData} from "./$types";
    import Post from "$lib/models/Post";

    export let data: PageData;

    const posts: Post[] = data.items.map((item: any) => new Post(item));
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
                    {@const post = row.original}
                    <a href="/posts/{post.urlName}" class="contents" data-sveltekit-preload-data="hover">
                        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                            <Table.Row {...rowAttrs}>
                                {#each row.cells as cell (cell.id)}
                                    <Subscribe attrs={cell.attrs()} let:attrs>
                                        <Table.Cell {...attrs} class="text-lg">
                                            <Render of={cell.render()}/>
                                        </Table.Cell>
                                    </Subscribe>
                                {/each}
                            </Table.Row>
                        </Subscribe>
                    </a>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</section>