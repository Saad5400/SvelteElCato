import type {PageLoad} from './$types';
import Course from "$lib/models/Course";
import Post from "$lib/models/Post";

export const load: PageLoad = async ({parent, fetch}) => {
    const {pb} = await parent();

    return {
        posts: Post.toClassList(await pb.collection('posts').getList(1, 10, {
            expand: 'tags', fetch: async (url, config) => fetch(url, config)
        })),
        courses: Course.toClassList(await pb.collection('courses').getList(1, 10, {
            expand: 'college', fetch: async (url, config) => fetch(url, config)
        }))
    }
};