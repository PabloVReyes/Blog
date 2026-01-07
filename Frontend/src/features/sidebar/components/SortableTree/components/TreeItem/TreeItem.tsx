import React, { forwardRef, type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';
import { Action } from '../Action';

import * as TablerIcons from "@tabler/icons-react";
import { type IconProps } from "@tabler/icons-react";
import { ActionIcon, Avatar, Group, Text } from '@mantine/core';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
    childCount?: number;
    clone?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    ghost?: boolean;
    handleProps?: any;
    indicator?: boolean;
    indentationWidth: number;
    value: string | number;
    onCollapse?(): void;
    onRemove?(): void;
    onEdit?(): void;
    wrapperRef?(node: HTMLLIElement): void;
    icon?: string;
    link?: string;
}

type TablerIconComponent = React.FC<IconProps>;

export const TreeItem = forwardRef<HTMLDivElement, Props>(
    (
        {
            childCount,
            clone,
            depth,
            disableSelection,
            disableInteraction,
            ghost,
            handleProps,
            indentationWidth,
            indicator,
            collapsed,
            onCollapse,
            onRemove,
            onEdit,
            onDragExit,
            style,
            value,
            wrapperRef,
            icon,
            link,
            ...props
        },
        ref
    ) => {

        const IconComponent =
            TablerIcons[icon as keyof typeof TablerIcons] as unknown as TablerIconComponent;

        return (
            <li
                className={classNames(
                    styles.Wrapper,
                    clone && styles.clone,
                    ghost && styles.ghost,
                    indicator && styles.indicator,
                    disableSelection && styles.disableSelection,
                    disableInteraction && styles.disableInteraction
                )}
                ref={wrapperRef}
                style={
                    {
                        '--spacing': `${indentationWidth * depth}px`,
                    } as React.CSSProperties
                }
                {...props}
            >
                <div className={styles.TreeItem} ref={ref} style={style}>
                    <Group gap={5}>
                        <ActionIcon className={styles.action}
                            {...handleProps}
                        >
                            <TablerIcons.IconGripVertical color="gray" size={16} />
                        </ActionIcon>
                        {onCollapse && (
                            <Action
                                onClick={onCollapse}
                                className={classNames(
                                    styles.Collapse,
                                    collapsed && styles.collapsed
                                )}
                            >
                                {collapseIcon}
                            </Action>
                        )}
                        <Avatar variant="filled" color="var(--app-info-color)">
                            <IconComponent size={20} stroke={1.5} />
                        </Avatar>
                    </Group>
                    <Text size="sm" className={styles.Text}>{value}</Text>
                    <Group>
                        <Text size='sm'>{link}</Text>
                        <Group gap={5}>
                            {!clone && onEdit &&
                                <ActionIcon className={styles.action} onClick={onEdit}>
                                    <TablerIcons.IconEdit size={16} className={styles.edit} />
                                </ActionIcon>
                            }
                            {!clone && onRemove &&
                                <ActionIcon className={styles.action} onClick={onRemove}>
                                    <TablerIcons.IconTrash size={16} className={styles.trash} />
                                </ActionIcon>
                            }
                            {clone && childCount && childCount > 1 ? (
                                <span className={styles.Count}>{childCount}</span>
                            ) : null}
                        </Group>
                    </Group>
                </div>
            </li>
        );
    }
);

const collapseIcon = (
    <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
        <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
    </svg>
);