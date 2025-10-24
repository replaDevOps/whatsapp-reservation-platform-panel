import {Form, Select, Typography} from 'antd';
import './index.css'
export const MySelect = ({withoutForm, placeholder, name,label,mode,disabled,required,message,value,options, className, error, ...props}) => {
  return (
    withoutForm?
      <Select 
        maxTagCount= 'responsive'
        className={`select without-form-select w-100 ${className}`}
        value={value || ''} 
        mode={mode || ''} 
        disabled={disabled || false} 
        {...props}
        placeholder={placeholder}
      >
          {
              options?.map(opt=><Select.Option value={opt?.id} key={opt?.id}>{opt?.name}</Select.Option>)
          }

          
      </Select>
      :
      <Form.Item
          name={name}
          label={<Typography.Text  className="fs-14 fw-400">{label}</Typography.Text>}
          rules={[
              {
              required,
              message,
              },
          ]}
          help={error}
          className='custom-select'
          >
              <Select 
                value={value || ''} 
                mode={mode || ''} 
                disabled={disabled || false} 
                maxTagCount= 'responsive'
                {...props}
                placeholder={placeholder}
                >
                  {
                      options?.map(opt=><Select.Option value={opt?.name} key={opt?.id}>{opt?.name}</Select.Option>)
                  }
              </Select>
      </Form.Item>  
  )
}