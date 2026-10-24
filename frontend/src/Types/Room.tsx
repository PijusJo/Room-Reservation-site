export interface Room {
    name: string;
    id: number;
    capacity: number;
    floor: string;
    hasProjector: boolean;
    hasTV: boolean;
    hasVideoConferencing: boolean;
    hasWhiteBoard: boolean;
    status:boolean;
}