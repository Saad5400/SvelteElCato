import type {LayoutLoad} from './$types';
import Track from "$lib/models/Track";
import navStore, {type NavItem} from "$lib/stores/navStore";

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {course} = await parent();

    const quiz = course.quizzes.find(q => q.urlName === params.quizUrlName)!;

    return {
        quiz
    }
};