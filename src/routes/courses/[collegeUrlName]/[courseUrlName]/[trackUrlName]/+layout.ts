import type {LayoutLoad} from './$types';
import Track from "$lib/models/Track";
import navStore, {type NavItem} from "$lib/stores/navStore";
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({parent, params, fetch}) => {
    const {course} = await parent();

    const track = course.tracks.find(t => t.urlName === params.trackUrlName) || error(404, 'Track not found');

    return {
        track
    }
};