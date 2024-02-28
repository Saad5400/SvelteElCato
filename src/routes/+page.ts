import type {PageLoad} from './$types';

export const load: PageLoad = async ({parent}) => {
    const {pb} = await parent();

    return {
        posts: await pb.collection('posts').getList(1, 10, {expand: 'tags'}),
        courses: await pb.collection('courses').getList(1, 10, {expand: 'college'}),
    }
};