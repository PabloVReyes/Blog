import { IconEdit } from '@tabler/icons-react';
import { Action, type Props } from '../Action/Action';

export const Edit = (props: Props) => {
    return (
        <Action
            {...props}
            active={{
                fill: 'rgba(70, 181, 255, 0.95)',
                background: 'rgba(70, 172, 255, 0.1)',
            }}
        >
            <IconEdit size={15} color="gray"/>
        </Action>
    )
}