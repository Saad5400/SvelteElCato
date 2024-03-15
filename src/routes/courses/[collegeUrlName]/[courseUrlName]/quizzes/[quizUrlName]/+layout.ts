import type { LayoutLoad } from './$types';
import Track from "$lib/models/Track";
import navStore, { type NavItem } from "$lib/stores/navStore";
import { error } from '@sveltejs/kit';
import { handleError } from '$lib/models/TypedPocketBase';
import Quiz from '$lib/models/Quiz';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
    const { course, pb } = await parent();

    let quiz = course.quizzes.find(q => q.urlName === params.quizUrlName) || error(404, 'Quiz not found');
    let quizWithQuestions = await pb.collection('quizzes')
        .getFirstListItem(
            pb.filter("id = {:quizId}", { quizId: quiz.id }),
            {
                expand: 'questions',
                fetch: async (url, config) => fetch(url, config)
            }
        )
        .catch(handleError);

    quiz = new Quiz(quizWithQuestions);

    return {
        quiz
    }
};