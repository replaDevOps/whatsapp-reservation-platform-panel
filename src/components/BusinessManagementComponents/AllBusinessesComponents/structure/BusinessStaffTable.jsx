import { Flex, Table } from 'antd'
import { CustomPagination } from '../../../Ui'
import { businessstaffColumns } from '../../../../data'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_STAFF_BY_BRANCHID } from '../../../../graphql/query';
import { TableLoader } from '../../../../shared';
import { useLazyQuery } from '@apollo/client/react';

const BusinessStaffTable = ({id,setStaffTableData}) => {

    const [pageSize, setPageSize] = useState(10);
    const {t,i18n} = useTranslation()
    const [current, setCurrent] = useState(1);
    const [ staffbranchdata, setStaffBranchData ] = useState([])
    const [ getStaffByBranch, { data, loading } ] = useLazyQuery(GET_STAFF_BY_BRANCHID,{
        fetchPolicy: 'network-only'
    })

    useEffect(()=>{
        if(getStaffByBranch){
            getStaffByBranch({
                variables:{
                    limit: pageSize,
                    offSet: (current - 1) * pageSize,
                    branchId: id, 
                }
            })
        }
    },[getStaffByBranch])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(()=>{
        setStaffBranchData(data?.getStaffByBranch?.user);
        setStaffTableData(data?.getStaffByBranch?.user)
    },[data])
    return (
        <Flex vertical gap={20}>
            <Table
                size='large'
                columns={businessstaffColumns({t})}
                dataSource={staffbranchdata}
                className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                showSorterTooltip={false}
                scroll={{ x: 800 }}
                rowHoverable={false}
                pagination={false}
                loading={{
                    ...TableLoader,
                    spinning:loading
                }}
            />
            <CustomPagination 
                total={data?.getStaffByBranch?.totalCount}
                current={current}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </Flex>
    )
}

export {BusinessStaffTable}