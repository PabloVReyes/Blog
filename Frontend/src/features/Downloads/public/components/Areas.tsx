import { ActionIcon, Stack, Text } from "@mantine/core"
import classes from "./Areas.module.css"
import * as TablerIcons from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export const Areas = ({ color, icon, name, slug }: any) => {
    const navigate = useNavigate()

    const Icon =
        icon &&
        (TablerIcons as any)[icon];

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
                <Icon size={40}/>
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