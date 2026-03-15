import * as schema from "./vacations.schema"

export interface VacationsCreateDto extends schema.PostVacationSchema {
    file?: Express.Multer.File;
}

export interface VacationsUpdateDto extends VacationsCreateDto {

}