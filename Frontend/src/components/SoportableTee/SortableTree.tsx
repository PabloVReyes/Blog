import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    type Announcements,
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    DragOverlay,
    type DragMoveEvent,
    type DragEndEvent,
    type DragOverEvent,
    MeasuringStrategy,
    type DropAnimation,
    type Modifier,
    defaultDropAnimation,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
    buildTree,
    flattenTree,
    getProjection,
    getChildCount,
    removeItem,
    removeChildrenOf,
    setProperty,
} from './utilities';
import type { FlattenedItem, SensorContext } from './types';
import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates';
import { SortableTreeItem } from './components';
import { CSS } from '@dnd-kit/utilities';
import { notify } from '@/utils/notify';
import { useSettingStore } from '@/store/settingStore';
import { useModalStore } from '@/store/modalStore';
import { EditMenu } from '@/features/private/sidebar/components/EditMenu';

const measuring = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
        return [
            { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
            {
                opacity: 0,
                transform: CSS.Transform.toString({
                    ...transform.final,
                    x: transform.final.x + 5,
                    y: transform.final.y + 5,
                }),
            },
        ];
    },
    easing: 'ease-out',
    sideEffects({ active }) {
        active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: defaultDropAnimation.duration,
            easing: defaultDropAnimation.easing,
        });
    },
};

interface Props {
    collapsible?: boolean;
    indentationWidth?: number;
    indicator?: boolean;
    removable?: boolean;
    editable?: boolean;
}

export function SortableTree({
    collapsible,
    indicator = false,
    indentationWidth = 50,
    removable,
    editable
}: Props) {
    const { menu, setMenu } = useSettingStore();
    const [items, setItems] = useState(() => menu);
    const { openModal } = useModalStore()

    useEffect(() => {
        setItems(menu)
    }, [menu])

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<{
        parentId: UniqueIdentifier | null;
        overId: UniqueIdentifier;
    } | null>(null);

    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);
        const collapsedItems = flattenedTree.reduce<string[]>(
            (acc, { children, collapsed, id }: any) =>
                collapsed && children.length ? [...acc, id] : acc,
            []
        );

        return removeChildrenOf(
            flattenedTree,
            activeId != null ? [activeId, ...collapsedItems] : collapsedItems
        );
    }, [activeId, items]);
    const projected =
        activeId && overId
            ? getProjection(
                flattenedItems,
                activeId,
                overId,
                offsetLeft,
                indentationWidth
            )
            : null;
    const sensorContext: SensorContext = useRef({
        items: flattenedItems,
        offset: offsetLeft,
    });
    const [coordinateGetter] = useState(() =>
        sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter,
        })
    );

    const sortedIds = useMemo(
        () => flattenedItems.map(({ id }) => id),
        [flattenedItems]
    );
    const activeItem: any = activeId
        ? flattenedItems.find(({ id }) => id === activeId)
        : null;

    useEffect(() => {
        sensorContext.current = {
            items: flattenedItems,
            offset: offsetLeft,
        };
    }, [flattenedItems, offsetLeft]);

    const announcements: Announcements = {
        onDragStart({ active }) {
            return `Picked up ${active.id}.`;
        },
        onDragMove({ active, over }) {
            return getMovementAnnouncement('onDragMove', active.id, over?.id);
        },
        onDragOver({ active, over }) {
            return getMovementAnnouncement('onDragOver', active.id, over?.id);
        },
        onDragEnd({ active, over }) {
            return getMovementAnnouncement('onDragEnd', active.id, over?.id);
        },
        onDragCancel({ active }) {
            return `Moving was cancelled. ${active.id} was dropped in its original position.`;
        },
    };

    return (
        <DndContext
            accessibility={{ announcements }}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
                {flattenedItems.map(({ id, label, children, icon, collapsed, depth, link }: any) => (
                    <SortableTreeItem
                        key={id}
                        id={id}
                        value={label}
                        icon={icon}
                        link={`/${link}`}
                        depth={id === activeId && projected ? projected.depth : depth}
                        indentationWidth={indentationWidth}
                        indicator={indicator}
                        collapsed={Boolean(collapsed && children.length)}
                        onCollapse={
                            collapsible && children.length
                                ? () => handleCollapse(id)
                                : undefined
                        }
                        onRemove={removable ? () => handleRemove(id) : undefined}
                        onEdit={editable ? () => handleEdit(id) : undefined}
                    />
                ))}
                {createPortal(
                    <DragOverlay
                        dropAnimation={dropAnimationConfig}
                        modifiers={indicator ? [adjustTranslate] : undefined}
                    >
                        {activeId && activeItem ? (
                            <SortableTreeItem
                                id={activeId}
                                depth={activeItem.depth}
                                icon={activeItem.icon}
                                clone
                                childCount={getChildCount(items, activeId) + 1}
                                value={activeId.toString()}
                                indentationWidth={indentationWidth}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </SortableContext>
        </DndContext>
    );

    function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
        setActiveId(activeId);
        setOverId(activeId);

        const activeItem = flattenedItems.find(({ id }) => id === activeId);

        if (activeItem) {
            setCurrentPosition({
                parentId: activeItem.parentId,
                overId: activeId,
            });
        }

        document.body.style.setProperty('cursor', 'grabbing');
    }

    function handleDragMove({ delta }: DragMoveEvent) {
        setOffsetLeft(delta.x);
    }

    function handleDragOver({ over }: DragOverEvent) {
        setOverId(over?.id ?? null);
    }

    function handleDragEnd({ active, over }: DragEndEvent) {
        resetState();

        if (projected && over) {
            const { depth, parentId } = projected;

            if (depth > 1) {
                notify({
                    type: "error",
                    title: "Error en el menú lateral",
                    message: "No puedes colocar submenus dentro de otros submenus"
                })
                return;
            }

            const parentIsChild = flattenedItems.find(item => item.id === parentId)?.depth === 1;
            if (parentIsChild) {
                return; // bloquea que un subnodo reciba hijos
            }

            const clonedItems: FlattenedItem[] = JSON.parse(
                JSON.stringify(flattenTree(items))
            );
            const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
            const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
            const activeTreeItem = clonedItems[activeIndex];

            clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

            const normalizeDepth = (id: UniqueIdentifier) => {
                for (const child of clonedItems.filter(item => item.parentId === id)) {
                    const parent = clonedItems.find(i => i.id === id);
                    if (parent?.depth === 0) {
                        child.depth = 1;
                        child.parentId = id;
                    } else {
                        child.depth = 0;
                        child.parentId = null;
                    }
                    normalizeDepth(child.id);
                }
            };

            normalizeDepth(active.id);

            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
            const newItems = buildTree(sortedItems);

            setItems(newItems);
            setMenu(newItems)

            notify({
                type: "info",
                title: "Menú editado",
                message: "El menú fue editado, recuerda guardar para aplicar los cambios"
            })
        }
    }

    function handleDragCancel() {
        resetState();
    }

    function resetState() {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        setCurrentPosition(null);

        document.body.style.setProperty('cursor', '');
    }

    function handleEdit(id: UniqueIdentifier) {
        openModal({
            title: "Editar menú",
            content: <EditMenu id={id} />
        })
    }

    function handleRemove(id: UniqueIdentifier) {
        const newItems = removeItem(items, id);
        setItems(newItems);   // local
        setMenu(newItems);
        notify({
            type: "info",
            title: "Menú editado",
            message: "El menú fue editado, recuerda guardar para aplicar los cambios"
        })
    }

    function handleCollapse(id: UniqueIdentifier) {
        const newItems = setProperty(items, id, 'collapsed', (v) => !v);
        setItems(newItems);   // local
        setMenu(newItems); // Store
        notify({
            type: "info",
            title: "Menú editado",
            message: "El menú fue editado, recuerda guardar para aplicar los cambios"
        })
    }

    function getMovementAnnouncement(
        eventName: string,
        activeId: UniqueIdentifier,
        overId?: UniqueIdentifier
    ) {
        if (overId && projected) {
            if (eventName !== 'onDragEnd') {
                if (
                    currentPosition &&
                    projected.parentId === currentPosition.parentId &&
                    overId === currentPosition.overId
                ) {
                    return;
                } else {
                    setCurrentPosition({
                        parentId: projected.parentId,
                        overId,
                    });
                }
            }

            const clonedItems: FlattenedItem[] = JSON.parse(
                JSON.stringify(flattenTree(items))
            );
            const overIndex = clonedItems.findIndex(({ id }) => id === overId);
            const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

            const previousItem = sortedItems[overIndex - 1];

            let announcement;
            const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
            const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

            if (!previousItem) {
                const nextItem = sortedItems[overIndex + 1];
                announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
            } else {
                if (projected.depth > previousItem.depth) {
                    announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
                } else {
                    let previousSibling: FlattenedItem | undefined = previousItem;
                    while (previousSibling && projected.depth < previousSibling.depth) {
                        const parentId: UniqueIdentifier | null = previousSibling.parentId;
                        previousSibling = sortedItems.find(({ id }) => id === parentId);
                    }

                    if (previousSibling) {
                        announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
                    }
                }
            }

            return announcement;
        }

        return;
    }
}

const adjustTranslate: Modifier = ({ transform }) => {
    return {
        ...transform,
        y: transform.y - 25,
    };
};