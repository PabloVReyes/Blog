import * as schema from "./uveh.schema"

export interface DownloadsCreateDto extends schema.PostDownloadSchema {
    file?: Express.Multer.File
}

export interface DownloadsUpdateDto extends DownloadsCreateDto { }