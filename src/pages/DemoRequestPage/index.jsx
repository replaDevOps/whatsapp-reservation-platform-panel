import { Flex } from 'antd'
import { BreadCrumbCard, DemoRequestTable } from '../../components'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'

const DemoRequestPage = () => {
    const {t} = useTranslation()
    const title = BusinessTitle({t})
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t("Demo Requests") },
                ]}
            />
            <DemoRequestTable />
        </Flex>
    )
}

export {DemoRequestPage}