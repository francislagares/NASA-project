export interface ILaunches {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
  customer: string[];
  upcoming: boolean;
  success: boolean;
}
