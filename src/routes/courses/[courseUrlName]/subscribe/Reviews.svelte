<div class="roboto-mono flex flex-col gap-4">
  <p>
    1- اذكروا الله، 2- مجرد اشتراكك ما يضمن لك درجات عالية، لكن اذا اشتغلت
    وذاكرت واتدربت وطبقت معايا، باذن الله بتجيب اعلى الدرجات
  </p>
  <p class="font-bold">برمجة 1 دفعة 45</p>
	<hr />
  {#each Array.from({ length: 12 }, (_, i) => i) as i}
    <img src={`/images/reviews/45/cs1211/${i + 1}.jpeg`} alt="review" />
  {/each}
	<p class="font-bold">برمجة 2 دفعة 45</p>
	<hr />
	{#each Array.from({ length: 28 }, (_, i) => i) as i}
	<img src={`/images/reviews/45/cs1312/${i + 1}.jpg`} alt="review" />
{/each}
</div>
