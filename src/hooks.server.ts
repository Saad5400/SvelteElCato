import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
    const response = await resolve(event, {
        preload: ({type, path}) => {
            // Preload specific fonts along with the default .js and .css files
            if ((path.endsWith('Handjet.ttf'))) {
                return true; // Return true to preload this font
            }
            // Keep the default preloading behavior for .js and .css files
            return type === 'js' || type === 'css';
        }
    });

    return response;
};
