import { onNavigate } from "$app/navigation";
export default function preparePageTransition() {
  // before completing the navigation, start a new transition
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
}
