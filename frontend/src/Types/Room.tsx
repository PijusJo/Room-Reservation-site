export interface Room {
    name: string;
    id: number;
    capacity: number;
    location: string;
    hasProjector: boolean;
    hasTV: boolean;
    hasVideoConferencing: boolean;
    hasWhiteBoard: boolean;
    status:boolean;
}