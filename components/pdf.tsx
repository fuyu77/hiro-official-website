interface Props {
  readonly url: string;
}

function Pdf({ url }: Props): React.ReactElement {
  return (
    <div>
      <iframe
        src={url}
        title="PDF document"
        style={{ width: '100%', minHeight: '60vh', border: 'none' }}
        loading="lazy"
      />
      <p style={{ marginTop: '0.75rem' }}>
        PDFを表示できない場合は
        <a href={url} target="_blank" rel="noreferrer noopener" style={{ marginLeft: '0.25rem' }}>
          こちら
        </a>
        をクリックしてください。
      </p>
    </div>
  );
}

export default Pdf;
