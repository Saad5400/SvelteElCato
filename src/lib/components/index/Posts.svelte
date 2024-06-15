<script lang="ts">
  import { createTable, Render, Subscribe } from "svelte-headless-table";
  import { addTableFilter } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  // @ts-ignore
  import * as Table from "$lib/components/ui/table";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import type Post from "$lib/models/Post";
  import { Button } from "$lib/components/ui/button";
  import Eye from "virtual:icons/f7/Eye";
  import { Input } from "$lib/components/ui/input";

  export let posts: Post[];

  const table = createTable(readable(posts), {
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
  });

  const columns = table.createColumns([
    table.column({
      accessor: (post) => post.displayName,
      header: "المنشورات",
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { filterValue } = pluginStates.filter;

  function getOriginalPost(row: any) {
    return row.original;
  }
</script>

<section id="posts" class="mt-24 flex scroll-m-20 flex-col gap-2">
  <BetweenLines>المنشورات</BetweenLines>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm bg-accent backdrop-blur-sm transition-all focus:max-w-full"
      placeholder="البحث"
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          {@const post = getOriginalPost(row)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs} class="border-0">
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="flex p-0 text-lg">
                    <Button
                      href="/posts/{post.urlName}"
                      class="h-fit flex-1 justify-between whitespace-normal p-2 px-4"
                    >
                      <span class="text-lg">
                        <Render of={cell.render()} />
                      </span>
                      <span class="flex flex-row items-center gap-2">
                        {post.views}
                        <Eye class="h3 w-3" />
                      </span>
                    </Button>
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
