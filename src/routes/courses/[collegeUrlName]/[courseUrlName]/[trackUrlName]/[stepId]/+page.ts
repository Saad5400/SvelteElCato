import type {PageLoad} from './$types';

export const load: PageLoad = async ({parent, params}) => {
    const {track} = await parent();

    const step = track.steps.find(s => s.id === params.stepId)!;

    const isExternal = step.type === 'external';

    return {
        step,
        redirectTime: isExternal ? 5 : -1,
        isExternal,
    }
};