const useScrollTo = (query: string, arg?: ScrollIntoViewOptions) => {
  document
    .querySelector(query)
    ?.scrollIntoView({ behavior: "smooth", block: "start", ...arg });
  window.history.pushState(null, "", query);
};

export default useScrollTo;
