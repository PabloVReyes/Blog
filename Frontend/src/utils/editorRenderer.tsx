import React from 'react';
import { Blockquote, Card, Checkbox, Code, Divider, Group, List, Table, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface EditorBlock {
    id: string;
    type: string;
    data: any;
    tunes?: any;
}

interface EditorContent {
    time: number;
    blocks: EditorBlock[];
    version: string;
}

interface Props {
    content: EditorContent;
}

export const EditorRenderer: React.FC<Props> = ({ content }) => {
    if (!content || !content.blocks) return null;

    return (
        <div>
            {content.blocks.map((block) => {
                switch (block.type) {
                    case 'paragraph':
                        return (
                            <p
                                key={block.id}
                                style={{ marginBottom: '1em', lineHeight: 1.6, textAlign: block.data.alignment ?? 'left' }}
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            />
                        );

                    case 'image':
                        const width = block.tunes?.imageDimensions?.width || 'auto';
                        const height = block.tunes?.imageDimensions?.height || 'auto';
                        const align = block.tunes?.imageAlign?.align ?? 'center';

                        console.log(align);

                        return (
                            <div className={`image-viewer image-align-${align}`}>
                                <Card key={block.id} w={`${width}`} h={`${height}`}>
                                    <img
                                        key={block.id}
                                        src={block.data.file.url}
                                        alt={block.data.caption || ''}
                                        style={{
                                            objectFit: 'contain',
                                            display: 'block',
                                            marginBottom: '1em',
                                            border: block.data.withBorder ? '1px solid #ccc' : 'none',
                                            borderRadius: block.data.withBackground ? 12 : 0,
                                            backgroundColor: block.data.withBackground ? '#f5f5f5' : 'transparent',
                                        }}
                                    />
                                    <Text style={{ textAlign: "center" }} size="sm" c="dimmed">{block.data.caption}</Text>
                                </Card>
                            </div>
                        );

                    case 'list':
                        if (block.data.style === 'checklist') {
                            return (
                                block.data.items.map((item: any, idx: number) => (
                                    <Group key={idx} gap={5} mb={"sm"}>
                                        <Checkbox.Indicator radius={"sm"} checked={!!item.meta.checked} />
                                        <Text
                                            size='sm'
                                            style={{
                                                textDecoration: item.meta.checked ? 'line-through' : 'none',
                                            }}
                                        >
                                            {item.content}
                                        </Text>
                                    </Group>
                                ))
                            );
                        } else if (block.data.style === 'ordered') {
                            return (
                                <List type="ordered" key={block.id} mb="md" listStyleType={block.data.meta.counterType}>
                                    {block.data.items.map((item: any, idx: number) => (
                                        <List.Item key={idx}>{item.content}</List.Item>
                                    ))}
                                </List>
                            );
                        } else {
                            // unordered list
                            return (
                                <List key={block.id} mb="md">
                                    {block.data.items.map((item: any, idx: number) => (
                                        <List.Item key={idx}>{item.content}</List.Item>
                                    ))}
                                </List>
                            );
                        }

                    case 'header':
                        return (
                            <Title order={block.data.level}>{block.data.text}</Title>
                        )

                    case 'code':
                        return (
                            <Code color="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))" block>{block.data.code}</Code>
                        )

                    case 'quote':
                        return (
                            <Blockquote key={block.id} mb="md" cite={`- ${block.data.caption}`} icon={<IconInfoCircle />}>
                                {block.data.text}
                            </Blockquote>
                        )

                    case "linkTool":
                        return (
                            <a
                                key={block.id}
                                href={block.data.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'var(--mantine-primary-color-6)',
                                    textDecoration: 'none',
                                    marginBottom: '0.5em',
                                    display: 'inline-block',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mantine-primary-color-8)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mantine-primary-color-6)')}
                            >
                                {block.data.link}
                            </a>
                        )

                    case "table":
                        const tableData: string[][] = block.data.content || [];
                        const withHeadings: boolean = block.data.withHeadings || false;

                        return (
                            <Table
                                border={1}
                                key={block.id}
                                highlightOnHover
                                verticalSpacing="sm"
                                style={{ marginBottom: '1em' }}
                            >
                                {withHeadings && tableData.length > 0 && (
                                    <Table.Thead>
                                        <Table.Tr>
                                            {tableData[0].map((cell, idx) => (
                                                <Table.Th key={idx}>{cell}</Table.Th>
                                            ))}
                                        </Table.Tr>
                                    </Table.Thead>
                                )}
                                <Table.Tbody>
                                    {tableData.slice(withHeadings ? 1 : 0).map((row, rowIdx) => (
                                        <Table.Tr key={rowIdx}>
                                            {row.map((cell, cellIdx) => (
                                                <Table.Td key={cellIdx}>{cell}</Table.Td>
                                            ))}
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        );

                    case 'delimiter':
                        return (
                            <Divider key={block.id} my="lg" />
                        );
                    default:
                        return null;

                }
            })}
        </div>
    );
};
