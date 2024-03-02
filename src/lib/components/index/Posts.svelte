<script lang="ts">
    import {createTable, Render, Subscribe} from "svelte-headless-table";
    import {readable} from "svelte/store";
    // @ts-ignore
    import * as Table from "$lib/components/ui/table";
    // @ts-ignore
    import type {PageData} from './$types';
    import BetweenLines from "$lib/components/BetweenLines.svelte";
    import type Post from "$lib/models/Post";

    export let posts: PageData;

    const table = createTable(readable(posts));

    const columns = table.createColumns([
        table.column({
            accessor: (post) => (post as Post).displayName,
            header: "المنشورات",
        }),
    ]);

    const {headerRows, pageRows, tableAttrs, tableBodyAttrs} =
        table.createViewModel(columns);

    function getOriginalPost(row: any) {
        return row.original;
    }
</script>

<section id="posts" class="mt-24 scroll-m-20 flex flex-col gap-2">
    <BetweenLines>
        المنشورات
    </BetweenLines>
    <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
            <Table.Body {...$tableBodyAttrs}>
                {#each $pageRows as row (row.id)}
                    {@const post = getOriginalPost(row)}
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