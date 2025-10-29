import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Upload, Form, Typography, Flex, Avatar, Image } from 'antd';
const { Dragger } = Upload;

const UploadSingleFile = ({ multiple = false, name, required, message, form, label, title,onUpload, align = "center", className='upload-d', labelimg='/assets/icons/export.webp' }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = async (info) => {
    let newFileList = [...info.fileList];

    if (!multiple) {
      newFileList = newFileList.slice(-1);
    }

    setFileList(newFileList);

    const files = multiple ? newFileList.map(file => file.originFileObj) : newFileList[0]?.originFileObj || null;
    form.setFieldsValue({ [name]: files });
    try {
      if (multiple) {
        // upload all files in parallel
        await Promise.all(files.map(file => onUpload(file)));
      } else {
        await onUpload(files);
      }
      // You can show success message or update UI here if needed
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed");
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter(f => f.uid !== file.uid);
    setFileList(newFileList);
    
    const files = multiple ? newFileList.map(f => f.originFileObj) : null;
    form.setFieldsValue({ [name]: files || null });
  };

  return (
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required,
            message,
          },
        ]}
        className="m-0 w-100"
      >
        <Flex vertical align={align} className="w-100">
        {(multiple || fileList.length === 0) && (
          <Dragger
            name="file"
            multiple={multiple}
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 1000);
            }}
            fileList={fileList}
            onChange={handleChange}
            onDrop={(e) => console.log('Dropped files', e.dataTransfer.files)}
            className={className}
          >
            {fileList.length === 0 || multiple ? (
              <Flex vertical align='center' justify='center' className='upload-flex'>
                <Image src={labelimg} width={24} height={24} alt='image icon' fetchPriority="high" />
                <p className="ant-upload p-0 m-0 text-black">{title}</p>
              </Flex>
            ) : null}
          </Dragger>
        )}
        {fileList.length > 0 && (
          <div className="w-100">
            {fileList.map(file => (
              <Flex key={file.uid} justify='space-between' className="w-100 p-2 mt-2 radius-4 bg-light-gray" gap={4}>
                <Flex align='center' gap={10} className='w-100'>
                    <Avatar src={file.thumbUrl || URL.createObjectURL(file.originFileObj)} size={34} fetchPriority="high" alt="file-icon"/>
                    <Flex vertical align='flex-start'>
                        <Typography.Text className='text-gray fs-12'>{file.name.slice(0, 20)}{file.name.length > 20 ? '...' : ''}</Typography.Text>
                        <Typography.Text className='fs-12'>
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                        </Typography.Text>
                    </Flex>
                </Flex>
                <CloseOutlined 
                    className="text-red cursor-pointer" 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(file);
                    }}
                />
              </Flex>
            ))}
          </div>
        )}
        </Flex>
      </Form.Item>
  );
};

export { UploadSingleFile };