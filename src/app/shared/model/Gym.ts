import { Locale } from './Locale';
import { Sport } from './Sport';

export interface Gym {
  name: string;
  shortDescription: string;
  locale: Locale;
  sportPracticable?: Sport[];
  rules?: string;
  localeId?: number;
}
