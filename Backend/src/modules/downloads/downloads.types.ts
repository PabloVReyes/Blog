import * as scheme from "./downloads.scheme"

export interface DownloadsCreateDto extends scheme.PostDownloadScheme {
    file?: Express.Multer.File;
}

export interface DownloadsUpdateDto extends DownloadsCreateDto {}