import { useMemo, useState } from 'react'


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
  return <img src="/brand.svg?v=signature-2" alt={labelled ? 'Moritz Vollmer' : ''} width="40" height="40" style={{display:'block',width:'100%',height:'100%',objectFit:'contain'}} />
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
