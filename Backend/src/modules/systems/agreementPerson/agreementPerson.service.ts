import { GetAgreementPersonsSchema, PostAgreementPersonsSchema, PostZoneSchema, PutAgreementPersonsSchema } from "./agreementPersons.scheme";
import * as repo from "./agreementPerson.repository"
import { getPagination } from "@/utils/pagination";

////////////
// CREATE //
////////////

export const postAgreementPersonService = async (dto: PostAgreementPersonsSchema) => {
    const { name, group, zone, type, holder } = dto

    return await repo.postAgreementPersonRepository({
        name,
        type,
        group,
        zone,
        holder
    })
}

export const postZoneService = async (dto: PostZoneSchema) => {
    const { name } = dto

    return await repo.postZoneRepository(name)
}

export const postGroupService = async (dto: PostZoneSchema) => {
    const { name } = dto

    return await repo.postGroupRepository(name)
}

//////////
// READ //
//////////

export const getAgreementPersonWithDependentsService = async (dto: GetAgreementPersonsSchema) => {
    const { page, limit, search, groupId, zoneId } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getAgreementPersonWithDependentsRepository({
        skip,
        take,
        search,
        groupId,
        zoneId
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getAgreementPersonService = async (dto: GetAgreementPersonsSchema) => {
    const { page, limit, search, groupId, zoneId } = dto
    const { skip, take } = getPagination(page, limit)

    const { data, total } = await repo.getAgreementPersonRepository({
        skip,
        take,
        search,
        groupId,
        zoneId
    })

    return {
        data,
        meta: {
            total,
            page: page ?? 1,
            limit: limit ?? total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
            firstItem: page && limit * (page - 1) + 1,
            lastItem: page && Math.min(total, limit * page)
        }
    }
}

export const getGroupService = async () => {
    const { data, total } = await repo.getGroupsRepository()

    return {
        data,
        meta: {
            total,
        }
    }
}

export const getZonesService = async () => {
    const { data, total } = await repo.getZonesRepository()

    return {
        data,
        meta: {
            total,
        }
    }
}

////////////
// UPDATE //
////////////

export const putAgreementPersonService = async (id: number, dto: PutAgreementPersonsSchema) => {
    const { name, group, zone, type, holder } = dto

    const person = await repo.getAgreementPersonByIdRepository(id)

    if (person.type !== type && person._count.children > 0) {
        throw new Error("No se puede modificar el tipo debido a que el titular tiene dependientes")
    }

    return await repo.putAgreementPersonRepository({
        id,
        name,
        type,
        group,
        zone,
        holder
    })
}


////////////
// DELETE //
////////////

export const deleteAgreementPersonService = async (id: number) => {

    const person = await repo.getAgreementPersonByIdRepository(id)

    if (person._count.children > 0) {
        throw new Error("No se puede eliminar el paciente de convenio debido a que tiene dependientes")
    }

    await repo.deleteAgreementPersonRepository(id)

    return true
}