import { Gym } from "./Gym";
import { Locale } from "./Locale";

export interface Manager {
  id: number,
  firstName: string,
  lastName: string,
  socialName?: string,
  locale:Locale,
  gyms?: Gym[]
}
