import {Country} from './country.model';
import {County} from './county.model';

export class Address {
  public address1: string = null;
  public address2: string = null;
  public country: Country = null;
  public county: County = null; // If country is Kenya show counties
  public subCounty: string = null; // If country is Kenya show sub county
  public wardName: string = null; // To be used by students only
  public postalCode: string = null;
  public zipCode: string = null;
}
