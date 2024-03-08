import type {PageLoad} from './$types';
import Post from "$lib/models/Post";
import {handleError} from "$lib/models/TypedPocketBase";
import useHighlight from "$lib/hooks/useHighlight";
import slugify from "@sindresorhus/slugify";
import navStore, {type NavItem} from "$lib/stores/navStore";

export const load: PageLoad = async ({parent, params, fetch}) => {
    const {pb} = await parent();

    const post = Post.toClass(await pb.collection('posts')
        .getFirstListItem(
            pb.filter("urlName = {:urlName}", {urlName: params.urlName}),
            {
                expand: 'tags',
                fetch: async (url, config) => fetch(url, config)
            }
        )
        .catch(handleError)
    );

    post.content = useHighlight(post.content);

    let navItems: NavItem[] = [];
    const h1Elements = post.content.match(/<h1.*?>(.*?)<\/h1>/g);
    h1Elements?.forEach((h1, index) => {
        const content = h1.replace(/<[^>]*>/g, '');
        const slug = slugify(content);
        const newH1 = h1.replace(/<h1/, `<h1 id="${slug}"`);
        post.content = post.content.replace(h1, newH1);
        navItems.push({
            title: content,
            href: `#${slug}`
        });
    });
    navStore.set({
        title: 'محتويات الصفحة',
        items: navItems
    });

    return {
        post
    }
};