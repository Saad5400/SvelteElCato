<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import Navbar from "$lib/components/Navbar.svelte";
    import { ProgressBar } from "@prgm/sveltekit-progress-bar";
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";
    // import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    // import { inject as injectAnalytics } from "@vercel/analytics";
    import usePageTransition from "$lib/hooks/usePageTransition";
    import { onMount } from "svelte";

    usePageTransition();
    onMount(() => {
        const azkar = [
            "سبحان الله وبحمده سبحان الله العظيم",
            "الحمد لله",
            "الله أكبر",
            "لا حول ولا قوة إلا بالله",
            "أستغفر الله",
            "لا إله إلا الله",
            "اللهم صل على محمد وعلى آل محمد",
            "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم",
            "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه",
            "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ",
            "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد",
            "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ",
            "يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ",
            "لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ",
        ];
        toast.info(azkar[Math.floor(Math.random() * azkar.length)]);
    });
    // injectSpeedInsights();
    // injectAnalytics();
</script>

<ModeWatcher disableTransitions={false} />
<Toaster class="max-w-[20rem]" />
<ProgressBar class="text-accent-foreground" zIndex={100} />
<Navbar>
    <slot />
</Navbar>
