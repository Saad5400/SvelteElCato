import type { PageLoad } from './$types';
import Course from "$lib/models/Course";
import Post from "$lib/models/Post";
import type { ClientResponseError } from "pocketbase";
import { error } from "@sveltejs/kit";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageLoad = async ({ parent, fetch }) => {
    const { pb } = await parent();

    const coursesRequest = pb.collection('courses')
        .getList(1, 10, {
            expand: 'college', fetch: async (url, config) => fetch(url, config)
        })
        .catch(handleError);

    const postsRequest = await pb.collection('posts')
        .getList(1, 10, {
            expand: 'tags', fetch: async (url, config) => fetch(url, config)
        })
        .catch(handleError);

    const [courses, posts] = await Promise.all([coursesRequest, postsRequest]);

    return {
        posts: Post.toClassList(posts),
        courses: Course.toClassList(courses)
    }
};