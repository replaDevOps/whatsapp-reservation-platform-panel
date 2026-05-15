import { Form, Input, Typography } from "antd";
import "./index.css";
import { handleNumberInput, handleNumberKeyDown } from "../../shared";
export const MyInput = ({
  withoutForm,
  maxLength,
  name,
  label,
  tooltip,
  type,
  size,
  disabled,
  required,
  message,
  value,
  placeholder,
  textArea,
  oTp,
  nolabel = true,
  validator,
  isPhoneNumber,
  ...props
}) => {
  return (
    <>
      {withoutForm ? (
        textArea ? (
          <Input.TextArea
            placeholder={placeholder || ""}
            value={value || ""}
            {...props}
            className="custom-input fs-14"
          />
        ) : type === "password" ? (
          <Input.Password
            placeholder={placeholder || ""}
            value={value || ""}
            size={size || "middle"}
            disabled={disabled || false}
            {...props}
            className="custom-input fs-14"
          />
        ) : (
          <Input
            type={type || "text"}
            placeholder={placeholder || ""}
            value={value || ""}
            size={size || "middle"}
            disabled={disabled || false}
            {...props}
            className="custom-input fs-14"
          />
        )
      ) : (
        <Form.Item
          name={name}
          label={
            <Typography.Text className="fs-14 fw-400">{label}</Typography.Text>
          }
          tooltip={tooltip || null}
          className="custom-input fs-14 otp-cs"
          rules={
            validator
              ? [
                  {
                    required: required,
                    message: message,
                  },
                  validator,
                ]
              : [
                  {
                    required: required,
                    message: message,
                  },
                ]
          }
        >
          {textArea ? (
            <Input.TextArea
              placeholder={placeholder || ""}
              value={value || ""}
              {...props}
              disabled={disabled || false}
              maxLength={maxLength}
            />
          ) : oTp ? (
            <Input.OTP
              placeholder={placeholder || ""}
              value={value || ""}
              {...props}
              disabled={disabled || false}
            />
          ) : type === "password" ? (
            <Input.Password
              placeholder={placeholder || ""}
              value={value || ""}
              size={size || "middle"}
              disabled={disabled || false}
              {...props}
            />
          ) : (
            <Input
              type={isPhoneNumber ? "text" : type || "text"}
              placeholder={placeholder || ""}
              value={value}
              size={size || "middle"}
              disabled={disabled || false}
              maxLength={maxLength}
              inputMode={isPhoneNumber ? "numeric" : undefined}
              onKeyDown={isPhoneNumber ? handleNumberKeyDown : props.onKeyDown}
              onInput={isPhoneNumber ? handleNumberInput : props.onInput}
              {...props}
            />
          )}
        </Form.Item>
      )}
    </>
  );
};
