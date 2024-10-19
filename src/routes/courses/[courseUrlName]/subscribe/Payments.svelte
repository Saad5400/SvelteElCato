<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import type Payment from "$lib/models/Payment";
  import * as Table from "$lib/components/ui/table";
  import { Skeleton } from "$lib/components/ui/skeleton";

  export let data: PageData;
  let payments: Promise<Payment[]> = Promise.resolve([]);

  onMount(async () => {
    payments = data.pb.collection("payments").getFullList({
      filter: data.pb.filter("user.id = {:userId} && course.id = {:courseId}", {
        userId: data.pb.authStore.model!.id,
        courseId: data.course.id
      })
      // cache: "no-cache",
    });
  });

  function translateStatus(status: Payment["status"]) {
    switch (status) {
      case "pending":
        return "قيد المراجعة";
      case "accepted":
        return "تمت الموافقة";
      case "rejected":
        return "تم الرفض";
      default:
        return status;
    }
  }
</script>

{#await payments}
  <div class="flex h-full w-full flex-1 items-center justify-center">
    <Table.Root class="roboto-mono">
      <Table.Header>
        <Table.Row>
          <Table.Head class="text-start">
            <Skeleton />
          </Table.Head>
          <Table.Head class="text-start">
            <Skeleton />
          </Table.Head>
          <Table.Head class="text-start">
            <Skeleton />
          </Table.Head>
          <Table.Head class="text-start">
            <Skeleton />
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Skeleton class="h-[2rem]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton class="h-[2rem]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton class="h-[2rem]" />
          </Table.Cell>
          <Table.Cell>
            <Skeleton class="h-[2rem]" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </div>
{:then payments}
  {#if payments.length === 0}
    <p class="flex min-h-16 items-center justify-center">
      لم تقم بأي عمليات دفع بعد
    </p>
  {:else}
    <Table.Root class="roboto-mono">
      <Table.Header>
        <Table.Row>
          <Table.Head class="text-start">التاريخ</Table.Head>
          <Table.Head class="text-start">المبلغ</Table.Head>
          <Table.Head class="text-start">الحالة</Table.Head>
          <Table.Head class="text-start">الملاحظات</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each payments as payment}
          <Table.Row>
            <Table.Cell
            >{new Date(payment.created).toLocaleDateString()}</Table.Cell
            >
            <Table.Cell>{payment.amount} ريال</Table.Cell>
            <Table.Cell>{translateStatus(payment.status)}</Table.Cell>
            <Table.Cell>{payment.feedback}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
{:catch error}
  <p>{error.message}</p>
{/await}
