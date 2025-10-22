import React, { useState } from "react";
import { Card, Button, message, Typography } from "antd";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const { Title, Text } = Typography;

const TermsCondition = () => {
  const [content, setContent] = useState(""); // holds editor content
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!content || content.trim() === "") {
      message.warning("Please write some content before saving.");
      return;
    }
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Terms & Condition saved successfully!");
      console.log("Saved content: ", content); // send to backend here
    }, 1200);
  };

  const handleCancel = () => {
    setContent("");
    message.info("Changes cleared.");
  };

  return (
    <div style={{ padding: "16px 0px" }}>
      {/* Header Card */}
      <Card
        style={{ marginBottom: 16, borderRadius: 8 }}
        bodyStyle={{ padding: 16 }}
        className="card-cs"
      >
        <Title level={4} style={{ marginBottom: 4 }}>
          Terms & Condition
        </Title>
        <Text type="secondary">
          Manage all the platform Terms & Condition in your system
        </Text>
      </Card>

      {/* Editor Section */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: 16 }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          Page Body
        </Title>

        <ReactQuill
          theme="snow"
          placeholder="Write Here"
          style={{ height: 300, marginBottom: 64 }}
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ font: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ size: [] }],
              [{ align: [] }],
              ["blockquote", "code-block"],
              [{ header: [1, 2, 3, 4, 5, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 16,
            gap: 8,
          }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="primary"
            style={{ background: "#0dcaf0", borderColor: "#0dcaf0" }}
            loading={loading}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TermsCondition;
