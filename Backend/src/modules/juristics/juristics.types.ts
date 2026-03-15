import * as schema from "./juristics.schema"

export interface JuristicsCreateDto extends schema.PostJuristicSchema {
    file?: Express.Multer.File;
}

export interface JuristicsUpdateDto extends JuristicsCreateDto { }