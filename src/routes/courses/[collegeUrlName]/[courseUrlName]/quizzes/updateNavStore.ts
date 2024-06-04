import questionsStore, { type NavItem } from "$lib/stores/questionsStore";

export default function updateNavStore(
  questions: string[],
  href: string,
  solvedStore: string[],
  markedStore: string[],
  title: string
) {
  questionsStore.set({
    title: title,
    items: questions.map((question_id, index) => {
      return {
        title: index + 1 + "",
        href: href + question_id,
        class:
          (solvedStore.includes(question_id) ? "correct " : " ") +
          (markedStore.includes(question_id) ? "marked" : ""),
      };
    }),
  });
}

export function restoreNavStore() {
  questionsStore.set({ title: "", items: [] });
}
