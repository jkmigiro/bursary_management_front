import {Student} from './student.model';
import {Application} from './application.model';
import {DocumentType} from '../enums/document-type.enum';

export class Document {
  public id: number;
  public document: File;
  public documentType: DocumentType = null;
  public fileName: string;
  public application: Application;
  public remarks: string;
  public fileType: string;
  public dateUploaded: Date;
  public filePath: string;
}
