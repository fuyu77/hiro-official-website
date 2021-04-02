import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import pdfWorker from '../pdf-worker'

const Pdf: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Worker workerUrl={`/${pdfWorker}`}>
      <Viewer fileUrl={url} defaultScale={1} />
    </Worker>
  )
}

export default Pdf
