import { PostAccessCardSchema, PutAccessCardSchema } from "./accesscard.schema";

export interface AccessCardCreateDto extends PostAccessCardSchema {
    file?: Express.Multer.File;
}

export interface AccessCardUpdateDto extends PutAccessCardSchema {
    file?: Express.Multer.File;
}