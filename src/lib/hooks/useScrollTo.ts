import { pushState } from "$app/navigation";

const useScrollTo = (query: string, arg?: ScrollIntoViewOptions) => {
  document
    .querySelector(query)
    ?.scrollIntoView({ behavior: "smooth", block: "start", ...arg });
  pushState(query, {});
};

export default useScrollTo;
