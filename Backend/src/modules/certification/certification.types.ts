import * as schema from "./certification.schema"

export interface CertificationCreateDto extends schema.PostCertificationSchema {
    file?: Express.Multer.File
}

export interface CertificationUpdateDto extends CertificationCreateDto { }