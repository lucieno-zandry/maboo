const imageToDataUrl = (image: File, callback: (imageUrl: string) => void) => {
    const Reader = new FileReader;

    Reader.readAsDataURL(image);
    Reader.onload = () => {
        const imageUrl = Reader.result as string;
        callback(imageUrl);
    }
}

export default imageToDataUrl;