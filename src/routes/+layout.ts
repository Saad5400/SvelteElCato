import type {LayoutLoad} from './$types';
import usePb from "$lib/hooks/usePb";

export const load: LayoutLoad = () => {
    const pb = usePb();
    return {
        pb
    }
};