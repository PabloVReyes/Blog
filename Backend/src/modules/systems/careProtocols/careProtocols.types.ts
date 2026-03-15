import * as schema from "./careProtocols.schema";

export interface CareProtocolsCreateDto extends schema.PostCareProtocolsSchema {
    file?: Express.Multer.File
}

export interface CareProtocolsUpdateDto extends schema.PutCareProtocolsSchema {
    file?: Express.Multer.File
}