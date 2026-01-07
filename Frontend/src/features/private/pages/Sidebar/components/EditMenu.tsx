// import { getAllPages } from "@/api/pages"
import { getAllPagesUrl } from "@/features/sidebar/api/pages"
import { IconSelect } from "@/features/sidebar/components/shared"
import { useModalStore, useSettingStore } from "@/shared"
import { notify } from "@/utils/notify"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { Autocomplete, Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"

interface Props {
    id: UniqueIdentifier
}

export const EditMenu = ({ id }: Props) => {
    const { getMenuItemById, updateMenuItem } = useSettingStore()
    const [pages, setPages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const { closeModal } = useModalStore();
    const node = getMenuItemById(String(id))

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: node?.label,
            page: node?.link,
            icon: node?.icon
        },
        validate: {
            title: (value: any) => (value.trim().length === 0 ? 'El título es obligatorio' : null),
            page: (value: any) => (value.trim().length === 0 ? 'La página es obligatoria' : null),
            icon: (value: any) => (value.trim().length === 0 ? 'El icono es obligatorio' : null),
        }
    });


    useEffect(() => {
        getAllPagesUrl().then((data) => {
            const mapped = data.map((p: any) => ({ value: p.title, slug: p.slug }));
            setPages(mapped);

            // Encontrar el título de la página actual (basado en el slug que tiene el nodo)
            const currentPage = mapped.find((p: any) => p.slug === node?.link);
            if (currentPage) {
                setInputValue(currentPage.value); // Mostrar título en el Autocomplete
                form.setFieldValue("page", currentPage.slug); // Mantener slug como valor real
            }
        });
    }, [node?.link]);

    const handleSubmit = (values: typeof form.values) => {
        updateMenuItem(String(id), {
            label: values.title,
            link: values.page, // slug
            icon: values.icon
        });
        closeModal();

        notify({
            type: "info",
            title: "Menú editado",
            message: "Menú editado con exito, recuerda guardar para aplicar los cambios"
        })
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    autoFocus
                    label="Título de la página"
                    withAsterisk
                    description="Título que aparecerá en el menú lateral"
                    placeholder="Título"
                    key={form.key('title')}
                    {...form.getInputProps("title")}
                />
                <Autocomplete
                    label="Página"
                    withAsterisk
                    placeholder="Página"
                    description="Página a la cual se va a dirigir el menú lateral"
                    data={pages.map((p: any) => p.value)}
                    {...form.getInputProps("page")}
                    value={inputValue}
                    onChange={(val) => {
                        setInputValue(val);
                        const selectedPage: any = pages.find((p: any) => p.value === val);
                        form.setFieldValue("page", selectedPage ? selectedPage.slug : "");
                    }}
                />
                <IconSelect form={form} />

                <Group mt="lg" gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Editar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}