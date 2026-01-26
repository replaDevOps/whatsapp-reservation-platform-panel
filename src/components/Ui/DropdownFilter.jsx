import { Dropdown, Button, Flex } from 'antd';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';

/**
 * Reusable Dropdown Filter Component
 * 
 * @param {Array} items - Array of items with {key, label} structure
 * @param {string|number} value - Currently selected value
 * @param {Function} onChange - Callback function when selection changes
 * @param {Function} onClear - Callback function when clear is clicked
 * @param {string} placeholder - Placeholder text when no selection (default: "All Type")
 * @param {string} className - Additional CSS classes for the button
 * @param {Function} t - Translation function (optional, defaults to identity function)
 * @param {boolean} showClearIcon - Whether to show clear icon (default: true)
 * @param {Array} trigger - Dropdown trigger events (default: ['click'])
 */
const DropdownFilter = ({
  items = [],
  value,
  onChange,
  onClear,
  placeholder = "All Type",
  className = "btncancel px-3 filter-bg fs-13 text-black",
  t = (key) => key,
  showClearIcon = true,
  trigger = ['hover']
}) => {
  const handleClick = ({ key }) => {
    // Handle empty string key (for clearing/resetting)
    if (key === '') {
      onChange?.(null);
      return;
    }
    
    // Handle boolean string conversion
    if (key === 'true') {
      onChange?.(true);
    } else if (key === 'false') {
      onChange?.(false);
    } else {
      onChange?.(key);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onClear?.();
  };

  const selectedItem = items.find((item) => {
    const itemKey = item.key;
    // Handle null/empty value matching empty string key
    if (itemKey === '' && (value === null || value === undefined)) {
      return true;
    }
    // Direct comparison for all types including boolean
    return itemKey === value;
  });
  const displayLabel = selectedItem ? t(selectedItem.label) : t(placeholder);

  return (
    <Dropdown
      menu={{
        items: items.map((item) => ({
          key: String(item.key),
          label: t(item.label)
        })),
        onClick: handleClick
      }}
      trigger={trigger}
    >
      <Button className={className}>
        <Flex justify="space-between" align="center" gap={10}>
          {displayLabel}
          {(value !== null && value !== undefined) && showClearIcon ? (
            <CloseOutlined onClick={handleClear} style={{ cursor: 'pointer' }} />
          ) : (
            <DownOutlined />
          )}
        </Flex>
      </Button>
    </Dropdown>
  );
};

export {DropdownFilter}