import type {PageLoad} from './$types';

export const load: PageLoad = async ({parent, params}) => {
    const {pb} = await parent();

    return {
        
    }
};