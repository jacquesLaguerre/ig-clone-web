import {useState, useEffect} from 'react'
import {Button} from "antd"
import UploadModal from './UploadModal'


export default  function Feed() {
  const [photoList, setPhotoList] = useState()
  const [showUpload, setShowUpload] = useState(false)
  useEffect (() => {
    fetch('https://express-ts-jbl.web.app/photos')
    //sfetch ('http://localhost:5002/photos')
    .then(results => results.json())
    .then(data=> setPhotoList(data))
    .catch(alert)
  }, [setPhotoList])
  return (
    
<section>
  {!photoList
  ? <p>Loading...</p>
  :<p>{photoList.length}</p>
  
  }
  {showUpload ? <UploadModal setShowUpload={setShowUpload} setShowList={setPhotoList} /> : null}
 
  <Button onClick={() => setShowUpload(true)}
  type="primary" 
  className="fab" 
  shape="circle" 
  size="large">+</Button>
</section>

    
  )
}