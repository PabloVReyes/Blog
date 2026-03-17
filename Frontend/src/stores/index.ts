import { createCrudStores } from "./createCrudStores"
import { crudApiRegistry } from "./crudApiRegistry"

export { registerStoreReset, resetAllStores } from "./storeResetRegistry"
export { createCrudStore } from "./createCrudStore"

export const {
    useUsersStore,
    useCertificationStore,
    useDirectoryStore,
    useDownloadAreasStore,
    useDownloadStore,
    useHomeAccessCardStore,
    useHomeAlertStore,
    useHomeCalendarStore,
    useHomeCarouselStore,
    useHomeDerechohabienciaStore,
    useJuristicStore,
    useMacroprocessStore,
    useMacroprocessAreaStore,
    useMacroprocessManualTypeStore,
    useSettingsPermissionsStore,
    useSettingsUsersStore,
    useSettingsRolesStore,
    useStandardsStore,
    useSystemsAdverseEventsStore,
    useSystemsAgreementPersonStore,
    useSystemsCareProtocolsApiStore,
    useSystemsCBIMStore,
    useSystemsCIE10Store,
    useSystemsClinicalPracticeGuidelinesStore,
    useSystemsGPCStore,
    useSystemsMonthlyReportsStore,
    useSystemsPBMStore,
    useSystemsStore,
    useUVEHStore,
    useVacationShiftStore,
    useVacationStore
} = createCrudStores(crudApiRegistry)