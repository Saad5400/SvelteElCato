import PocketBase, {type ClientResponseError, RecordService} from "pocketbase";
import type College from "$lib/models/College";
import type Course from "$lib/models/Course";
import type Post from "$lib/models/Post";
import type Step from "$lib/models/Step";
import type Tag from "$lib/models/Tag";
import type Track from "$lib/models/Track";
import {error} from "@sveltejs/kit";

export default interface TypedPocketBase extends PocketBase {
    // collection(idOrName: 'colleges'): RecordService<College>
    // collection(idOrName: 'courses'): RecordService<Course>
    // collection(idOrName: 'posts'): RecordService<Post>
    // collection(idOrName: 'steps'): RecordService<Step>
    // collection(idOrName: 'tags'): RecordService<Tag>
    // collection(idOrName: 'tracks'): RecordService<Track>
}

export function handleError(er: ClientResponseError) {
    const status = er.status >= 400 && er.status < 600 ? er.status : 500;
    return error(status, `${JSON.stringify(er.response)}\n${JSON.stringify(er.originalError)}\n${er.originalError}`);
}