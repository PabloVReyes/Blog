import { ActionIcon, Stack, Text } from "@mantine/core"
import classes from "./Areas.module.css"
import { useNavigate } from "react-router-dom"
import { getTablerIcon } from "@/helpers"

interface Props {
    color: string;
    icon: string;
    name: string;
    slug: string
}

export const Areas = ({ color, icon, name, slug }: Props) => {
    const navigate = useNavigate()

    const Icon = getTablerIcon(icon)

    return (
        <Stack
            align="center"
            gap={"sm"}
            className={classes.button}
            mt={20}
            onClick={() => navigate(slug)}
        >
            <ActionIcon
                size={96}
                radius={"50%"}
                color={color}
                className={`${classes.circle} ${color}`}
            >
                <Icon size={40} />
            </ActionIcon>

            <Text
                size="md"
                fw={700}
                ta={"center"}
                className={classes.text}
            >
                {name}
            </Text>
        </Stack>
    )
}