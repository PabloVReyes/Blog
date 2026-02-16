import { notifications } from '@mantine/notifications';
import {
    IconCheck,
    IconX,
    IconInfoCircle,
    IconAlertTriangle,
} from '@tabler/icons-react';
import React, { type ReactNode } from 'react'; // 👈 importante para usar createElement

export type NotifyType = 'success' | 'error' | 'info' | 'warning';

export interface NotifyOptionProps {
    title?: string;
    message: string;
    type?: NotifyType;
    autoClose?: number | false;
    id?: string;
}


const colorByType: Record<NotifyType, string> = {
    success: 'green',
    error: 'red',
    info: 'blue',
    warning: 'yellow',
};

const getIconByType = (type: NotifyType): ReactNode => {
    switch (type) {
        case 'success':
            return React.createElement(IconCheck, { size: 20 });
        case 'error':
            return React.createElement(IconX, { size: 20 });
        case 'warning':
            return React.createElement(IconAlertTriangle, { size: 20 });
        case 'info':
        default:
            return React.createElement(IconInfoCircle, { size: 20 });
    }
}

export const Notify = ({
    title,
    message,
    type = 'info',
    autoClose = 8000,
    id,
}: NotifyOptionProps) => {
    notifications.show({
        id,
        title: title || type.toUpperCase(),
        message,
        icon: getIconByType(type),
        color: colorByType[type],
        autoClose,
        withBorder: true,
        styles: () => ({
            root: {
                border: `1px solid light-dark(var(--mantine-primary-color-6), var(--mantine-primary-color-8))`,
                shadow: 'sm'
            },
        }),
    });
}
