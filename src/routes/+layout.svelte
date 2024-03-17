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
            "اللهم يا مقلب القلوب ثبت قلبي على دينك	",
            "أستودع الله الذي لا تضيع ودائعه ديني ونفسي وأمانتي وخواتيم عملي وبيتي وأهلي ومالي وجميع ما أنعم الله به علي استودع الله أمري كله. دقه وجله	",
            "حسبي الله لا اله الا هو عليه توكلت وهو رب العرش العظيم	",
            "اللهم أنت ربي. لا إله إلا أنت، خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء لك بذنبي، فاغفر لي فإنه لا يغفر الذنوب إلا أنت	",
            "اللهم إنا نسالك الجنة وما قرب اليها من قول وعمل ونعوذ بك من النار وما قرب اليها من قول وعمل",
            "اللهم اغفر لي ذنبي واحسن خاتمتي",
            "استغفرالله والحمدلله والله اكبر ولا اله الا الله",
        ];
        toast.info(azkar[Math.floor(Math.random() * azkar.length)], {
            description: "ما نقص مالٌ من صدقةٍ",
            action: {
                label: "تبرع مع إحسان",
                onClick: () => window.open("https://ehsan.sa/", "_blank", "noopener noreferrer"),
            }
        });
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
