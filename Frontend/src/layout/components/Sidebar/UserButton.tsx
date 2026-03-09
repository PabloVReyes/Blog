import { IconChevronRight, IconLogout, IconSettings } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton, Box, useMantineTheme, Menu } from '@mantine/core';
import classes from './UserButton.module.css';
import type { User } from '@/features/auth/store/types';

interface Props {
    user: User | null;
    logout: () => void;
}

export const UserButton = ({ user, logout }: Props) => {
    const theme = useMantineTheme()

    return (
        <Menu shadow="md" trigger="hover" position="right-start" withArrow arrowPosition='center'>
            <Menu.Target>
                <UnstyledButton className={classes.user}>
                    <Group wrap="nowrap">
                        <Avatar radius="xl" alt={user?.name} name={user?.name} color={theme.primaryColor} variant="filled" />

                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <Text size="sm" fw={500} truncate>
                                {user?.name}
                            </Text>

                            <Text c="dimmed" size="xs" truncate>
                                {user?.email}
                            </Text>
                        </Box>

                        <IconChevronRight size={14} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconSettings size={14} />}
                >
                    Editar Perfil
                </Menu.Item>
                <Menu.Item
                    color="red"
                    leftSection={
                        <IconLogout size={14} />
                    }
                    onClick={logout}
                >
                    Cerrar Sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};