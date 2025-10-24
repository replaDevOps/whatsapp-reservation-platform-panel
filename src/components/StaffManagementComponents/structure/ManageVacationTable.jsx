import { useState } from 'react';
import { Flex, Table, Form } from 'antd';
import { ConfirmModal, CustomPagination } from '../../Ui';
import { managervacationtableColumn, managevacationData } from '../../../data';

const ManageVacationTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [ visible, setVisible ] = useState(false)
    const [ rejectvacation, setRejectVacation ] = useState(false)

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    
    return (
        <>
            <Flex vertical gap={20} className='mt-3'>
                <Table
                    size='large'
                    columns={managervacationtableColumn({setVisible, setRejectVacation})}
                    dataSource={managevacationData}
                    className='pagination table-cs table'
                    showSorterTooltip={false}
                    scroll={{ x: 1000 }}
                    rowHoverable={false}
                    pagination={false}
                    // loading={isLoading}
                />
                <CustomPagination 
                    total={12}
                    current={current}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />

                <ConfirmModal 
                    type={'danger'}
                    visible={visible}
                    title={'Are you sure?'}
                    subtitle={rejectvacation ? 'Are you sure you want to reject vacation?' : 'Are you sure you want to approved vacation?'}
                    onClose={()=>{setVisible(false);setRejectVacation(false)}}
                />
            </Flex>
        </>
    );
};

export { ManageVacationTable };