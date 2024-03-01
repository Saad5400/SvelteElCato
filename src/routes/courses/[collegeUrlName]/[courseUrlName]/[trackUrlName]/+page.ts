import type {PageLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: PageLoad = async ({parent, params}) => {
    const {course} = await parent();

    // TODO: redirect to the last visited step
    return redirect(302, `/courses/${course.college.urlName}/${course.urlName}/${params.trackUrlName}/${course.tracks[0].steps[0].id}`);
};