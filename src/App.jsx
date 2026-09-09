import { useMemo, useState } from 'react'

const logoPath = "M236.83,90.34c-2.47-2.47-6.48-2.47-8.96,0l-50.34,50.34v-45.85c0-.42-.04-.83-.13-1.24-.04-.18-.1-.35-.15-.52-.06-.22-.12-.45-.21-.66-.08-.2-.2-.39-.3-.58-.09-.17-.17-.35-.28-.51-.21-.32-.46-.61-.72-.88-.03-.03-.04-.06-.07-.08-.03-.03-.06-.04-.08-.07-.27-.26-.57-.51-.88-.72-.16-.11-.33-.18-.5-.27-.2-.11-.39-.23-.59-.31-.2-.08-.41-.13-.62-.19-.19-.06-.37-.13-.57-.17-.35-.07-.71-.1-1.07-.11-.06,0-.11-.02-.17-.02-.07,0-.14.02-.21.02-.34.01-.68.04-1.02.1-.21.04-.41.12-.61.18-.19.06-.39.1-.57.18-.22.09-.43.22-.64.34-.15.08-.31.15-.45.25-.32.21-.62.46-.89.73-.02.02-.05.04-.07.06l-50.34,50.34v-45.85c0-.42-.04-.83-.13-1.24-.04-.18-.1-.34-.15-.52-.06-.22-.12-.45-.21-.67-.08-.2-.2-.39-.3-.58-.09-.17-.17-.35-.28-.51-.21-.32-.46-.61-.72-.88-.03-.03-.04-.06-.07-.08s-.06-.04-.08-.07c-.27-.26-.57-.51-.88-.72-.16-.11-.33-.18-.49-.27-.2-.11-.39-.23-.6-.31-.2-.08-.42-.13-.63-.2-.18-.05-.36-.13-.55-.16-.38-.08-.77-.11-1.16-.12h-.16c-.39,0-.78.04-1.16.12-.19.04-.37.11-.55.16-.21.06-.42.11-.63.2s-.4.21-.6.31c-.17.09-.34.16-.49.27-.32.21-.61.46-.88.72-.03.02-.06.04-.08.07l-50.33,50.33v-45.85c0-.42-.04-.83-.13-1.24-.04-.18-.1-.35-.15-.52-.06-.22-.12-.45-.21-.66-.08-.2-.2-.39-.3-.58-.09-.17-.17-.35-.28-.51-.21-.32-.46-.61-.72-.88-.03-.03-.04-.06-.07-.08-.03-.03-.06-.04-.08-.07-.27-.26-.57-.51-.88-.72-.16-.11-.33-.18-.5-.27-.2-.11-.39-.23-.59-.31-.2-.08-.41-.13-.62-.19-.19-.06-.37-.13-.57-.17-.35-.07-.71-.1-1.07-.11-.06,0-.11-.02-.17-.02-.07,0-.14.02-.21.02-.34.01-.68.04-1.02.1-.21.04-.41.12-.61.18-.19.06-.39.1-.57.18-.22.09-.43.22-.64.34-.15.08-.31.15-.45.25-.32.21-.62.46-.89.73-.02.02-.05.04-.07.06l-30.57,30.57c-2.47,2.47-2.47,6.48,0,8.96,1.24,1.24,2.86,1.85,4.48,1.85s3.24-.62,4.48-1.85l19.76-19.76v45.85c0,.42.04.83.13,1.24.04.18.1.34.15.52.06.22.12.45.21.67.08.2.2.39.31.58.09.17.17.35.28.51.23.34.49.66.78.96h0c.29.29.62.56.97.79.16.11.33.18.49.27.2.11.39.23.6.31.21.09.43.14.65.2.18.05.35.12.53.16.41.08.82.13,1.24.13s.83-.04,1.24-.13c.18-.04.35-.11.53-.16.22-.06.44-.11.65-.2.21-.09.4-.21.6-.31.16-.09.33-.16.49-.27.35-.23.67-.49.97-.79h0l50.33-50.33v45.85c0,.42.04.83.13,1.24.04.18.1.35.15.52.06.22.12.45.21.66.08.2.2.39.31.58.09.17.17.35.28.51.23.34.49.66.78.96h0c.29.29.62.56.97.79.16.11.33.18.49.27.2.11.39.23.6.31.21.09.43.14.65.2.18.05.35.12.53.16.41.08.82.13,1.24.13s.83-.04,1.24-.13c.19-.04.36-.11.54-.16.22-.06.43-.11.64-.2s.4-.21.6-.32c.16-.09.33-.16.49-.26.35-.23.67-.49.97-.79h0l50.34-50.33v45.85c0,.42.04.83.13,1.24.04.18.1.35.15.52.06.22.12.45.21.66.08.2.2.39.31.58.09.17.17.35.28.51.23.34.49.66.78.96h0c.29.29.62.56.97.79.16.11.33.18.49.27.2.11.39.23.6.31.21.09.43.14.65.2.18.05.35.12.53.16.41.08.82.13,1.24.13s.83-.04,1.24-.13c.19-.04.36-.11.54-.16.22-.06.43-.11.64-.2s.4-.21.6-.32c.16-.09.33-.16.49-.26.35-.23.67-.49.97-.79h0l61.15-61.15c2.47-2.47,2.47-6.48,0-8.96h-.06Z"

function normalizeSvg(svg) {
  const trimmedSvg = svg.trim()

  if (!trimmedSvg) return ''

  if (!trimmedSvg.includes('xmlns=')) {
    return trimmedSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  return trimmedSvg
}

function encodeSvg(svg) {
  return encodeURIComponent(normalizeSvg(svg))
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
}

async function copyValue(value) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function Logo({ labelled = false }) {
  const titleId = labelled ? 'logoTitle' : undefined

  return (
    <svg
      aria-labelledby={titleId}
      aria-label="Gezacktes Logo bestehend aus M und V"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 250"
    >
      {labelled && <title id={titleId}>Moritz Vollmer Logo</title>}
      <rect className="logo-color-white" width="250" height="250" fill="#000" />
      <path d={logoPath} fill="#707070" />
    </svg>
  )
}

function Header() {
  return (
    <header className="centerMaxWidthContainer header">
      <div className="menu">
        <div className="centerMaxWidthContainer">
          <div className="menu-wrapper">
            <div className="logo">
              <div className="logo-wrapper">
                <Logo labelled />
              </div>
              <nav aria-label="Breadcrumb Navigation">
                <ul className="logo-breadcrumb">
                  <li>
                    <a tabIndex="0" href="https://moritzvollmer.de/" target="_blank" className="logo-breadcrumb-first" rel="noreferrer author">
                      Moritz Vollmer
                    </a>
                  </li>
                  <li aria-hidden="true"><span className="logo-breadcrumb-seperator"> // </span></li>
                  <li>
                    <span aria-current="page" className="logo-breadcrumb-main">SVGs kodieren</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function HeroTitle() {
  return (
    <article className="preContent svg-heading">
      <h1 lang="en">Scalable Vector Graphics</h1>
      <h2>SVGs effizient kodieren und einbinden</h2>
    </article>
  )
}

function IntroText() {
  return (
    <article className="preContent svg-explainer">
      <p>
        SVGs sind skalierbare Vektorgrafiken für das Web. Dieses Tool kodiert deinen SVG-Code als URL-sichere Zeichenkette und erzeugt daraus eine direkt einsetzbare CSS-<code>background-image</code> Data-URI. Füge dein SVG ein, prüfe die Vorschau und kopiere das gewünschte Ergebnis.
      </p>
    </article>
  )
}

function decodeEncodedSvg(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function SvgTool() {
  const [svg, setSvg] = useState('')
  const normalizedSvg = useMemo(() => normalizeSvg(svg), [svg])
  const encodedSvg = useMemo(() => encodeSvg(svg), [svg])
  const isSvg = /<svg[\s>]/i.test(normalizedSvg)
  const dataUri = isSvg ? `data:image/svg+xml,${encodedSvg}` : ''
  const cssCode = isSvg ? `background-image: url("${dataUri}");` : ''

  return (
    <main className="mainContent">
      <section className="cool coolBackgroundDefault centerMaxWidthContainer">
        <HeroTitle />
        <div className="container">
          <fieldset className="svg-input">
            <legend>
              <label htmlFor="inputSVG">Gib hier deinen SVG Code ein:</label>
            </legend>
            <textarea
              id="inputSVG"
              placeholder="Füge deinen SVG Code hier ein..."
              value={svg}
              onChange={(event) => setSvg(event.target.value)}
            />
          </fieldset>

          <fieldset className="svg-preview">
            <legend>Vorschau:</legend>
            <div className="textarea preview" id="preview">
              {isSvg && (
                <img className="preview-inline-svg" src={dataUri} alt="Vorschau des eingegebenen SVG" />
              )}
            </div>
          </fieldset>

          <fieldset className="svg-css">
            <legend>
              <label htmlFor="cssCode">SVG als CSS Hintergrund:</label>
            </legend>
            <textarea
              id="cssCode"
              readOnly
              placeholder="background-image: url('data:image/svg+xml;'"
              value={cssCode}
            />
            <button id="copyCSS" type="button" onClick={() => copyValue(cssCode)}>
              Code kopieren
            </button>
          </fieldset>

          <fieldset className="svg-encode">
            <legend>
              <label htmlFor="encodedSVG">SVG URL-kodiert:</label>
            </legend>
            <textarea
              id="encodedSVG"
              placeholder="Füge dein URL-kodiertes SVG hier ein..."
              value={encodedSvg}
              onChange={(event) => setSvg(decodeEncodedSvg(event.target.value))}
            />
            <button id="copyEncoded" type="button" onClick={() => copyValue(encodedSvg)}>
              Code kopieren
            </button>
          </fieldset>
        </div>
        <IntroText />
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="cool coolBackgroundDefault centerMaxWidthContainer componentPadding">
      <div className="footer">
        <div className="logo">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <nav className="logo-breadcrumb">
            <ul className="logo-breadcrumb-list">
              <li>
                <a tabIndex="0" href="https://moritzvollmer.de/" target="_blank" className="logo-breadcrumb-first" rel="noreferrer author">
                  Moritz Vollmer
                </a>
              </li>
              <li aria-hidden="true"><span className="logo-breadcrumb-seperator"> // </span></li>
              <li>
                <span className="logo-breadcrumb-main">SVGs kodieren</span>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="footer-links" aria-label="Footer-Navigation">
          <ul className="footer-links-list">
            <li><a tabIndex="0" className="link" href="https://moritzvollmer.de/" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
            <li><a tabIndex="0" className="link" href="https://moritzvollmer.de/projekte/" target="_blank" rel="noopener noreferrer">Weitere Projekte</a></li>
            <li><a tabIndex="0" className="link" href="https://barrierefreiheit.moritzvollmer.de" target="_blank" rel="noopener noreferrer">Barrierefreiheit</a></li>
            <li><a tabIndex="0" className="link" href="https://checkliste.moritzvollmer.de" target="_blank" rel="noopener noreferrer">Barrierefreiheit Checkliste</a></li>
            <li><a tabIndex="0" className="link" href="https://farbtool.moritzvollmer.de" target="_blank" rel="noopener noreferrer">Farbkontraste prüfen</a></li>
          </ul>
        </nav>
        <nav className="footer-links" aria-label="Rechtliches">
          <ul className="footer-links-list">
            <li><a tabIndex="0" className="link" href="https://moritzvollmer.de/impressum/" target="_blank" rel="noopener noreferrer">Impressum</a></li>
            <li><a tabIndex="0" className="link" href="https://moritzvollmer.de/datenschutz/" target="_blank" rel="noopener noreferrer">Datenschutz</a></li>
          </ul>
        </nav>
        <span className="footer-last">2026 © Moritz Vollmer</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="pageWrapper">
      <Header />
      <SvgTool />
      <Footer />
    </div>
  )
}
