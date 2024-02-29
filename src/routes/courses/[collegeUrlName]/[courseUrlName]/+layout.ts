import type {LayoutLoad} from './$types';

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {pb} = await parent();

    return {
        course: await pb.collection('courses')
            .getFirstListItem(
                `urlName="${params.courseUrlName}" && college.urlName="${params.collegeUrlName}"`,
                {expand: 'college,tracks'}
            )
    }
};