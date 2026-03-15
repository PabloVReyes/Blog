import * as schema from "./clinicalPracticeGuidelines.schema"

export interface ClinicalPracticeGuidelinesFileDto {
    er?: Express.Multer.File
    rr?: Express.Multer.File
}

export interface ClinicalPracticeGuidelinesCreateDto extends schema.PostClinicalPracticeGuidelinesSchema, ClinicalPracticeGuidelinesFileDto { }

export interface ClinicalPracticeGuidelinesUpdateDto extends schema.PutClinicalPracticeGuidelinesSchema, ClinicalPracticeGuidelinesFileDto { }