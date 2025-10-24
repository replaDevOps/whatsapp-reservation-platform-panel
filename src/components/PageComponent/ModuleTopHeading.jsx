import { PlusOutlined } from "@ant-design/icons"
import {Space, Button, Typography} from "antd"
export const ModuleTopHeading=({name, onClick,level})=>{
    return (
       <Space  className="align-center">
            <Typography.Title level={level} className="my-0 fw-500">
                {
                    name
                }
            </Typography.Title>
            {
                onClick ?
                <Button 
                    className="my-0"
                    type="primary" 
                    shape={'circle'} 
                    size='small' 
                    style={{color:'var(--white-text)',backgroundColor: 'var(--brand-color)'}}
                    icon={<PlusOutlined/>}
                    onClick={onClick}
                />
                :<></>
            }
        </Space>
    )
}