import type {LayoutLoad} from './$types';
import Track from "$lib/models/Track";

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {pb, course} = await parent();

    return {}
};