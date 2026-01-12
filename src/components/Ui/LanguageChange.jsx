import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { actionsApi } from '../../shared'

const LANGS = {
  en: { label: "English", flag: "https://flagcdn.com/w20/us.png" },
  ar: { label: "العربية", flag: "https://flagcdn.com/w20/sa.png" },
}

const LanguageChange = ({ languageClass = '' }) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const currentLang = i18n.language || 'en'
  const selected = LANGS[currentLang] || LANGS.en

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "en"
    if (saved !== i18n.language) {
      i18n.changeLanguage(saved)
    }
    document.body.dir = i18n.dir()
  }, [i18n])

  const handleChange = (lang) => {
    localStorage.setItem("lang", lang)
    i18n.changeLanguage(lang)
    dispatch(actionsApi?.changeLanguage(lang))
    document.body.dir = i18n.dir()
  }

  const items = Object.keys(LANGS).map(key => ({
    key,
    label: (
      <Flex align="center" gap={8}>
        <img src={LANGS[key].flag} width={18} />
        {t(key === "en" ? "English" : "Arabic")}
      </Flex>
    ),
  }))

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => handleChange(key),
      }}
      trigger={['click']}
    >
      <Button className={languageClass}>
        <Flex align="center" justify="space-between" className="w-100">
          <Flex align="center" gap={6}>
            <img src={selected.flag} width={18} />
            <span>{selected.label}</span>
          </Flex>
          <DownOutlined />
        </Flex>
      </Button>
    </Dropdown>
  )
}

export { LanguageChange }
