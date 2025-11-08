import { Flex, Table } from 'antd'
import { CustomPagination } from '../../../Ui'
import { businessstaffColumns, businessstaffData } from '../../../../data'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BusinessStaffTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const {t,i18n} = useTranslation()
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };
    return (
        <Flex vertical gap={20}>
            <Table
                size='large'
                columns={businessstaffColumns({t})}
                dataSource={businessstaffData}
                className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                showSorterTooltip={false}
                scroll={{ x: 800 }}
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
        </Flex>
    )
}

export {BusinessStaffTable}