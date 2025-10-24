import { Form, Button, Typography, Row, Col, Checkbox, Flex, Image, Card} from "antd";
import { NavLink } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../components";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const SignInTabletPage = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    return (
        <>
            {contextHolder}
            <Row className="signup-page" align={"middle"}>
                <Col xs={24} sm={24} md={12} lg={10} className="signup-form-container">
                    <div className="form-inner">
                        <NavLink to={"/"}>
                            <div className="logo">
                                <img src="/assets/images/login-l.webp" className="h-70" alt='login image' fetchPriority="high" />
                            </div>
                        </NavLink>

                        <Flex align="center" gap={10} className="mb-1">
                            <Button className="p-0 bg-transparent border-0" onClick={()=>navigate('/login')}>
                                <ArrowLeftOutlined />
                            </Button>
                            <Title level={3} className="m-0">Welcome Admin.</Title>
                        </Flex>
                        <Paragraph className="fs-16">
                            Please sign in to access tablet UI for self booking.
                        </Paragraph>

                        <Form layout="vertical" 
                            form={form} 
                            // onFinish={handleFinish} 
                            requiredMark={false}
                        >
                            <MyInput 
                                label="Username" 
                                name="username" 
                                required 
                                message="Please enter username" 
                                placeholder="Enter username" 
                            />
                            <MyInput 
                                label="Password" 
                                type="password" 
                                name="password" 
                                required 
                                message="Please enter password" 
                                placeholder="Enter Password" 
                            />
                            <Button htmlType="submit" type="primary" className="btnsave bg-dark-blue fs-16" block 
                                // loading={loading}
                            >
                                Sign In
                            </Button>
                            <Card className="card-16 border-0 bg-light-yellow  mt-3">
                                <Text className='text-brown fs-14'>
                                    These login details are created in your client admin panel under Tablet Access. Contact your admin if you don’t have credentials.
                                </Text>
                            </Card>
                        </Form>
                    </div>
                </Col>
                <Col xs={0} md={12} lg={14} className="signup-visual-container">
                    <Flex vertical justify="space-between" align="center" gap={40} className="logo-sp">
                        <Flex vertical align="center" gap={20}>
                            <Title level={2} className="m-0">
                                Simplify Your Bookings,
                            </Title>
                            <Title level={2} className="m-0 text-dark-brand">
                                Streamline <span className="px-2 radius-12 py-2 bg-white">Your Day.</span>
                            </Title>
                        </Flex>
                        <Image src="/assets/images/login-frame.png" preview={false} alt='dashboard image' fetchPriority="high" />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export { SignInTabletPage };
