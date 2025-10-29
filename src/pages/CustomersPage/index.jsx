import { Flex } from 'antd'
import { BreadCrumbCard, CustomerTable } from '../../components'

const CustomersPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Business Management', },
                    { title: 'Customers' },
                ]}
            />
            <CustomerTable />
        </Flex>
    )
}

export {CustomersPage}