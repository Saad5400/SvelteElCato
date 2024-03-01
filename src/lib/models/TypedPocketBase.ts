import PocketBase, {RecordService} from "pocketbase";
import type College from "$lib/models/College";
import type Course from "$lib/models/Course";
import type Post from "$lib/models/Post";
import type Step from "$lib/models/Step";
import type Tag from "$lib/models/Tag";
import type Track from "$lib/models/Track";

export default interface TypedPocketBase extends PocketBase {
    // collection(idOrName: 'colleges'): RecordService<College>
    // collection(idOrName: 'courses'): RecordService<Course>
    // collection(idOrName: 'posts'): RecordService<Post>
    // collection(idOrName: 'steps'): RecordService<Step>
    // collection(idOrName: 'tags'): RecordService<Tag>
    // collection(idOrName: 'tracks'): RecordService<Track>
}