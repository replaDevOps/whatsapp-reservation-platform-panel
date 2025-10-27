import { Breadcrumb, Button, Card, Divider, Flex, Typography } from 'antd'
import { EditorDescription, ModuleTopHeading } from '../../components'
import { useState } from 'react'

const { Text } = Typography
const TermsConditionPage = () => {

    const [ descriptionData, setDescriptionData ] = useState('')

    const handleDescriptionChange = (value) =>{
        setDescriptionData(value)
    }

    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Website Pages
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Terms & Condition</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Terms & Condition' />
                    <Text className='text-gray fs-13'>Manage all the platform Terms & Condition in your system</Text>
                </Flex>
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>    
                <Flex vertical gap={20}>
                    <EditorDescription
                        label={'Page Body'}
                        descriptionData={descriptionData}
                        onChange={handleDescriptionChange}
                    />
                    <Divider className='my-2 bg-divider' />
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray'>
                            Cancel
                        </Button>
                        <Button type="primary" className='btnsave border0 text-white brand-bg'>
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export {TermsConditionPage}