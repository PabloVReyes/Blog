import * as scheme from "./standards.scheme"

export interface StandarCreateDto extends scheme.PostStandardScheme {
    file?: Express.Multer.File
}

export interface StandarUpdateDto extends StandarCreateDto { }