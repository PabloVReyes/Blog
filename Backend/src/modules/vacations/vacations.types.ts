import * as scheme from "./vacations.scheme"

export interface VacationsCreateDto extends scheme.PostVacationScheme {
    file?: Express.Multer.File;
}

export interface VacationsUpdateDto extends VacationsCreateDto {

}