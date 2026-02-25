import { PostGpcScheme, PutGpcScheme } from "./gpc.scheme";

export interface GpcCreateDto extends PostGpcScheme {
    file: Express.Multer.File
}

export interface GpcUpdateDto extends PutGpcScheme {
    file: Express.Multer.File
}