import { useRef, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Flex, Spin } from "antd";
import { SingleFileUpload } from "../Forms";
import { uploadFileToServer } from "../../services";
import { TableLoader } from "../../shared";

const UploadImage = ({
  setPreviewImage,
  src,
  t,
  form,
  disabled = false,
  api = null,
}) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        await uploadFileToServer({ file, setPreviewImage });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      await uploadFileToServer({ file, setPreviewImage });
    } finally {
      setLoading(false);
    }
  };

  const hasValidImage = !!src && src !== "null";

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "100px" }}>
          <Spin {...TableLoader} size="small" />
        </Flex>
      ) : !hasValidImage ? (
        <SingleFileUpload
          name="document"
          title={t("Upload Image")}
          form={form}
          onUpload={handleUpload}
          align="center"
          width={100}
          height={100}
          acceptFileType="image"
          api={api}
        />
      ) : (
        <Flex vertical gap={5} justify="center" align="center">
          <img
            src={src}
            alt="Category"
            className="radius-12 mxw-mxh"
            fetchPriority="high"
          />
          <div>
            <Button
              disabled={disabled}
              type="link"
              className="fs-13 text-brand"
              onClick={handleEditClick}
            >
              <EditFilled /> {t("Edit")}
            </Button>
          </div>
        </Flex>
      )}
    </>
  );
};

export { UploadImage };
