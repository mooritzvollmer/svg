import {useEffect,useMemo,useRef} from 'react'
import {tokenizeXml} from './tokenize.mjs'

export default function CodeEditor({value,onChange,inputRef,description}){
 const paintRef=useRef(null),numbersRef=useRef(null)
 const tokens=useMemo(()=>tokenizeXml(value),[value])
 const count=value.split('\n').length
 const numbers=useMemo(()=>Array.from({length:count},(_,i)=>i+1).join('\n'),[count])
 function syncScroll(){
  const field=inputRef.current;if(!field)return
  paintRef.current.style.transform=`translate(${-field.scrollLeft}px, ${-field.scrollTop}px)`
  numbersRef.current.style.transform=`translateY(${-field.scrollTop}px)`
 }
 useEffect(()=>{syncScroll()},[value])
 return <div className="editor syntax-editor" style={{'--gutter':`${Math.max(3,String(count).length)+2}ch`}}>
  <div className="editor-gutter" aria-hidden="true"><pre ref={numbersRef}>{numbers+'\n'}</pre></div>
  <div className="editor-paint" aria-hidden="true"><pre ref={paintRef}>{tokens.map((token,i)=><span key={i} className={token.kind?'syntax-'+token.kind:undefined}>{token.text}</span>)}{'\n'}</pre></div>
  <textarea ref={inputRef} id="inputSVG" value={value} spellCheck="false" autoComplete="off" autoCapitalize="off" wrap="off" placeholder={'<svg viewBox="0 0 100 100">\n  …\n</svg>'} aria-describedby={description} onScroll={syncScroll} onChange={event=>onChange(event.target.value)}/>
 </div>
}
