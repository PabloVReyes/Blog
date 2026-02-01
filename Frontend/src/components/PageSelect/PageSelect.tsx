import { getAllPagesUrl } from "@/features/sidebar/api/pages"
import { Combobox, InputBase, Loader, ScrollArea, useCombobox } from "@mantine/core"
import { useEffect, useState } from "react"

export const PageSelect = ({ form }: { form: any }) => {
    const combobox = useCombobox()
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            getAllPagesUrl()
                .then(setData)
        } finally {
            setLoading(false)
        }
    }, [])

    const options = data
        .filter((item) =>
            (item.label ?? "")
                .toLowerCase()
                .includes(form.values.url.toLowerCase())
        )
        .map((item) => (
            <Combobox.Option value={item.value} key={item.value}>
                {item.label}
            </Combobox.Option>
        ))

    return (
        <Combobox
            position="bottom-start"
            store={combobox}
            onOptionSubmit={(value) => {
                form.setFieldValue("url", value)

                if (!data.some((item) => item.value === value)) {
                    setData((current: any) => [
                        ...current,
                        { value, lable: value }
                    ])
                }

                combobox.closeDropdown()
            }}
        >
            <Combobox.Target>
                <InputBase
                    withAsterisk
                    label="URL del destino"
                    placeholder="Selecciona o escribe una URL"
                    {...form.getInputProps("url")}
                    onChange={(event) => {
                        form.setFieldValue("url", event.currentTarget.value);
                        combobox.openDropdown();
                    }}
                    rightSection={loading ? <Loader size={"xs"} /> : null}
                    onFocus={() => combobox.openDropdown()}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <ScrollArea.Autosize
                    mah={300}
                    type="auto"
                    scrollbarSize={6}
                >
                    <Combobox.Options>
                        {!loading &&
                            form.values.url &&
                            !data.some(
                                (item) => item.value === form.values.url
                            ) && (
                                <Combobox.Option value={form.values.url}>
                                    ➕ Usar "{form.values.url}"
                                </Combobox.Option>
                            )
                        }

                        {options}
                    </Combobox.Options>
                </ScrollArea.Autosize>
            </Combobox.Dropdown>
        </Combobox>
    )
}