import { useState } from 'react'
import { Card, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { LanguageChange } from '../../../Ui'

const { Title } = Typography

const LanguageSetting = () => {
  const { t } = useTranslation()

  return (
    <>
      <Card className='card-bg card-cs radius-12 border-gray'>
        <Flex gap={10} vertical>
          <Flex justify='space-between' align='center'>
            <Title level={5} className="fw-500 m-0">
              {t("Language Settings")}
            </Title>
          </Flex>

          <LanguageChange languageClass='btncancel px-3' />
        </Flex>
      </Card>
    </>
  )
}

export { LanguageSetting }
