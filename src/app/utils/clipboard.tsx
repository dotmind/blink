import * as ReactDOMServer from 'react-dom/server';

type RichTextTemplateProps = {
  fileName: string;
  link: string;
};

function RichTextTemplate({ fileName, link }: RichTextTemplateProps) {
  return (
    <a
      autoCorrect={'off'}
      autoCapitalize={'off'}
      spellCheck={'false'}
      title={`Télécharger le fichier "${fileName}"`}
      style={{
        textDecoration: 'none',
        textDecorationColor: '#3389FF',
        display: 'inline-block',
        background: '#fafafa',
        borderRadius: 8,
        border: '1px solid #f1f1f1',
        width: 240,
      }}
      href={link}>
      <img
        width={'240'}
        style={{ borderRadius: '8px 8px 0px 0px', fontSize: 0 }}
        src={'https://inablink.io/assets/quick-link-preview.png'}
        alt={'Your document preview button'}
      />
      <div style={{ padding: 8, marginTop: -4 }}>
        <p
          style={{
            fontFamily: "'Poppins', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'",
            margin: '0',
            lineHeight: '100%',
            display: 'block',
            width: 200,
            maxWidth: 200,
            color: '#3389FF',
            textDecoration: 'none',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '.9em',
            marginBottom: 2,
          }}>
          {fileName}
        </p>

        <img
          style={{ display: 'block', height: '.9em' }}
          src={'https://inablink.io/assets/quick-link-logo.png'}
          alt={'Blink logo'}
        />
      </div>
    </a>
  );
}

const askClipboardPermission = async (): Promise<boolean> => {
  const result = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
  return result.state === 'granted';
};

const getRichTextAsHTML = ({ fileName, link }: RichTextTemplateProps): string =>
  ReactDOMServer.renderToStaticMarkup(<RichTextTemplate fileName={fileName} link={link} />);

export const copyRichText = async (args: RichTextTemplateProps): Promise<void> => {
  const plainText = args.link;

  const clipboardPermission = await askClipboardPermission();

  if (clipboardPermission && 'clipboard' in navigator) {
    const richText = `<meta charset='utf-8'>${getRichTextAsHTML(args)}<br/>`;

    const richTextBlob = new Blob([richText], { type: 'text/html' });
    const plainTextBlob = new Blob([plainText], { type: 'text/plain' });
    const data = [
      new ClipboardItem({
        'text/html': richTextBlob,
        'text/plain': plainTextBlob,
      }),
    ];

    navigator.clipboard.write(data);
  } else {
    document.execCommand('copy', true, plainText);
  }
};
