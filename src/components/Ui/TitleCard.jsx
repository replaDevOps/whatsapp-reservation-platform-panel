import { Button, Card, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ModuleTopHeading } from "../PageComponent";

const { Text } = Typography;
const TitleCard = ({ title, subtitle, btntext, onClick, icon = <PlusOutlined />, className = "" }) => {
    return (
        <Card className={`card-bg card-cs radius-12 border-gray ${className}`}>
            <Flex align={onClick ? "center" : "start"} justify="space-between" gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={title} />
                    {subtitle && <Text className="text-gray fs-13">{subtitle}</Text>}
                </Flex>

                {onClick && (
                    <Button className="btncancel" onClick={onClick}>
                        {icon} {btntext}
                    </Button>
                )}
            </Flex>
        </Card>
    );
};

export { TitleCard };
