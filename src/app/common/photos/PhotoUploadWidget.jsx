import React, { useState } from "react";
import { Header, Button } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import cuid from "cuid";
import { getFileExtension } from "../util/util";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";
import { Col, Container, Row } from "react-bootstrap";

export default function PhotoUploadWidget({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage() {
    setLoading(true);
    const filename = cuid() + "." + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error(error.messege);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={2}>
          <Header color="teal" sub content="Step 1 - Add Photo" align="center"/>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Col>
        <Col lg={5}>
          <Header color="teal" sub content="Step 2 - Resize" align="center"/>
          {files.length > 0 && (
            <PhotoWidgetCropper
            style={{margin:'0 auto'}}
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Col>
        <Col lg={5} style={{textAlign:'center'}}>
          <Header color="teal" sub content="Step 3 - Preview & upload" align="center"/>
          {files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 200, minWidth: 200, overflow: "hidden", margin: "0 auto"}}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: 100 }}
                  positive
                  icon="check"
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: 100 }}
                  icon="close"
                />
              </Button.Group>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
