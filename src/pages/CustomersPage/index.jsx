import { Flex } from 'antd'
import { BreadCrumbCard, CustomerTable } from '../../components'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'

const CustomersPage = () => {
    const {t} = useTranslation()
    const title = BusinessTitle({t})
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t("Customers") },
                ]}
            />
            <CustomerTable />
        </Flex>
    )
}

export {CustomersPage}