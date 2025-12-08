import { getPage } from "@/api/pages"
import { Card, Container, Group, Stack, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const DynamicPage = () => {
    const { slug } = useParams<{ slug: string }>()
    const [html, setHtml] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    console.log(html)

    useEffect(() => {
        if (!slug) return;

        getPage(slug)
            .then(res => { setHtml(res.html); setTitle(res.title) })
    }, [slug])

    return (
        <Container>
            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>{title.toUpperCase()}</Title>
                    </Stack>
                </Group>
                <Card>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </Card>
            </Stack>
        </Container>
    )
}