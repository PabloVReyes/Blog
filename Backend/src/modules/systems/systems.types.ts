import { PostSystemSchema, PutSystemSchema } from "./system.schema";

export interface SystemCreateDto extends PostSystemSchema {
    file?: Express.Multer.File;
}

export interface SystemUpdateDto extends PutSystemSchema {
    file?: Express.Multer.File;
}