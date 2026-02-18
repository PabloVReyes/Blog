import { PostMonthlyReportsSchema, PutMonthlyReportsSchema } from "./monthlyReports.schema";

export interface MontghlyReportsCreateDto extends PostMonthlyReportsSchema {
    file?: Express.Multer.File;
}

export interface MontghlyReportsUpdateDto extends PutMonthlyReportsSchema {
    file?: Express.Multer.File;
}