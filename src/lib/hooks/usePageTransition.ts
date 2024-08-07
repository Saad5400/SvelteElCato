import { onNavigate } from "$app/navigation";

export default function preparePageTransition() {
  // before completing the navigation, start a new transition
  onNavigate((navigation) => {
      if (!document.startViewTransition) return;
      // disable view transitions for /courses/xyz/subscribe
      if (navigation.from?.url.pathname.match(/\/courses\/[^\/]+\/subscribe/) && navigation.to?.url.pathname.match(/\/courses\/[^\/]+\/subscribe/))
        return;

      return new Promise((resolve) => {
        document.startViewTransition(async () => {
          resolve();
          await navigation.complete;
        });
      });
    }
  )
  ;
}
