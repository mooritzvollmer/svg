// Tokens remain plain text; React escapes all source content when rendering.
export function tokenizeXml(source) {
 const pattern=/<!--[\s\S]*?(?:-->|$)|<!\[CDATA\[[\s\S]*?(?:\]\]>|$)|<\?[\s\S]*?(?:\?>|$)|<\/?[A-Za-z_][\w:.-]*|\/?>|"[^"]*"|'[^']*'|[A-Za-z_][\w:.-]*(?=\s*=)|&(?:#x[\da-f]+|#\d+|[\w:.-]+);/gi;
 const tokens=[];let cursor=0,inTag=false,match;
 while((match=pattern.exec(source))){
  const text=match[0];let kind='';
  if(text.startsWith('<!--'))kind='comment';
  else if(text.startsWith('<![CDATA['))kind='cdata';
  else if(text.startsWith('<?'))kind='instruction';
  else if(text.startsWith('<')){kind='tag';inTag=true}
  else if(inTag&&/^(?:\/?>)$/.test(text)){kind='tag';inTag=false}
  else if(inTag&&/^["']/.test(text))kind='value';
  else if(inTag&&/^[A-Za-z_]/.test(text))kind='attribute';
  else if(text.startsWith('&'))kind='entity';
  if(match.index>cursor)tokens.push({text:source.slice(cursor,match.index),kind:''});
  tokens.push({text,kind});cursor=pattern.lastIndex;
 }
 if(cursor<source.length)tokens.push({text:source.slice(cursor),kind:''});
 return tokens;
}
