import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {
  return {
    expires: data.expires,
    hash: data.hash,
  };
};
