import { PostClinicalPracticeGuidelinesScheme, PutClinicalPracticeGuidelinesScheme } from "./clinicalPracticeGuidelines.scheme"

export interface ClinicalPracticeGuidelinesFileDto {
    er?: Express.Multer.File
    rr?: Express.Multer.File
}

export interface ClinicalPracticeGuidelinesCreateDto extends PostClinicalPracticeGuidelinesScheme, ClinicalPracticeGuidelinesFileDto { }

export interface ClinicalPracticeGuidelinesUpdateDto extends PutClinicalPracticeGuidelinesScheme, ClinicalPracticeGuidelinesFileDto { }