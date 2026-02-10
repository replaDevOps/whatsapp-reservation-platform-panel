import { useRef } from 'react'
import { EditFilled } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { SingleFileUpload } from '../Forms';
import { uploadFileToServer } from '../../services';

const UploadImage = ({setPreviewImage,src,t,form,disabled=false}) => {

    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadFileToServer({ file, setPreviewImage });
        }
    };
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='hidden'
            />
            {
                !src ?
                    <SingleFileUpload
                        name="document"
                        title={t('Upload Image')}
                        form={form}
                        onUpload={(file)=>uploadFileToServer({file,setPreviewImage})}
                        align="center"
                        width={100}
                        height={100}
                        acceptFileType='image'
                    />
                    :
                    <Flex vertical gap={5} justify='center' align='center'>
                        <img
                            src={src}
                            alt="Category"
                            className='radius-12 mxw-mxh'
                            fetchPriority="high"
                        />
                        <div>
                            <Button disabled={disabled} type="link" className='fs-13 text-brand' onClick={handleEditClick}>
                                <EditFilled /> {t('Edit')}
                            </Button>
                        </div>
                    </Flex>

            }
        </>
    )
}

export {UploadImage}