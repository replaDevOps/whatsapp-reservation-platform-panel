import { Flex } from 'antd'
import { BreadCrumbCard, StaffTable } from '../../components'

const StaffPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Staff Management', },
                    { title: 'Staffs' },
                ]}
            />
            <StaffTable />
        </Flex>
    )
}

export {StaffPage}