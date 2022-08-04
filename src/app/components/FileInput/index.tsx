
import styles from './styles.module.css'

const FileInput = () => {
  return (
    <div>
        <input type="file" className={styles.fileInput} />
    </div>
  )
}

export default FileInput