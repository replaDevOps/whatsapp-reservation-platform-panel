import { Flex } from 'antd'
import { BreadCrumbCard, StaffTable } from '../../components'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'

const StaffPage = () => {
    const {t} = useTranslation()
    const title = BusinessTitle({t})
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t("Staffs") },
                ]}
            />
            <StaffTable />
        </Flex>
    )
}

export {StaffPage}