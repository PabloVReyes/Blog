import { certificationApi } from "@/features/Certification/private/api/Certification"
import { directoryApi } from "@/features/Directory/private/api/Directory"
import { downloadAreaApi } from "@/features/Downloads/private/api/Areas"
import { downloadApi } from "@/features/Downloads/private/api/Downloads"
import { homeAccessCardApi } from "@/features/Home/private/api/AccessCard"
import * as homeAlertApi from "@/features/Home/private/api/Alert"
import * as homeCalendarApi from "@/features/Home/private/api/Calendar"
import { homeCarouselApi } from "@/features/Home/private/api/Carousel"
import * as homeDerechohabienciaApi from "@/features/Home/private/api/Derechohabiencia"
import { juristicApi } from "@/features/Juristic/private/api/Juristic"
import * as macroprocessApi from "@/features/Macroprocess/private/api/Macroprocess"
import * as macroprocessAreaApi from "@/features/Macroprocess/private/api/Areas"
import * as macroprocessManualTypeApi from "@/features/Macroprocess/private/api/ManualsTypes"
import { settingsPermissionsApi } from "@/features/Settings/private/api/Permissions"
import { settingsUsersApi } from "@/features/Settings/private/api/Users"
import { settingsRolesApi } from "@/features/Settings/private/api/Roles"
import { standardsApi } from "@/features/Standards/private/api/Standards"
import * as systemsAdverseEventsApi from "@/features/Systems/private/api/AdverseEvents"
import { systemsAgreementPersonApi } from "@/features/Systems/private/api/AgreementPerson"
import { systemsCareProtocolsApi } from "@/features/Systems/private/api/CareProtocols"
import { systemsCBIMApi } from "@/features/Systems/private/api/CBIM"
import { systemsCIE10Api } from "@/features/Systems/private/api/CIE10"
import { systemsClinicalPracticeGuidelinesApi } from "@/features/Systems/private/api/ClinicalPracticeGuidelines"
import { systemsGPCApi } from "@/features/Systems/private/api/GPC"
import { systemsMonthlyReportsApi } from "@/features/Systems/private/api/MonthlyReports"
import { systemsPBMApi } from "@/features/Systems/private/api/PBM"
import { systemsApi } from "@/features/Systems/private/api/Systems"
import { UVEHApi } from "@/features/UVEH/private/api/UVEH"
import { vacationShiftApi } from "@/features/Vacation/private/api/Shift"
import { vacationApi } from "@/features/Vacation/private/api/Vacation"

export const crudApiRegistry = {
    certification: certificationApi,
    directory: directoryApi,
    downloadAreas: downloadAreaApi,
    download: downloadApi,
    homeAccessCard: homeAccessCardApi,
    homeAlert: {
        fetch: homeAlertApi.fetchAlert,
        update: homeAlertApi.updateAlert
    },
    homeCalendar: {
        fetch: homeCalendarApi.fetchCalendar,
        update: homeCalendarApi.updateCalendar
    },
    homeCarousel: homeCarouselApi,
    homeDerechohabiencia: {
        fetch: homeDerechohabienciaApi.fetchDerechohabiencia,
        update: homeDerechohabienciaApi.updateDerechohabiencia
    },
    juristic: juristicApi,
    macroprocess: {
        fetch: macroprocessApi.fetchManuals,
        update: macroprocessApi.updateManual,
        remove: macroprocessApi.deleteManual
    },
    macroprocessArea: {
        fetch: macroprocessAreaApi.fetchAreas,
        update: macroprocessAreaApi.updateArea
    },
    macroprocessManualType: {
        fetch: macroprocessManualTypeApi.fetchManualsTypes,
        update: macroprocessManualTypeApi.updateManualType
    },
    settingsPermissions: settingsPermissionsApi,
    settingsUsers: settingsUsersApi,
    settingsRoles: settingsRolesApi,
    standards: standardsApi,
    systemsAdverseEvents: {
        fetch: systemsAdverseEventsApi.fetchAdverseEvents,
        update: systemsAdverseEventsApi.updateAdverseEvent,
        remove: systemsAdverseEventsApi.deleteAdverseEvent
    },
    systemsAgreementPerson: systemsAgreementPersonApi,
    systemsCareProtocolsApi: systemsCareProtocolsApi,
    systemsCBIM: systemsCBIMApi,
    systemsCIE10: systemsCIE10Api,
    systemsClinicalPracticeGuidelines: systemsClinicalPracticeGuidelinesApi,
    systemsGPC: systemsGPCApi,
    systemsMonthlyReports: systemsMonthlyReportsApi,
    systemsPBM: systemsPBMApi,
    systems: systemsApi,
    UVEH: UVEHApi,
    vacationShift: vacationShiftApi,
    vacation: vacationApi
} as const

// 206 lineas -> 88 lineas