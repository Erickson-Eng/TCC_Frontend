import { Locale } from './Locale';
import { Sport } from './Sport';

export interface Gym {
  id: number;
  name: string;
  shortDescription: string;
  locale: Locale;
  rules?: string;
  localeId?: number;
  sportPracticable?: number[];
  sports?: Sport[];
  managerId?: number;
  imageId: number;
  imageSrc?: string;
}
