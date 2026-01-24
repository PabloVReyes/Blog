import { IconBabyBottle, IconBabyCarriage, IconCalendarClock, IconChartHistogram, IconClipboardData, IconCoffin, IconCurrencyDollar, IconDropletFilled, IconFall, IconFileDollar, IconFlask, IconPillFilled, IconShield, IconSitemap, IconTestPipe, IconVirus } from "@tabler/icons-react";
import type { SystemsCardProps } from "./type";

export const systems: SystemsCardProps[] = [
    {
        title: "SICA - Sistema Integral Clinico Administrativo",
        description: "Gestión integral de expedientes clínicos y procesos administrativos",
        color: "green",
        icon: IconClipboardData
    },
    {
        title: "CIE-10 - Clasificación Internacional de Enfermedades",
        description: "Décima edición de la Clasificación Internacional de Enfermedades",
        color: "blue",
        icon: IconVirus
    },
    {
        title: "Informes Mensuales",
        description: "Informes mensajes de los resultados de alcance de metas e indicadores de productividad y desempeño",
        color: "violet",
        icon: IconChartHistogram
    },
    {
        title: "CBN - Cuadro Básico Integral de Medicamentos",
        description: "Herramienta normativa en México que agrupa, bajo criterios de eficacia, seguridad y calidad, los medicamentos esenciales necesarios para la atención médica en las instituciones públicas",
        color: "yellow",
        icon: IconPillFilled
    },
    {
        title: "GPC Cenetec - Guías de Práctica Clínica",
        description: "Conjunto de recomendaciones basadas en la mejor evidencia científica, desarrolladas sistemáticamente para ayudar a profesionales de la salud y pacientes a tomar decisiones sobre la atención médica más adecuada para una condición específica, buscando optimizar la calidad, seguridad y eficiencia del cuidado, y reduciendo la variabilidad clínica",
        color: "cyan",
        icon: IconClipboardData
    },
    {
        title: "Algoritmos del PBM - Patient Blood Management",
        description: "Protocolos o guías de actuación basadas en la evidencia utilizadas dentro del Patient Blood Management ",
        color: "red",
        icon: IconDropletFilled
    },
    {
        title: "Algoritmos GPC - Algoritmos de las Guías de Práctica Clínica",
        description: "Representaciones gráficas y secuenciales de las recomendaciones basadas en evidencia científica para el diagnóstico, tratamiento y seguimiento de enfermedades",
        color: "indigo",
        icon: IconSitemap
    },
    {
        title: "Protocolos de Atención (Pediatría)",
        description: "Guías estandarizadas basadas en evidencia científica que definen los procedimientos de prevención, diagnóstico y tratamiento para enfermedades infantiles",
        color: "teal",
        icon: IconBabyBottle
    },
    {
        title: "Seguridad del Paciente",
        description: "Material de Seguridad del Paciente",
        color: "green",
        icon: IconShield
    },
    {
        title: "Modulab - Sistema de Información de Laboratorio",
        description: "Simplifica la gestión de muestras, la centralización de datos y la personalización de todos los aspectos de tus workflows.",
        color: "blue",
        icon: IconTestPipe
    },
    {
        title: "ROTEM - Tromboelastometría Rotacional",
        description: "Es un dispositivo de diagnóstico en el punto de atención (POC) que analiza en tiempo real la hemostasia completa—desde la formación del coágulo hasta su lisis—utilizando sangre entera",
        color: "violet",
        icon: IconFlask
    },
    {
        title: "Eventos Adversos",
        description: "Cualquier suceso médico no deseado (un signo, síntoma o enfermedad) que ocurre en un paciente tratado con un producto farmacéutico o dispositivo médico, o durante la atención sanitaria, y que puede o no estar directamente relacionado con el tratamiento o proceso, pero causa daño, incluso grave, o un resultado desfavorable que requiere atención",
        color: "yellow",
        icon: IconFall
    },
    {
        title: "Programación Quirúrgica",
        description: "Proceso de gestión hospitalaria que organiza cronológicamente las cirugías, sincronizando recursos físicos (quirófanos), humanos (cirujanos, anestesiólogos, enfermería) y materiales",
        color: "cyan",
        icon: IconCalendarClock
    },
    {
        title: "Tabulador Polanco (Puebla)",
        description: "Tarifas de estudios clínicos, consultas o servicios médicos (que pueden incluir insumos)",
        color: "red",
        icon: IconCurrencyDollar
    },
    {
        title: "Tabulador Lasser",
        description: "",
        color: "indigo",
        icon: IconFileDollar
    },
    {
        title: "CEN - Certificado Electrónico de Nacimiento",
        description: "Es la versión digital del comprobante oficial de un nacimiento vivo, un documento único e intransferible que moderniza el proceso, agiliza el registro civil y otorga identidad legal al bebé desde el momento de su alumbramiento, incluyendo datos de salud y vacunación, siendo el primer paso para obtener el Acta de Nacimiento.",
        color: "teal",
        icon: IconBabyCarriage
    },
    {
        title: "CEDe - Certificado Electrónico de Defunción",
        description: "Es un documento oficial, gratuito y digital emitido por la Secretaría de Salud que certifica el fallecimiento y la causa de muerte de una persona",
        color: "green",
        icon: IconCoffin
    },
]