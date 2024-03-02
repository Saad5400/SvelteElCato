import type {PageLoad} from './$types';
import {error} from "@sveltejs/kit";
import {browser} from "$app/environment";

export const load: PageLoad = async ({parent, params}) => {
    const {track} = await parent();

    const step = track.steps.find(s => s.id === params.stepId) || error(404);

    const isExternal = step.type === 'external';

    if (isExternal && browser) open(step.linked, '_blank');

    return {
        step,
        redirectTime: isExternal ? 5 : -1,
        isExternal,
    }
};