import { Flex } from 'antd'
import { BookingTable, BreadCrumbCard } from '../../components'
import { BusinessTitle } from '../../shared'
import { useTranslation } from 'react-i18next'

function BookingPage() {
  const {t} = useTranslation()
  const title = BusinessTitle({t})
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                { title: title },
                { title: t("Bookings") },
            ]}
        />
        <BookingTable />
    </Flex>
  )
}

export {BookingPage} 