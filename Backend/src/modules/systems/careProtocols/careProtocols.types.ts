import { PostCareProtocolsScheme, PutCareProtocolsScheme } from "./careProtocols.scheme";

export interface CareProtocolsCreateDto extends PostCareProtocolsScheme {
    file?: Express.Multer.File
}

export interface CareProtocolsUpdateDto extends PutCareProtocolsScheme {
    file?: Express.Multer.File
}