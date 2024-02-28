import PocketBase from "pocketbase";
import {PUBLIC_POCKETBASE_URL} from '$env/static/public';

export default function usePb() {
    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    return pb;
}