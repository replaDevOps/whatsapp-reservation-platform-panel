import { useState } from "react";
import { Form, Select, Row, Col, Button, Typography, Card, Modal } from "antd";
import ReactCountryFlag from "react-country-flag";

const { Option } = Select;
const { Title } = Typography;

const LanguageSettings = () => {
  const [language, setLanguage] = useState("English");
  const [open, setOpen] = useState(false);
  const [tempLanguage, setTempLanguage] = useState(language); // modal ke liye temporary

  const handleSave = () => {
    setLanguage(tempLanguage); // front page update
    setOpen(false);
  };


  return (
    <Card
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "15px",
        width: "100%",
        margin: "10px auto",
      }}
    >
      <Form layout="vertical">
        <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
          <Col>
            <Title level={5} style={{ margin: 0 }} className="fs-13">
              Language Settings
            </Title>
          </Col>
          <Col>
            <Button type="default" onClick={() => {
              setTempLanguage(language); // modal me current language set
              setOpen(true);
            }}>
              Change
            </Button>
          </Col>
        </Row>

        {/* Front page select box */}
        <Form.Item label="Selected Language">
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: "100%" }}
            optionLabelProp="label"
          >
            <Option
              value="English"
              label={
                <span>
                  <ReactCountryFlag countryCode="US" svg style={{ marginRight: 7 }} />
                  English
                </span>
              }
            >
              English
            </Option>
            <Option
              value="Urdu"
              label={
                <span>
                  <ReactCountryFlag countryCode="PK" svg style={{ marginRight: 7 }} />
                  Urdu
                </span>
              }
            >
              Urdu
            </Option>
            <Option
              value="Arabic"
              label={
                <span>
                  <ReactCountryFlag countryCode="SA" svg style={{ marginRight: 7 }} />
                  Arabic
                </span>
              }
            >
              Arabic
            </Option>
          </Select>
        </Form.Item>
      </Form>

      {/* Modal */}
      <Modal
        title="Change Language"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Select Language" style={{ marginBottom: 10 }}>
            <Select
              value={tempLanguage} // modal ke liye temporary
              onChange={setTempLanguage}
              style={{ width: "100%" }}
              optionLabelProp="label"
            >
              <Option
                value="English"
                label={
                  <span>
                    <ReactCountryFlag countryCode="US" svg style={{ marginRight: 7 }} />
                    English
                  </span>
                }
              >
                English
              </Option>
              <Option
                value="Urdu"
                label={
                  <span>
                    <ReactCountryFlag countryCode="PK" svg style={{ marginRight: 7 }} />
                    Urdu
                  </span>
                }
              >
                Urdu
              </Option>
              <Option
                value="Arabic"
                label={
                  <span>
                    <ReactCountryFlag countryCode="SA" svg style={{ marginRight: 7 }} />
                    Arabic
                  </span>
                }
              >
                Arabic
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LanguageSettings;