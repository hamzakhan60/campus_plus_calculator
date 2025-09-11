export type Room {
  id: string;            // uuid
  room: string;          // text
  day: string;           // text
  time: string;          // text
  occupied: boolean;     // boolean
  createdAt: string;     // timestamptz (ISO string)
}
