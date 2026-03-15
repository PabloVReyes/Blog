import * as schema from "./accesscard.schema"

export interface AccessCardCreateDto extends schema.PostAccessCardSchema {
    file?: Express.Multer.File;
}

export interface AccessCardUpdateDto extends schema.PutAccessCardSchema {
    file?: Express.Multer.File;
}