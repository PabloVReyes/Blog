export const mapAgreementPerson = (person: any) => {
    const { children, parents, groupId, zoneId, ...rest } = person;

    return {
        ...rest,
        dependents: (children || [])
            .map((link: any) => link.dependent)
            .sort((a: any, b: any) => a.id - b.id),
        holders: (parents || [])
            .map((link: any) => link.parent)
            .sort((a: any, b: any) => a.id - b.id)
    };
};