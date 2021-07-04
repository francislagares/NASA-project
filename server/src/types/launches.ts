export interface ILaunches {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: string;
  customer: string[];
  upcoming: boolean;
  success: boolean;
}
