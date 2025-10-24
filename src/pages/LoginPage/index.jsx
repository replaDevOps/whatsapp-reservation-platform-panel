import { Form, Button, Typography, Row, Col, Checkbox, Flex, Image } from "antd";
import { NavLink } from "react-router-dom";
import { message } from "antd";
// import { useMutation } from "@apollo/client";
// import { LOGIN } from "../../graphql/mutation/login";
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../components";

const { Title, Paragraph } = Typography;
const LoginPage = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    // const [loginUser, { loading, error }] = useMutation(LOGIN);
    const [form] = Form.useForm();

    const handleFinish = async () => {
             try {
            //   const { email, password } = values;
            const email = "platformpanel@gmail.com";
            const password = "test@123";
            //   const { data,error } = await loginUser({ variables: { email, password } });
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);

                messageApi.success("Login successful!");
                navigate("/")
            //   if (data) {
                // store token/id
                // localStorage.setItem("accessToken", data.login.token);
                // localStorage.setItem("userId", data.login.user.id);
                // localStorage.setItem("email", email);
                // localStorage.setItem("password", password);

                // messageApi.success("Login successful!");
                // navigate("/")
                // compute destination safely (it could be a string or Location object)
            //   } else {
            //     messageApi.error("Login failed: Invalid credentials");
            //   }
            } catch (error) {
            console.error("Login error:", error);
            messageApi.error("Login failed: Something went wrong");
            }
       
      };

    return (
        <>
            {contextHolder}
            <Row className="signup-page" align={"middle"}>
                <Col xs={24} sm={24} md={12} lg={10} className="signup-form-container">
                    <div className="form-inner">
                        <NavLink to={"/"}>
                            <div className="logo">
                                <img src="/assets/images/logo.webp" className="h-70" alt='logo image' fetchPriority="high" />
                            </div>
                        </NavLink>

                        <Title level={3} className="mb-1">Welcome Admin.</Title>
                        <Paragraph className="fs-16">
                            Please sign in to access your system and manage platform activities.
                        </Paragraph>

                        <Form layout="vertical" form={form} onFinish={handleFinish} requiredMark={false}
                            initialValues={{
                                email: "platformpanel@gmail.com",
                                password: "test@123",
                            }}
                        >
                            <MyInput 
                                label="Email Address" 
                                name="email" 
                                required 
                                message="Please enter email address" 
                                placeholder="Enter Email Address" 
                            />
                            <MyInput 
                                label="Password" 
                                type="password" 
                                name="password" 
                                required 
                                message="Please enter password" 
                                placeholder="Enter Password" 
                            />
                            <Flex justify="space-between" className="mb-3">
                                <Checkbox>Remember Me</Checkbox>
                                <NavLink to={"/forgotpassword"} className="fs-13 text-brand">
                                    Forget Password?
                                </NavLink>
                            </Flex>
                            <Button htmlType="submit" type="primary" className="btnsave bg-dark-blue fs-16" block 
                                // loading={loading}
                            >
                                Signin
                            </Button>
                            <Paragraph className="text-center mt-3">
                                For tablet based self-booking? <NavLink className={'text-brand'} to={'/signintablet'}>Sign In</NavLink>
                            </Paragraph>
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
                        <Image src="/assets/images/login-frame.svg" alt='dashboard image' fetchPriority="high" preview={false} />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export { LoginPage };
