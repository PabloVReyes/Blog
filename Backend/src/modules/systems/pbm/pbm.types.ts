import * as schema from "./pbm.schema"


export interface PbmCreateDto extends schema.PostPbmSchema {
    file?: Express.Multer.File;
}

export interface PbmUpdateDto extends schema.PutPBMSchema {
    file?: Express.Multer.File;
}