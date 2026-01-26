import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'

export const exportToExcel = ({
  columns,
  dataSource,
  fileName = 'Export',
}) => {
  // Only columns that appear in table
  const exportableColumns = columns.filter(
    col => col.dataIndex && !col.hidden
  )

  // Header row
  const headers = exportableColumns.map(col => col.title)

  // Data rows
  const rows = dataSource.map(row =>
    exportableColumns.map(col => {
      const value = row[col.dataIndex]

      // ✅ Explicit date formatting ONLY
      if (col.isDate && value) {
        return dayjs(value).format(col.format || 'DD MMM YYYY')
      }

      // ✅ Custom export formatter (optional)
      if (col.exportRender) {
        return col.exportRender(value, row)
      }

      // ✅ Keep phone numbers as string
      if (col.isPhone && value) {
        return `'${value}`
      }

      return value ?? '-'
    })
  )

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])

  // Column width
  worksheet['!cols'] = exportableColumns.map(() => ({ wch: 22 }))

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })

  saveAs(
    new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }),
    `${fileName}.xlsx`
  )
}
