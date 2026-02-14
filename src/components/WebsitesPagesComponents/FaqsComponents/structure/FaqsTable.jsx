import { useEffect, useState } from 'react';
import { Card, Flex, notification, Table } from 'antd';
import { CustomPagination, DeleteModal } from '../../../Ui';
import { faqColumns } from '../../../../data';
import { AddEditFaqs } from '../modal';
import { useTranslation } from 'react-i18next';
import { GET_FAQS } from '../../../../graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { notifyError, notifySuccess, TableLoader } from '../../../../shared';
import { DELETE_FAQS } from '../../../../graphql/mutation';

const FaqsTable = ({ visible, setVisible }) => {

    const [faqsData, setFaqsData] = useState([]);
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [ getFaqs, { data, loading  } ] = useLazyQuery(GET_FAQS,{
        fetchPolicy: 'network-only'
    })
    const [deleteFaqs, { loading: deleting }] = useMutation(DELETE_FAQS,{
        onCompleted: ()=>{notifySuccess(api,t("FAQ Delete"),t("FAQ has been deleted successfully")),
            fetchFaqs();
            setDeleteItem(null)    
            setCurrent(1)
        },onError: (error)=> notifyError(api,error)
    });

    const fetchFaqs = (()=>{
        getFaqs({
            variables: {
                limit: pageSize,
                offset: (current - 1) * pageSize,
            }
        });
    })
    
    useEffect(() => {
        if (getFaqs) {
            fetchFaqs()
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

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    return (
        <>
            {contextHolder}
            <Card className="radius-12 card-cs border-gray h-100">
                <Flex vertical gap={20}>
                    <Table
                        size="large"
                        columns={faqColumns({ setVisible, setEditItem, setDeleteItem,t })}
                        dataSource={faqsData}
                        pagination={false}
                        rowHoverable={false}
                        scroll={{ x: 800 }}
                        rowKey={"id"}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        loading={
                            {
                                ...TableLoader,
                                spinning: loading
                            }
                        }
                    />
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
                refetch={() => fetchFaqs()}
            />
            <DeleteModal
                visible={deleteItem}
                title="Are you sure?"
                subtitle="This action cannot be undone. Are you sure you want to delete this question?"
                onClose={() => setDeleteItem(null)}
                onConfirm={ async()=> {
                    if (!deleteItem) return;
                    await deleteFaqs({ variables: { deleteFaqId: deleteItem } })
                }} 
                loading={deleting}
            />
        </>
    );
};

export { FaqsTable };
