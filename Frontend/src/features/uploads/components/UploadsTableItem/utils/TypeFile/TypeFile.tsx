import { Image } from "@mantine/core"
import { IconFile } from "@tabler/icons-react"

export const typeFile = (mime: string, url?: string) => {
    const type = mime.split("/")
    switch (type[0]) {
        case "image":
            return <Image
                src={url}
                fit="contain"
                height={160}
            />
        default:
            return <IconFile size={100} />
    }
}