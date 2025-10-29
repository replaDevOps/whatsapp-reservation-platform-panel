import { Flex } from 'antd'
import { BreadCrumbCard, DemoRequestTable } from '../../components'

const DemoRequestPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Business Management', },
                    { title: 'Demo Requests' },
                ]}
            />
            <DemoRequestTable />
        </Flex>
    )
}

export {DemoRequestPage}