import type { Theme } from "./theme";
import type { User } from "./user";

export class ChannelElement {
    id: number = -1;
    name: string = "";
    img: string = "";
}

export class ChannelInfo {
    id: number = -1;
    name: string = "";
    img: string = "";
    creator: string = "";
    theme: Array<Theme> = [];
    users: Array<User> = [];
}