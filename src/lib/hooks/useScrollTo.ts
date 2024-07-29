import { pushState } from "$app/navigation";

const useScrollTo = (id: string, arg?: ScrollIntoViewOptions) => {
  id = id.replace("#", "");
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start", ...arg });

  pushState('#' + id, {});
};

export default useScrollTo;
