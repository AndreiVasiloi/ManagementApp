import React, {useRef} from 'react';
import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css'; 

export default function PhotoWidgetCropper({setImage, imagePreview}) {
    const cropperRef = useRef(null);
    // function cropImage() {
    //     if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
    //         return;
    //     }
    //     cropper.current.getCroppedCanvas().toBlob(blob => {
    //         setImage(blob);
    //     }, 'image/jpeg');
    // }
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
     
        if (typeof cropper.getCroppedCanvas() === "undefined") {
          return;
        }
     
        cropper.getCroppedCanvas().toBlob((blob) => {
          setImage(blob);
        }, "image/jpeg");
      };

    return (
      <Cropper
        ref={cropperRef}
        src={imagePreview}
        style={{height: 200, width: '100%'}}
        // Cropper.js options
        aspectRatio={1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        dragMode='move'
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={onCrop} />
    );
}