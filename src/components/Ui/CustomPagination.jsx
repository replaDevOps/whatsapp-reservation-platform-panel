import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Flex, Select, Pagination, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../shared';

const CustomPagination = ({
  total,
  pageSize,
  current,
  onPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  if (!total || total <= pageSize) return null;
  const { t, i18n } = useTranslation();
  const isArabic = i18n?.language === "ar";

  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="text-black">
          {isArabic ? (
            <>
              {t("Previous")} <RightOutlined />
            </>
          ) : (
            <>
              <LeftOutlined /> {t("Previous")}
            </>
          )}
        </a>
      );
    }

    if (type === "next") {
      return (
        <a className="text-black">
          {isArabic ? (
            <>
              <LeftOutlined /> {t("Next")}
            </>
          ) : (
            <>
              {t("Next")} <RightOutlined />
            </>
          )}
        </a>
      );
    }
    return isArabic ? (
      <span>{toArabicDigits(page.toString())}</span>
    ) : (
      originalElement
    );
  };

  return (
    <ConfigProvider direction={isArabic ? "rtl" : "ltr"}>
      <Flex justify="space-between" align="center" className="px-2 py-4 mbl-pag">
        <Flex align="center" gap={8}>
          <span className="text-gray-500">{t("Rows per page")}:</span>

          <Select
            value={pageSize}
            onChange={(value) => onPageChange(1, value)}
            options={pageSizeOptions.map((size) => ({
              value: size,
              label: isArabic ? toArabicDigits(size.toString()) : size.toString(),
            }))}
            className="filter-pag w-80"
          />
        </Flex>

        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showLessItems
          itemRender={itemRender}
          className="pagination"
        />
      </Flex>
    </ConfigProvider>
  );
};

export { CustomPagination };
