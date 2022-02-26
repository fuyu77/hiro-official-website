import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import pdfWorker from '../pdf-worker'

interface Props {
  url: string
}

const Pdf = ({ url }: Props): React.ReactElement => {
  return (
    <Worker workerUrl={`/${pdfWorker as string}`}>
      <Viewer fileUrl={url} defaultScale={1} />
    </Worker>
  )
}

export default Pdf
