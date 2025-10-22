import React, { useState } from 'react';
import { Form, TimePicker, Switch, Row, Col, Button } from 'antd';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TimeForm = () => {
  const [form] = Form.useForm();
  const [dayStates, setDayStates] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: false, // Friday starts as 'Day Off'
    Saturday: true,
    Sunday: true,
  });

  const handleToggle = (day, checked) => {
    setDayStates((prev) => ({ ...prev, [day]: checked }));
    if (!checked) {
      // Clear time fields if day is toggled off
      form.setFieldsValue({
        [`${day.toLowerCase()}_from`]: null,
        [`${day.toLowerCase()}_to`]: null,
      });
    }
  };

  const onFinish = (values) => {
    console.log('Received working hours: ', values);
    // You would typically process and save these values to your backend
  };

  return (
    <div className="working-hours-container">
      <h2 className="working-hours-title">Working Hours</h2>
      <Form
        form={form}
        name="working_hours_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          // Set initial values if needed, e.g., for editing existing hours
          // For now, setting default for Friday to show 'Day Off' text
          friday_from: null,
          friday_to: null,
        }}
      >
        {daysOfWeek.map((day) => (
          <Row key={day} align="middle" gutter={16} className="day-row">
            <Col span={6}>
              <div className="day-label">
                <Switch
                  checked={dayStates[day]}
                  onChange={(checked) => handleToggle(day, checked)}
                  className="day-switch"
                />
                <span className="day-name">{day}</span>
              </div>
            </Col>
            <Col span={18}>
              {dayStates[day] ? (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name={`${day.toLowerCase()}_from`} noStyle>
                      <TimePicker
                        format="HH:mm"
                        placeholder="From" // Remove default clock icon
                        className="time-picker"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={`${day.toLowerCase()}_to`} noStyle>
                      <TimePicker
                        format="HH:mm"
                        placeholder="To" // Remove default clock icon
                        className="time-picker"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <div className="day-off-text">Day Off</div>
              )}
            </Col>
          </Row>
        ))}

        <Form.Item className="form-buttons">
          <Button onClick={() => console.log('Cancel clicked')}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export  {TimeForm};