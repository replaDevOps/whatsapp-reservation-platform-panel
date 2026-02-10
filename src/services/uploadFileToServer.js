import imageCompression from 'browser-image-compression';

const uploadFileToServer = async ({file,setPreviewImage}) => {
    try {
        let compressedFile = file
        if (file.type.startsWith("image/")) {
            compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            });
        }

        const formData = new FormData();
        formData.append("file", compressedFile)
        const res = await fetch("https://backend.qloop.me/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        setPreviewImage(data.fileUrl);
        return {
            fileName: data.fileName,
            fileType: data.fileType,
            filePath: data.fileUrl,
        };

    } catch (err) {
        console.error("Upload error:", err);
        message.error("Failed to upload file");
        throw err;
    }
}

export {uploadFileToServer}