import * as scheme from "./uveh.scheme"

export interface DownloadsCreateDto extends scheme.PostDownloadScheme {
    file?: Express.Multer.File
}

export interface DownloadsUpdateDto extends DownloadsCreateDto { }