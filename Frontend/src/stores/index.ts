import { createCrudStores } from "./createCrudStores"
import { crudApiRegistry } from "./crudApiRegistry"
export { useAppStore } from "./appStore"

export { registerStoreReset, resetAllStores } from "./storeResetRegistry"
export { createCrudStore } from "./createCrudStore"

export const {
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