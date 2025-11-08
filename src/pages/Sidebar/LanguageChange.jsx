import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { actionsApi } from '../../shared'

const LanguageChange = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [selected, setSelected] = useState({
    key: "1",
    label: "English",
    flag: "https://flagcdn.com/w20/us.png",
  })

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en"

    i18n.changeLanguage(lang)
    dispatch(actionsApi?.changeLanguage(lang))
    document.body.dir = i18n.dir()

    setSelected(
      lang === "ar"
        ? {
            key: "2",
            label: "العربية",
            flag: "https://flagcdn.com/w20/sa.png",
          }
        : {
            key: "1",
            label: "English",
            flag: "https://flagcdn.com/w20/us.png",
          }
    )
  }, []) // ✅ RUNS ONLY ONCE

  const handleChange = (value) => {
    localStorage.setItem("lang", value)
    i18n.changeLanguage(value)
    dispatch(actionsApi?.changeLanguage(value))
    document.body.dir = i18n.dir(value)

    setSelected(
      value === "ar"
        ? {
            key: "2",
            label: "العربية",
            flag: "https://flagcdn.com/w20/sa.png",
          }
        : {
            key: "1",
            label: "English",
            flag: "https://flagcdn.com/w20/us.png",
          }
    )
  }

  const items = [
    {
      key: "1",
      label: (
        <span onClick={() => handleChange("en")}>
          <img src="https://flagcdn.com/w20/us.png" width={18} className="mx-8" />
          {t("English")}
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleChange("ar")}>
          <img src="https://flagcdn.com/w20/sa.png" width={18} className="mx-8" />
          {t("Arabic")}
        </span>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button>
        <Flex align="center" gap={10}>
          <img src={selected.flag} width={18} />
          <span>{selected.label}</span>
          <DownOutlined />
        </Flex>
      </Button>
    </Dropdown>
  )
}

export { LanguageChange }
