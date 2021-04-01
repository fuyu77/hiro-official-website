import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const Pdf: React.FC<{ url: string }> = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <Worker workerUrl='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js'>
      <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  )
}

export default Pdf
