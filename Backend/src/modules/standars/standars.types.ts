import * as scheme from "./standars.scheme"

export interface StandarCreateDto extends scheme.PostStandarScheme {
    file?: Express.Multer.File
}

export interface StandarUpdateDto extends StandarCreateDto { }