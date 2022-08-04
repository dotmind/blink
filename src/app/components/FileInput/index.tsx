
import styles from './styles.module.css'

const FileInput = () => {
  

  return (
    <div className={styles.fileInput}>
        <label htmlFor="fileLoader" className={styles.fileInput__label}>Drop file here</label>
        <input id='fileLoader' type="file" className={styles.fileInput__input} />
    </div>
  )
}

export default FileInput