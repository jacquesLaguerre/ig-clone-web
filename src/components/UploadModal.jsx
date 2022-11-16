import { Modal, Form, Input, Button, Upload } from "antd";
import {getStorage, ref, uploadBytes} from "firebase/storage"
import {initializeApp} from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyBMr9jvYw8rJzSsZD4zgxd-PYUirPC1LoE",
  authDomain: "upload-storage-jbl.firebaseapp.com",
  projectId: "upload-storage-jbl",
  storageBucket: "upload-storage-jbl.appspot.com",
  messagingSenderId: "723679394370",
  appId: "1:723679394370:web:5a1a73d4801c32167f8bdb"
};

export default function UploadModal({ setShowUpload, setPhotoList }) {
  const handleNewPhoto = (values) => {
    console.log(values)
    //0 Connect to firebase storage
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    //1 Upload photo to storage bucket
const filename = values.photo.file.name
const imageRef = ref(storage, `photos/${filename}`)
uploadBytes(imageRef, values.photo.file)
.then(() => console.log('upload successful'))
.catch(err => console.error(err))
    //2 Figure out URL for that photo
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/upload-storage-jbl.appspot.com/o/
    ${filename}?alt=media`
    //3 Put that URl in to new project
    let newPhotoObj = values 
    newPhotoObj.photo = photoUrl
    //4 Send a post request to API
    fetch('https://express-ts-jbl.web.app/photos', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(newPhotoObj)
    })
    .then(result => result.json())
    .then(newListOfPhotos => {
      //5 Get back new photoList
setPhotoList(newListOfPhotos)
      .catch(alert)
      //6 setPhotoList and close Model
      closeModal()
    })
   
  };
  const closeModal = () => setShowUpload(false);
  return (
    <Modal title="Upload Photo" open={true} footer={null} onCancel={closeModal}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleNewPhoto}
      >
        <Form.Item label="User Name" name="username">
          <Input required />
        </Form.Item>
        <Form.Item label="Profile Picture URL" name="profilePic">
          <Input required />
        </Form.Item>
        <Form.Item label="Photo" name="photo">
          <Upload listType="picture-card">
            +

          </Upload>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} required />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save Photo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
