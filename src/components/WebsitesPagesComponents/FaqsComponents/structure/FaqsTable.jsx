import { useState } from 'react';
import { Card, Flex, Table } from 'antd';
import { CustomPagination, DeleteModal } from '../../../Ui';
import { faqColumns, faqsData } from '../../../../data';
import { AddEditFaqs } from '../modal';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

const DraggableRow = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
        id: props['data-row-key'],
    });

    const style = {
        ...props.style,
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'move',
        ...(isDragging && {
            position: 'relative',
            zIndex: 9999,
        }),
    };

    return (
        <tr
            {...props}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    );
};

const FaqsTable = ({ visible, setVisible }) => {

    const [dataSource, setDataSource] = useState(faqsData);
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 1 },
        })
    );

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const oldIndex = prev.findIndex((item) => item.key === active.id);
                const newIndex = prev.findIndex((item) => item.key === over?.id);
                return arrayMove(prev, oldIndex, newIndex); 
            });
        }
    };


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

  return (
    <>
        <Card className="radius-12 card-cs border-gray h-100">
            <Flex vertical gap={20}>
                <DndContext
                    sensors={sensors}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={dataSource.map((i) => i.key)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table
                            size="large"
                            columns={faqColumns({ setVisible, setEditItem, setDeleteItem,t })}
                            dataSource={dataSource}
                            pagination={false}
                            rowHoverable={false}
                            scroll={{ x: 800 }}
                            components={{
                            body: {
                                row: DraggableRow,
                            },
                            }}
                            className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        />
                    </SortableContext>
                </DndContext>
                <CustomPagination
                    total={dataSource.length}
                    current={current}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </Flex>
        </Card>
        <AddEditFaqs
            visible={visible}
            edititem={editItem}
            onClose={() => {
                setVisible(false);
                setEditItem(null);
            }}
        />
        <DeleteModal
            visible={deleteItem}
            title="Are you sure?"
            subtitle="This action cannot be undone. Are you sure you want to delete this question?"
            onClose={() => setDeleteItem(false)}
        />
    </>
  );
};

export { FaqsTable };
