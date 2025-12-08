import { getAllPages } from "@/api/pages"
import { IconPicker } from "@/components/IconPicker"
import { useModalStore } from "@/store/modalStore"
import { useSettingStore } from "@/store/settingStore"
import { notify } from "@/utils/notify"
import { Autocomplete, Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"

export const AddMenu = () => {
    const [pages, setPages] = useState([]);
    const { closeModal } = useModalStore();
    const { addMenuItem } = useSettingStore();
    const [inputValue, setInputValue] = useState("");

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            page: '',
            icon: ''
        },
        validate: {
            title: (value) => (value.trim().length === 0 ? 'El título es obligatorio' : null),
            page: (value) => (value.trim().length === 0 ? 'La página es obligatoria' : null),
            icon: (value) => (value.trim().length === 0 ? 'El icono es obligatorio' : null),
        }
    });

    useEffect(() => {
        getAllPages().then((data) => {
            setPages(data.map((p: any) => ({ value: p.title, slug: p.slug })));
        });
    }, []);

    const handleSubmit = (values: typeof form.values) => {
        const newItem = {
            id: values.title.replace(/\s+/g, "-").toLowerCase(),
            children: [],
            label: values.title,
            link: values.page,
            icon: values.icon,
        };

        addMenuItem(newItem);
        closeModal();

        notify({
            type: "info",
            title: "Menú creado",
            message: "Menú creado con exito, recuerda guardar para aplicar los cambios"
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
                <IconPicker form={form} />

                <Group mt="lg" gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Crear
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};
