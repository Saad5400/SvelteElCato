import type {LayoutLoad} from './$types';
import Course from "$lib/models/Course";

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {pb} = await parent();

    return {
        course: Course.toClass(
            await pb.collection('courses')
                .getFirstListItem(
                    pb.filter("urlName = {:courseUrlName} && college.urlName = {:collegeUrlName}", {
                        courseUrlName: params.courseUrlName,
                        collegeUrlName: params.collegeUrlName
                    }),
                    {expand: 'college,tracks,tracks.steps'}
                )
        )
    }
};