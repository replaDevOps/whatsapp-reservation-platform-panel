import { useEffect, useState } from 'react';
import { Card, Flex, message, Table } from 'antd';
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
import { GET_FAQS } from '../../../../graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { TableLoader } from '../../../../shared';
import { DELETE_FAQS } from '../../../../graphql/mutation';

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

    const [faqsData, setFaqsData] = useState([]);
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [ getFaqs, { data, loading, refetch  } ] = useLazyQuery(GET_FAQS,{
        fetchPolicy: 'network-only'
    })
    const [deleteFaqs, { loading: deleting }] = useMutation(DELETE_FAQS);
    useEffect(() => {
        if (getFaqs) {
            getFaqs({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                }
            });
        }
    }, [
        getFaqs,
        current,
        pageSize
    ]);
    
    useEffect(()=>{
        if(data?.getFaqs?.faqs)
            setFaqsData(data?.getFaqs?.faqs)
    }, [data])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 1 },
        })
    );

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setFaqsData((prev) => {
                const oldIndex = prev.findIndex((item) => item.id === active.id);
                const newIndex = prev.findIndex((item) => item.id === over?.id);
                return arrayMove(prev, oldIndex, newIndex); 
            });
        }
    };


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleDelete = async () => {
        if (!deleteItem) return;
        try {
            await deleteFaqs({ variables: { deleteFaqId: deleteItem } });
            messageApi.success('Staff deleted successfully');
            setDeleteItem(null);
            refetch({
                limit: 20,
                offset: 0,
            });
        } catch (err) {
            console.error(err);
            messageApi.error('Failed to delete staff',err);
        }
    };


    return (
        <>
            {contextHolder}
            <Card className="radius-12 card-cs border-gray h-100">
                <Flex vertical gap={20}>
                    <DndContext
                        sensors={sensors}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={onDragEnd}
                    >
                        <SortableContext
                            items={faqsData.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Table
                                size="large"
                                columns={faqColumns({ setVisible, setEditItem, setDeleteItem,t })}
                                dataSource={faqsData}
                                pagination={false}
                                rowHoverable={false}
                                scroll={{ x: 800 }}
                                components={{
                                body: {
                                    row: DraggableRow,
                                },
                                }}
                                rowKey={(record)=>record?.id}
                                className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                                loading={
                                    {
                                        ...TableLoader,
                                        spinning: loading
                                    }
                                }
                            />
                        </SortableContext>
                    </DndContext>
                    <CustomPagination
                        total={data?.getFaqs?.totalCount}
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
                refetch={() => refetch({
                    limit: 20,
                    offset: 0,
                })}
            />
            <DeleteModal
                visible={deleteItem}
                title="Are you sure?"
                subtitle="This action cannot be undone. Are you sure you want to delete this question?"
                onClose={() => setDeleteItem(false)}
                onConfirm={handleDelete} 
                loading={deleting}
            />
        </>
    );
};

export { FaqsTable };
