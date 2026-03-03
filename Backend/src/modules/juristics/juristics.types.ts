import * as scheme from "./juristics.scheme"

export interface JuristicsCreateDto extends scheme.PostJuristicScheme {
    file?: Express.Multer.File;
}

export interface JuristicsUpdateDto extends JuristicsCreateDto { }