import { Locale } from './Locale';

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  socialName: string;
  birthDate: null;
  cpf: string;
  bodyMeasureList?: [];
  locale: Locale;
  username: string;
}
