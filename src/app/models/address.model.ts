import {Country} from './country.model';
import {County} from './county.model';

export class Address {
  public address1: string = null;
  public address2: string = null;
  public country: Country = null;
  public county: County = null;
  public subCounty: string = null;
  public wardName: string = null;
  public postalCode: string = null;
  public zipCode: string = null;
}
