import type {LayoutLoad} from './$types';
import Track from "$lib/models/Track";
import navStore, {type NavItem} from "$lib/stores/navStore";
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {course} = await parent();

    const quiz = course.quizzes.find(q => q.urlName === params.quizUrlName) || error(404, 'Quiz not found');

    return {
        quiz
    }
};