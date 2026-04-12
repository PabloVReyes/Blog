// Regex para URL absoluta (https://...) o relativa (/hola)
export const URL_REGEX = /^(https?:\/\/[^\s]+|\/[^\s]*)$/;
export const MEDICAL_CODE_REGEX = /^\d{3}\.\d{3}\.\d{4}\.\d{2}$/;
export const EXTENSION_REGEX = /^\d{4}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PERMISSION_KEY_REGEX = /^[a-z]+\.(create|read|update|delete)$/;

// Validaciones comunes
export const validateTitle = (value: string) =>
    value.length < 3 ? "El título debe tener al menos 3 caracteres" : null;

export const validateDescription = (value: string) =>
    value.length < 3 ? "La descripción debe tener al menos 3 caracteres" : null;

export const validatePresentation = (value: string) =>
    value.length < 3 ? "La presentación debe tener al menos 3 caracteres" : null;

export const validateIcon = (value: string) =>
    value.length < 3 ? "Selecciona el Icono" : null;

export const validateColor = (value: string) =>
    value.length < 3 ? "Selecciona el Color" : null;

export const validateCode = (value: string) =>
    value.length < 1 ? "El código debe tener al menos 1 caracter" : null;

// Validación de URL con opciones para requerirla o permitir solo relativas
export const validateUrl = (
    value?: string | null,
    options?: {
        required?: boolean;
        allowRelative?: boolean;
    }
) => {
    const { required = false } = options || {};

    if (!value) {
        return required ? "La URL es requerida" : null;
    }

    if (!URL_REGEX.test(value)) return "La URL no es válida";

    return null;
};

export const validateSelect = (
    value: string | number | null,
    options?: {
        required?: boolean;
        allowRelative?: boolean;
    }
) => {
    const { required = false } = options || {};

    if (!value) {
        return required ? "Seleccionar una opción" : null;
    }

    return null;
};

// Validacion de archivos PDF con opciones para requerirlo, permitir solo relativos o considerar un archivo existente
const DEFAULT_MAX_SIZE = 100 * 1024 * 1024; // 100MB

export const validatePdf = (
    file?: File | null,
    options?: {
        required?: boolean;
        maxSize?: number;
        existingFileName?: string | null;
    }
) => {
    const { required = false, maxSize = DEFAULT_MAX_SIZE, existingFileName } =
        options || {};

    // Si no hay archivo nuevo
    if (!file) {
        if (required && !existingFileName) {
            return "El archivo PDF es requerido";
        }
        return null;
    }

    // Tipo MIME
    if (file.type !== "application/pdf") {
        return "Debe ser un archivo PDF";
    }

    // Tamaño
    if (file.size > maxSize) {
        return "El PDF no debe superar 100MB";
    }

    return null;
};

export const validateImage = (
    file: File | null,
    options?: {
        required?: boolean;
        maxSize?: number;
    }
) => {
    const { required = true, maxSize = DEFAULT_MAX_SIZE } =
        options || {};

    if (!file) return required ? "La imagen es obligatoria" : null;

    if (!file.type.startsWith("image/"))
        return "Debe ser una imagen válida";

    if (file.size > maxSize)
        return "La imagen no debe superar 100MB";

    return null;
};

export const validateYear = (
    value: string | number,
    options?: {
        required?: boolean;
        min?: number;
        max?: number;
    }
) => {
    const { required = false, min = 1900, max = new Date().getFullYear() } =
        options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "El año es obligatorio" : null;
    }

    const year = Number(value);

    if (Number.isNaN(year)) {
        return "El año debe ser un número";
    }

    if (!/^\d{4}$/.test(String(year))) {
        return "El año debe tener 4 dígitos";
    }

    if (year < min || year > max) {
        return `El año debe estar entre ${min} y ${max}`;
    }

    return null;
};

export const validateName = (
    value?: string,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } =
        options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "Debes introducir un nombre" : null;
    }

    if (value.length < 3) {
        return "El nombre debe tener al menos 3 caracteres"
    }
}

export const validateCodeMedicine = (
    value: string,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } =
        options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "Debes introducir la clave" : null;
    }

    if (!MEDICAL_CODE_REGEX.test(value)) return "La clave no es válida";
}

export const validateOrder = (
    value: number,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } =
        options || {};

    if (value === null || value === undefined) {
        return required ? "Introduce la prioridad" : null;
    }

    if (value < 1) {
        return "La prioridad debe ser mayor a 0"
    }
}

export const validateFile = (
    file: File | null,
    options?: {
        required?: boolean;
        maxSize?: number;
        existingFileName?: string | null;
    }
) => {
    const { required = false, maxSize = DEFAULT_MAX_SIZE, existingFileName } =
        options || {};

    // Si no hay archivo nuevo
    if (!file) {
        if (required && !existingFileName) {
            return "El archivo a descargar es necesario";
        }
        return null;
    }

    // Tamaño
    if (file.size > maxSize) {
        return "El archivo no debe superar 100MB";
    }

    return null;
};

export const validateExtension = (
    value: string,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } = options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "Debes introducir la extensión" : null;
    }

    if (!EXTENSION_REGEX.test(value)) {
        return "La extensión debe tener 4 dígitos (0000 - 9999)";
    }

    return null;
};

export const validateEmail = (
    value?: string,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } = options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "Debes introducir un correo electrónico" : null;
    }

    if (!EMAIL_REGEX.test(value)) {
        return "El correo electrónico no es válido";
    }

    return null;
};

export const validateKeyPermission = (
    value: string,
    options?: {
        required?: boolean;
    }
) => {
    const { required = false } = options || {};

    if (value === null || value === undefined || value === "") {
        return required ? "Debes introducir un código único" : null;
    }

    if (!PERMISSION_KEY_REGEX.test(value)) {
        return "Formato válido: recurso.create | recurso.read | recurso.update | recurso.delete";
    }

    return null;
};