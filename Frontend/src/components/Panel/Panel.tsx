import { Box, Button, Card, Flex, Group, Pagination, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { IconPlus, IconSearch } from "@tabler/icons-react"
import type { ReactNode } from "react"
import styles from "./Pagination.module.css"

type SearchProps =
    | { search?: false; searchValue?: never; searchPlaceholder?: never; onChangeSearch?: never }
    | { search: true; searchValue: string; searchPlaceholder: string; onChangeSearch: (value: string) => void };

type LimitProps =
    | { limit?: false; limitValue?: never; onChangeLimit?: never }
    | { limit: true; limitValue: number; onChangeLimit: (value: number) => void };

type PaginationProps =
    | { page?: false; firstItem?: never; lastItem?: never; totalItems?: never; totalPages?: never; pageValue?: never, onChangePage?: never }
    | { page: true; firstItem: number; lastItem: number; totalItems: number; totalPages: number; pageValue: number, onChangePage: (value: number) => void }


type TitleProps =
    | { title?: false; titleValue?: never, onAddElement?: never, labelAdd?: never }
    | { title: true; titleValue: string, onAddElement?: () => void, labelAdd?: string }

type PanelProps = (SearchProps & LimitProps & PaginationProps & TitleProps) & { children: ReactNode };

export const Panel = ({
    title,
    titleValue,
    onAddElement,
    children,
    search,
    searchValue,
    searchPlaceholder,
    onChangeSearch,
    limitValue,
    limit,
    onChangeLimit,
    page,
    firstItem,
    lastItem,
    totalPages,
    totalItems,
    pageValue,
    onChangePage,
    labelAdd = "Agregar Elemento"
}: PanelProps) => {
    return (
        <Stack>
            {title &&
                <Card>
                    <Group justify="space-between">
                        <Title order={4}>{titleValue}</Title>
                        {onAddElement &&
                            <Button
                                onClick={onAddElement}
                                leftSection={<IconPlus size={16} />}
                            >
                                {labelAdd}
                            </Button>
                        }
                    </Group>
                </Card>
            }

            {(search || limit) &&
                <Card>
                    <Flex
                        justify="space-between"
                        direction={{ base: "column", sm: "row" }}
                        gap="md"
                    >
                        <Box w="100%" hidden={!search}>
                            <TextInput
                                w={{ base: "100%", sm: 300 }}
                                leftSection={
                                    <IconSearch />
                                }
                                placeholder={searchPlaceholder}
                                styles={{
                                    input: {
                                        backgroundColor: "light-dark(oklch(98.5% 0.002 247.839), oklch(21% 0.034 264.665))"
                                    }
                                }}
                                onChange={(e) => onChangeSearch && onChangeSearch(e.target.value)}
                                value={searchValue}
                            />
                        </Box>

                        <Box w={{ base: "100%", sm: 150 }} hidden={!limit}>
                            <Select
                                searchable={false}
                                data={[
                                    { value: "10", label: "10 por página" },
                                    { value: "25", label: "25 por página" },
                                    { value: "50", label: "50 por página" },
                                    { value: "100", label: "100 por página" },
                                ]}
                                allowDeselect={false}
                                value={limitValue ? limitValue.toString() : ''}
                                onChange={(value) => {
                                    onChangeLimit && onChangeLimit(Number(value));
                                }}
                                classNames={{
                                    option: styles.limit
                                }}
                                w={{ base: "100%", sm: 150 }}
                            />
                        </Box>
                    </Flex>
                </Card >
            }
            {children}
            {page && totalItems > 0 &&
                <Stack>
                    <Text
                        ta={{ base: "center", sm: "left" }}
                        size="sm"
                        style={{
                            color: "light-dark(oklch(44.6% 0.03 256.802), oklch(70.7% 0.022 261.325))",
                        }}
                    >
                        {`Mostrando ${firstItem || 0} a ${lastItem || 0} de ${totalItems || 0} registros`}
                    </Text>

                    <Group justify="center">
                        <Pagination
                            siblings={0}
                            gap={5}
                            classNames={styles}
                            total={totalPages}
                            value={pageValue}
                            onChange={onChangePage}
                        />
                    </Group>
                </Stack>
            }
        </Stack>
    )
}