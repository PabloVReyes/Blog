import * as usersApi from "@/features/Settings/private/api/Users"
import * as certificationApi from "@/features/Certification/private/api/Certification"
import * as directoryApi from "@/features/Directory/private/api/Directory"
import * as downloadAreaApi from "@/features/Downloads/private/api/Areas"
import * as downloadApi from "@/features/Downloads/private/api/Downloads"
import * as homeAccessCardApi from "@/features/Home/private/api/AccessCard"
import * as homeAlertApi from "@/features/Home/private/api/Alert"
import * as homeCalendarApi from "@/features/Home/private/api/Calendar"
import * as homeCarouselApi from "@/features/Home/private/api/Carousel"
import * as homeDerechohabienciaApi from "@/features/Home/private/api/Derechohabiencia"
import * as juristicApi from "@/features/Juristic/private/api/Juristic"
import * as macroprocessApi from "@/features/Macroprocess/private/api/Macroprocess"
import * as macroprocessAreaApi from "@/features/Macroprocess/private/api/Areas"
import * as macroprocessManualTypeApi from "@/features/Macroprocess/private/api/ManualsTypes"
import * as settingsPermissionsApi from "@/features/Settings/private/api/Permissions"
import * as settingsUsersApi from "@/features/Settings/private/api/Users"
import * as settingsRolesApi from "@/features/Settings/private/api/Roles"
import * as standardsApi from "@/features/Standards/private/api/Standards"
import * as systemsAdverseEventsApi from "@/features/Systems/private/api/AdverseEvents"
import * as systemsAgreementPersonApi from "@/features/Systems/private/api/AgreementPerson"
import * as systemsCareProtocolsApi from "@/features/Systems/private/api/CareProtocols"
import * as systemsCBIMApi from "@/features/Systems/private/api/CBIM"
import * as systemsCIE10Api from "@/features/Systems/private/api/CIE10"
import * as systemsClinicalPracticeGuidelinesApi from "@/features/Systems/private/api/ClinicalPracticeGuidelines"
import * as systemsGPCApi from "@/features/Systems/private/api/GPC"
import * as systemsMonthlyReportsApi from "@/features/Systems/private/api/MonthlyReports"
import * as systemsPBMApi from "@/features/Systems/private/api/PBM"
import * as systemsApi from "@/features/Systems/private/api/Systems"
import * as UVEHApi from "@/features/UVEH/private/api/UVEH"
import * as vacationShiftApi from "@/features/Vacation/private/api/Shift"
import * as vacationApi from "@/features/Vacation/private/api/Vacation"

export const crudApiRegistry = {
    users: {
        update: usersApi.updateUser,
        remove: usersApi.deleteUser
    },
    certification: {
        fetch: certificationApi.fetchCertifications,
        add: certificationApi.addCertification,
        update: certificationApi.updateCertification,
        remove: certificationApi.deleteCertification
    },
    directory: {
        fetch: directoryApi.fetchDirectory,
        add: directoryApi.addDirectory,
        update: directoryApi.updateDirectory,
        remove: directoryApi.deleteDirectory
    },
    downloadAreas: {
        fetch: downloadAreaApi.fetchAreas,
        add: downloadAreaApi.addArea,
        update: downloadAreaApi.updateArea,
        remove: downloadAreaApi.deleteArea
    },
    download: {
        fetch: downloadApi.fetchDownloads,
        add: downloadApi.addDownload,
        update: downloadApi.updateDownload,
        remove: downloadApi.deleteDownload
    },
    homeAccessCard: {
        fetch: homeAccessCardApi.fecthAccessCard,
        add: homeAccessCardApi.addAccessCard,
        update: homeAccessCardApi.updateAccessCard,
        remove: homeAccessCardApi.deleteAccessCard
    },
    homeAlert: {
        fetch: homeAlertApi.fecthAlert,
        update: homeAlertApi.updateAlert
    },
    homeCalendar: {
        fetch: homeCalendarApi.fecthCalendar,
        update: homeCalendarApi.updateCalendar
    },
    homeCarousel: {
        fetch: homeCarouselApi.fecthCarousel,
        add: homeCarouselApi.addCarousel,
        update: homeCarouselApi.updateCarousel,
        remove: homeCarouselApi.deleteCarousel
    },
    homeDerechohabiencia: {
        fetch: homeDerechohabienciaApi.fecthDerechohabiencia,
        update: homeDerechohabienciaApi.updateDerechohabiencia
    },
    juristic: {
        fetch: juristicApi.fetchJuristics,
        add: juristicApi.addJuristic,
        update: juristicApi.updateJuristic,
        remove: juristicApi.deleteJuristic
    },
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
    settingsPermissions: {
        fetch: settingsPermissionsApi.fecthPermissions,
        add: settingsPermissionsApi.addPermission,
        update: settingsPermissionsApi.updatePermission,
        remove: settingsPermissionsApi.deletePermission
    },
    settingsUsers: {
        fetch: settingsUsersApi.fecthUsers,
        add: settingsUsersApi.addUser,
        update: settingsUsersApi.updateUser,
        remove: settingsUsersApi.deleteUser
    },
    settingsRoles: {
        fetch: settingsRolesApi.fecthRoles,
        add: settingsRolesApi.addRole,
        update: settingsRolesApi.updateRoles,
        remove: settingsRolesApi.deleteRole
    },
    standards: {
        fetch: standardsApi.fetchStandards,
        add: standardsApi.addStandar,
        update: standardsApi.updateStandard,
        remove: standardsApi.deleteStandard
    },
    systemsAdverseEvents: {
        fetch: systemsAdverseEventsApi.fetchAdverseEvents,
        update: systemsAdverseEventsApi.updateAdverseEvent,
        remove: systemsAdverseEventsApi.deleteAdverseEvent
    },
    systemsAgreementPerson: {
        fetch: systemsAgreementPersonApi.fetchAgreementPerson,
        add: systemsAgreementPersonApi.addAgreementPerson,
        update: systemsAgreementPersonApi.updateAgreementPerson,
        remove: systemsAgreementPersonApi.deleteAgreementPerson
    },
    systemsCareProtocolsApi: {
        fetch: systemsCareProtocolsApi.fecthCareProtocols,
        add: systemsCareProtocolsApi.addCareProtocols,
        update: systemsCareProtocolsApi.updateCareProtocols,
        remove: systemsCareProtocolsApi.deleteCareProtocols
    },
    systemsCBIM: {
        fetch: systemsCBIMApi.fecthCBIM,
        add: systemsCBIMApi.addCBIM,
        update: systemsCBIMApi.updateCBIM,
        remove: systemsCBIMApi.deleteCBIM
    },
    systemsCIE10: {
        fetch: systemsCIE10Api.fecthCIE10,
        add: systemsCIE10Api.addCIE10,
        update: systemsCIE10Api.updateCIE10,
        remove: systemsCIE10Api.deleteCIE10
    },
    systemsClinicalPracticeGuidelines: {
        fetch: systemsClinicalPracticeGuidelinesApi.fetchGuides,
        add: systemsClinicalPracticeGuidelinesApi.addGuide,
        update: systemsClinicalPracticeGuidelinesApi.updateGuide,
        remove: systemsClinicalPracticeGuidelinesApi.deleteGuide
    },
    systemsGPC: {
        fetch: systemsGPCApi.fetchGPC,
        add: systemsGPCApi.addGPC,
        update: systemsGPCApi.updateGPC,
        remove: systemsGPCApi.deleteGPC
    },
    systemsMonthlyReports: {
        fetch: systemsMonthlyReportsApi.fetchMonthlyReports,
        add: systemsMonthlyReportsApi.addMonthlyReports,
        update: systemsMonthlyReportsApi.updateMonthlyReports,
        remove: systemsMonthlyReportsApi.deleteMonthlyReports
    },
    systemsPBM: {
        fetch: systemsPBMApi.fetchPBM,
        add: systemsPBMApi.addPBM,
        update: systemsPBMApi.updatePBM,
        remove: systemsPBMApi.deletePBM
    },
    systems: {
        fetch: systemsApi.fetchSystems,
        add: systemsApi.addSystem,
        update: systemsApi.updateSystem,
        remove: systemsApi.deleteSystem
    },
    UVEH: {
        fetch: UVEHApi.fetchDownloads,
        add: UVEHApi.addDownload,
        update: UVEHApi.updateDownload,
        remove: UVEHApi.deleteDownload
    },
    vacationShift: {
        fetch: vacationShiftApi.fetchShifts,
        add: vacationShiftApi.addShift,
        update: vacationShiftApi.updateShift,
        remove: vacationShiftApi.deleteShift
    },
    vacation: {
        fetch: vacationApi.fetchVacations,
        add: vacationApi.addVacation,
        update: vacationApi.updateVacation,
        remove: vacationApi.deleteVacation
    }
}