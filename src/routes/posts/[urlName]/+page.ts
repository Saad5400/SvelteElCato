import type { PageLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import useHighlight from "$lib/hooks/useHighlight";
import slugify from "@sindresorhus/slugify";
import type Post from "$lib/models/Post";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { pb } = await parent();

  const post = (await pb
    .collection("posts")
    .getFirstListItem(
      pb.filter("urlName = {:urlName}", { urlName: params.urlName }),
      {
        expand: "tags",
        fetch: fetch,
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=600",
        },
      },
    )
    .catch(handleError)) as Post;

  post.content = useHighlight(post.content);

  let navItems: any[] = [];
  const h1Elements = post.content.match(/<h1.*?>(.*?)<\/h1>/g);
  h1Elements?.forEach((h1, index) => {
    const content = h1.replace(/<[^>]*>/g, "");
    const slug = slugify(content);
    const newH1 = h1.replace(/<h1/, `<h1 id="${slug}"`);
    post.content = post.content.replace(h1, newH1);
    navItems.push({
      title: content,
      href: `#${slug}`,
    });
  });

  const imgElements = post.content.match(/<img.*?>/g);
  imgElements?.forEach((img, index) => {
    const newImg = img.replace(/<img/, `<img loading="lazy"`);
    post.content = post.content.replace(img, newImg);
  });

  return {
    post,
    navItems,
  };
};
