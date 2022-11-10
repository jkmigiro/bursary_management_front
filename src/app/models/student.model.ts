import {StudentRelation} from './student-relation.model';
import {School} from './school.model';
import {Address} from './address.model';
import {User} from './user.model';
import {County} from './county.model';

export class Student extends User {

    public id: number;
    public nemisNumber: string; // Personal
    public school: School; // School bado
    public forNumber: number; // Personal
    public id1: number; // Personal
    public studentNumber: number; // When Joining Secondary
    public studentRelation: StudentRelation; // Personal bado
    public county: County = null;
    public subCounty: string = null;
    public wardName: string;
    public  studentDeclaration: boolean;
}
