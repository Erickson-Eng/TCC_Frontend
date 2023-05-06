import { Locale } from "./Locale";

export interface Profile {
  firstName: string;
  lastName: string;
  locale: Locale;
  socialName?: string;
  birthDate?: Date;
  cpf?: string;
}
