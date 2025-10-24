import React, { useState } from "react";
import { PlusOutlined, MinusCircleFilled } from "@ant-design/icons";
import { Upload, Form, Flex } from "antd";

const { Dragger } = Upload;

const SingleFileUpload = ({
  multiple = false,
  name,
  required,
  message,
  form,
  label,
  title,
  onUpload,
  align = "center",
  width = 150,
  height = 150
}) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = async (info) => {
    let newFileList = [...info.fileList];

    if (!multiple) {
      newFileList = newFileList.slice(-1);
    }

    setFileList(newFileList);

    const files = multiple
      ? newFileList.map((file) => file.originFileObj)
      : newFileList[0]?.originFileObj || null;
    form.setFieldsValue({ [name]: files });

    try {
      if (multiple) {
        await Promise.all(files.map((file) => onUpload(file)));
      } else if (files) {
        await onUpload(files);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    const files = multiple ? newFileList.map((f) => f.originFileObj) : null;
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
        {/* Upload Area */}
        {(multiple || fileList.length === 0) && (
          <Dragger
            name="file"
            multiple={multiple}
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 500);
            }}
            fileList={fileList}
            onChange={handleChange}
            className="upload-d"
          >
            {fileList.length === 0 || multiple ? (
              <Flex
                vertical
                align="center"
                justify="center"
                className="upload-flex"
              >
                <PlusOutlined className="fs-16" />
                <p className="ant-upload p-0 m-0 text-black">{title}</p>
              </Flex>
            ) : null}
          </Dragger>
        )}

        {/* Uploaded Files / Images */}
        {fileList.length > 0 && (
          <Flex
            vertical
            gap={10}
            align={align}
            justify="center"
            className="w-100 mt-2"
          >
            {fileList.map((file) => {
              const isImage =
                file.type?.startsWith("image/") ||
                /\.(png|jpe?g|gif|webp)$/i.test(file.name);

              return (
                <Flex
                  key={file.uid}
                  align="center"
                  gap={10}
                  className="position-relative"
                  justify={align}
                >
                  {isImage ? (
                    <img
                      src={
                        file.thumbUrl || URL.createObjectURL(file.originFileObj)
                      }
                      alt={file.name}
                      width={width}
                      height={height}
                      className="object-cover radius-12"
                      fetchPriority="high"
                    />
                  ) : (
                    <img
                      src="/assets/icons/file.png"
                      alt="file-icon"
                      width={24}
                      className="pt-1"
                      fetchPriority="high"
                    />
                  )}
                  <MinusCircleFilled
                    className="text-red cursor delete-btn fs-18"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(file);
                    }}
                  />
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Form.Item>
  );
};

export { SingleFileUpload };
