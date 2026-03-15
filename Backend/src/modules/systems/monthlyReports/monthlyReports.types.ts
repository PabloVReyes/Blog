import * as schema from "./monthlyReports.schema"

export interface MontghlyReportsCreateDto extends schema.PostMonthlyReportsSchema {
    file?: Express.Multer.File;
}

export interface MontghlyReportsUpdateDto extends schema.PutMonthlyReportsSchema {
    file?: Express.Multer.File;
}