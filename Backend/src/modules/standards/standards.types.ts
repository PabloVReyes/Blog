import * as schema from "./standards.schema"

export interface StandarCreateDto extends schema.PostStandardSchema {
    file?: Express.Multer.File
}

export interface StandarUpdateDto extends StandarCreateDto { }