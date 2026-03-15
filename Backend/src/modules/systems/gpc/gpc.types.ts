import * as schema from "./gpc.schema";

export interface GpcCreateDto extends schema.PostGpcSchema {
    file?: Express.Multer.File
}

export interface GpcUpdateDto extends schema.PutGpcSchema {
    file?: Express.Multer.File
}