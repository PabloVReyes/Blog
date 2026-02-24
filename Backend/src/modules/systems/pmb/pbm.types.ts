import { PostPbmScheme, PutPBMScheme } from "./pbm.scheme"


export interface PbmCreateDto extends PostPbmScheme {
    file?: Express.Multer.File;
}

export interface PbmUpdateDto extends PutPBMScheme {
    file?: Express.Multer.File;
}