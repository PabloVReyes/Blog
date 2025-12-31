import { useEffect, useRef } from 'react';
import EditorJS, { type OutputData } from '@editorjs/editorjs';

import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Table from '@editorjs/table';
import LinkTool from '@editorjs/link';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Underline from '@editorjs/underline';
import ImageTool from '@editorjs/image';
import ImageDimensionTune from './ImageDimensionTune';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import ColorPicker from "editorjs-color-picker";

import "./styles.css"
import { uploadPageImage } from '@/api/pages';
import ImageAlignTune from './ImageAlignTune';

const ParagraphIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6H20M4 12H16M4 18H18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
</svg>
`;


interface Props {
    data?: OutputData;
    onChange?: (data: OutputData) => void;
}

export const Editor = ({ data, onChange }: Props) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!holderRef.current || editorRef.current) return;

        const editor = new EditorJS({
            i18n: {
                messages: {
                    ui: {
                        blockTunes: {
                            toggler: 'Ajustes del bloque',
                        },
                        inlineToolbar: {
                            converter: 'Convertir a',
                        },
                        toolbar: {
                            toolbox: {
                                Add: 'Agregar',
                            },
                        },
                    },
                    toolNames: {
                        Text: 'Texto',
                        Heading: 'Encabezado',
                        "Unordered List": 'Lista desordenada',
                        "Ordered List": 'Lista ordenada',
                        Quote: 'Cita',
                        Image: 'Imagen',
                        Table: 'Tabla',
                        Code: 'Código',
                        Warning: 'Advertencia',
                        Checklist: 'Lista de verificación',
                        Delimiter: 'Separador',
                    },
                    tools: {
                        image: {
                            'Select an Image': 'Seleccionar imagen',
                            'Caption': 'Descripción',
                            'With border': 'Con borde',
                            'Stretch image': 'Expandir imagen',
                            'With background': 'Con fondo',
                        },
                        list: {
                            'Ordered': 'Ordenada',
                            'Unordered': 'Desordenada',
                            'Checklist': 'Lista de verificación',

                            'Start with': 'Empezar con',
                            'Counter type': 'Tipo de lista',

                            'Numeric': 'Numérica',
                            'Lower Alpha': 'Letra minúscula',
                            'Upper Alpha': 'Letra mayúscula',
                            'Lower Roman': 'Romano minúsculo',
                            'Upper Roman': 'Romano mayúsculo',
                        },
                    },
                    blockTunes: {
                        delete: {
                            Delete: 'Eliminar',
                        },
                        moveUp: {
                            'Move up': 'Mover arriba',
                        },
                        moveDown: {
                            'Move down': 'Mover abajo',
                        },
                    },
                },
            },
            holder: holderRef.current,
            autofocus: false,
            data,
            inlineToolbar: true,
            tools: {
                colorPicker: {
                    class: ColorPicker as any,
                    inlineToolbar: true,
                    config: {
                        colors: [
                            '#228be6', '#12b886', '#fa5252',
                            '#f59f00', '#000000'
                        ],
                    },
                },
                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
                delimiter: Delimiter,
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: [
                        'bold',
                        'italic',
                        'underline',
                        'link',
                        'marker',
                        'colorPicker',
                    ],
                    toolbox: {
                        title: 'Texto',
                        icon: ParagraphIcon,
                    },
                    config: {
                        placeholder: "Escribe '/' para ver las opciones",
                        defaultAlignment: 'left',
                        alignments: ['left', 'center', 'right', 'justify'],
                    },
                },

                underline: {
                    class: Underline,
                    shortcut: 'CMD+U',
                },
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        levels: [1, 2, 3],
                        defaultLevel: 2,
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },
                code: Code,
                table: {
                    class: Table,
                    inlineToolbar: true,
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/api/link-preview',
                    },
                },
                imageAlign: {
                    class: ImageAlignTune,
                },
                image: {
                    class: ImageTool,
                    tunes: ["imageDimensions", "imageAlign"],
                    config: {
                        captionPlaceholder: 'Descripción de la imagen',
                        buttonContent: 'Seleccionar imagen',
                        uploader: {
                            async uploadByFile(file: File) {
                                try {
                                    const formData = new FormData();
                                    formData.append('image', file);

                                    const response = await uploadPageImage(formData);

                                    return {
                                        success: 1,
                                        file: {
                                            url: response.file.url,
                                        }
                                    };
                                } catch (error) {
                                    console.error('Error subiendo imagen', error);

                                    return {
                                        success: 0,
                                    };
                                }
                            },

                            uploadByUrl(url: string) {
                                return Promise.resolve({
                                    success: 1,
                                    file: { url },
                                });
                            },
                        },
                    }
                },
                imageDimensions: {
                    class: ImageDimensionTune,
                },
            },
            onChange: async () => {
                if (!onChange) return;
                const content = await editor.save();
                onChange(content);
            },
        });

        editorRef.current = editor;
    }, []);

    useEffect(() => {
        // Cambiar tipo de todos los botones de la toolbar a "button"
        const interval = setInterval(() => {
            document.querySelectorAll('.ce-inline-tool, .ce-popover-item button').forEach(btn => {
                (btn as HTMLButtonElement).setAttribute('type', 'button');
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={holderRef}
            className="editor-wrapper"
        />
    );
};
