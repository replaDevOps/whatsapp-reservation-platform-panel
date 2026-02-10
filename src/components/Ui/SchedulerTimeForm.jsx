import { Form, Row, Col, Space, Switch, TimePicker, Flex, Image, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const SchedulerTimeForm = ({
  form,
  name,
  apiErrors,
  t,
  capitalizeTranslated,
  disabled=false
}) => {
  return (
    <Form.List name={name}>
      {(fields) =>
        fields.map(({ key, name }) => (
          <Row key={key} gutter={[5, 10]} align="middle" className="mb-1">
            <Col span={24} lg={6} xl={4}>
              <Space>
                <Form.Item name={[name, "dayOfWeek"]} hidden>
                  <input />
                </Form.Item>

                <Form.Item
                  name={[name, "isClosed"]}
                  valuePropName="checked"
                  noStyle
                  className="m-0"
                  disabled={disabled}
                >
                  <Switch
                    size="small"
                    onChange={(value) => {
                      if (value) {
                        form.setFieldValue(
                          ["scheduleHours", name, "openTime"],
                          null
                        );
                        form.setFieldValue(
                          ["scheduleHours", name, "closeTime"],
                          null
                        );
                      }
                    }}
                    disabled={disabled}
                  />
                </Form.Item>

                {t(
                  capitalizeTranslated(
                    form.getFieldValue(["scheduleHours", name, "dayOfWeek"])
                  )
                )}
              </Space>
            </Col>

            {/* Time Section */}
            <Col span={24}>
              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) =>
                  prev.scheduleHours?.[name]?.isClosed !==
                  curr.scheduleHours?.[name]?.isClosed
                }
              >
                {({ getFieldValue }) => {
                  const isClosed = getFieldValue([
                    "scheduleHours",
                    name,
                    "isClosed",
                  ]);

                  return isClosed ? (
                    <Row gutter={[16, 5]} className="mb-2">
                      {/* Open Time */}
                      <Col span={24} lg={12}>
                        <Form.Item
                          name={[name, "openTime"]}
                          dependencies={[[name, "isClosed"]]}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const closed = getFieldValue([
                                  "scheduleHours",
                                  name,
                                  "isClosed",
                                ]);
                                if (closed && !value) {
                                  return Promise.reject(
                                    t("Please select opening time")
                                  );
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          className="m-0"
                        >
                          <TimePicker
                            format="HH:mm"
                            size="large"
                            className="w-100"
                            placeholder={t("From")}
                            disabled={disabled}
                          />
                        </Form.Item>
                      </Col>

                      {/* Close Time */}
                      <Col span={24} lg={12}>
                        <Form.Item
                          name={[name, "closeTime"]}
                          dependencies={[[name, "isClosed"]]}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const closed = getFieldValue([
                                  "scheduleHours",
                                  name,
                                  "isClosed",
                                ]);
                                if (closed && !value) {
                                  return Promise.reject(
                                    t("Please select closing time")
                                  );
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          className="m-0"
                        >
                          <TimePicker
                            format="HH:mm"
                            size="large"
                            className="w-100"
                            placeholder={t("To")}
                            disabledTime={() => {
                              const openTime = getFieldValue([
                                "scheduleHours",
                                name,
                                "openTime",
                              ]);

                              if (!openTime) return {};

                              const openHour = openTime.hour();
                              const openMinute = openTime.minute();

                              return {
                                disabledHours: () =>
                                  Array.from(
                                    { length: openHour + 1 },
                                    (_, i) => i
                                  ),
                                disabledMinutes: (hour) =>
                                  hour === openHour
                                    ? Array.from(
                                        { length: openMinute + 1 },
                                        (_, i) => i
                                      )
                                    : [],
                              };
                            }}
                            disabled={disabled}
                          />
                        </Form.Item>
                      </Col>

                      {/* API Errors */}
                      {
                        apiErrors && 
                        <Col span={24}>
                          <Flex justify="center">
                            {(() => {
                              const dayKey = form
                                .getFieldValue([
                                  "scheduleHours",
                                  name,
                                  "dayOfWeek",
                                ])
                                ?.toLowerCase();

                              return apiErrors?.[dayKey]?.map((msg, idx) => (
                                <div className="text-red-dark fs-12" key={idx}>
                                  {msg.toLowerCase().includes("closed on")
                                    ? msg
                                    : null}
                                </div>
                              ));
                            })()}
                          </Flex>
                        </Col>
                      }
                    </Row>
                  ) : (
                    <Flex className="offday" gap={5}>
                      <Form.Item
                        name={[name, "openTime"]}
                        initialValue={dayjs("00:00", "HH:mm")}
                        hidden
                      >
                        <TimePicker />
                      </Form.Item>

                      <Form.Item name={[name, "closeTime"]} hidden>
                        <TimePicker />
                      </Form.Item>

                      <Image
                        preview={false}
                        src="/assets/icons/off.webp"
                        width={20}
                        alt="off"
                      />
                      <Text italic className="text-gray">
                        {t("Day Off")}
                      </Text>
                    </Flex>
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
        ))
      }
    </Form.List>
  );
};

export {SchedulerTimeForm};
