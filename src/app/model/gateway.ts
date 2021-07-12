import { Peripheral } from "./peripheral";

export interface Gateway {
    id: number;
    serialNumber: string;
    name: string;
    ipAddress: string;
    peripheralList?: Peripheral[];
  }