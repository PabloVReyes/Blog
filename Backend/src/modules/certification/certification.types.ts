import * as scheme from "./certification.scheme"

export interface CertificationCreateDto extends scheme.PostCertificationScheme {
    file?: Express.Multer.File
}

export interface CertificationUpdateDto extends CertificationCreateDto { }