import { Flex, Table } from 'antd'
import { CustomPagination } from '../../../Ui'
import { businessserviceColumns, businessserviceData } from '../../../../data'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { TableLoader } from '../../../../shared';
import { GET_SERVICES_BY_BRANCHID } from '../../../../graphql/query';

const BusinessServiceTable = ({id,setServiceTableData}) => {
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [ servicesData, setServicesData ] = useState([])
    const [ getServiceByBranch, { data, loading } ] = useLazyQuery(GET_SERVICES_BY_BRANCHID,{
        fetchPolicy: 'network-only'
    })

    useEffect(()=>{
        if(getServiceByBranch){
            getServiceByBranch({
                variables:{
                    limit: pageSize,
                    offSet: (current - 1) * pageSize,
                    branchId: id, 
                }
            })
        }
    },[getServiceByBranch])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(()=>{
        setServicesData(data?.getServicesByBranch?.services)
        setServiceTableData(data?.getServicesByBranch?.services)
    },[data])
    return (
        <Flex vertical gap={20}>
            <Table
                size='large'
                columns={businessserviceColumns({t,i18n})}
                dataSource={servicesData}
                className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                showSorterTooltip={false}
                scroll={{ x: 800 }}
                rowHoverable={false}
                pagination={false}
                rowKey={"id"}
                loading={{
                    ...TableLoader,
                    spinning: loading
                }}
            />
            <CustomPagination 
                total={data?.getServicesByBranch?.totalCount}
                current={current}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </Flex>
    )
}

export {BusinessServiceTable}