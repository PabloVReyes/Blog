import type { SystemProps } from "@/features/Systems/types";

export const FormValidate = (values: SystemProps) => ({
    name: values.name.length < 3
        ? "Introduce un nombre mayor a tres caracteres"
        : null,

    description: values.description.length < 3
        ? "Introduce una descripción más clara"
        : null,

    url: values.url && values.url.startsWith("/") || /^https?:\/\//.test(values.url)
        ? null
        : "Debe ser una ruta interna o una URL válida",

    icon: values.icon.length < 3
        ? "Selecciona el icono"
        : null,

    color: values.color.length < 3
        ? "Selecciona el color"
        : null,

})