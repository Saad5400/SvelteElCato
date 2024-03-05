import type {PageLoad} from './$types';
import Post from "$lib/models/Post";
import {handleError} from "$lib/models/TypedPocketBase";

export const load: PageLoad = async ({parent, params, fetch}) => {
    const {pb} = await parent();

    return {
        post: Post.toClass(await pb.collection('posts')
            .getFirstListItem(
                pb.filter("urlName = {:urlName}", {urlName: params.urlName}),
                {
                    expand: 'tags',
                    fetch: async (url, config) => fetch(url, config)
                }
            )
            .catch(handleError)
        )
    }
};