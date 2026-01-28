import { Form, TimePicker, DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';

export const MyDatepicker = ({
    withoutForm,
    name,
    label,
    disabled,
    required,
    message,
    value,
    rangePicker,
    placeholder,
    datePicker,
    ...props
}) => {

    const toDayjs = (val) => {
        if (!val) return null;
        if (dayjs.isDayjs(val)) return val;
        return dayjs(val);
    };

    return (
        <>
            {withoutForm ? (
                datePicker ? (
                    <DatePicker
                        disabled={disabled}
                        value={toDayjs(value)}
                        format={'YYYY-MM-DD'}
                        {...props}
                        className='fs-14 without-timeinput w-100'
                        placeholder={placeholder}
                    />
                ) : rangePicker ? (
                    <DatePicker.RangePicker
                        disabled={disabled}
                        value={value}
                        {...props}
                        className='fs-14 without-timeinput w-100'
                        placeholder={placeholder}
                    />
                ) : (
                    <TimePicker
                        disabled={disabled}
                        value={toDayjs(value)}
                        format="hh:mm A"
                        use12Hours
                        {...props}
                        className='fs-14 without-timeinput w-100'
                        placeholder={placeholder}
                    />
                )
            ) : (
                <Form.Item
                    name={name}
                    label={<Typography.Text className='fs-14 fw-400'>{label}</Typography.Text>}
                    rules={[
                        {
                            required,
                            message,
                        },
                    ]}
                    className='custom-input fs-14'
                >
                    {datePicker ? (
                        <DatePicker
                            disabled={disabled}
                            value={toDayjs(value)}
                            {...props}
                            className='w-100'
                            placeholder={placeholder}
                        />
                    ) : rangePicker ? (
                        <DatePicker.RangePicker
                            disabled={disabled}
                            value={value}
                            {...props}
                            className='w-100'
                            placeholder={placeholder}
                        />
                    ) : (
                        <TimePicker
                            disabled={disabled}
                            value={toDayjs(value)}
                            format="hh:mm A"
                            use12Hours
                            placeholder={placeholder}
                            {...props}
                            className='w-100'
                        />
                    )}
                </Form.Item>
            )}
        </>
    );
}
