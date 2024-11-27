function decodeHTMLEntities(str) {
  if (str == null) {
    return "";
  }

  return str
    .replace(/&amp;/g, "&")
    .replace(/amp;/g, "")
    .replace(/&ndash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, "·")
    .replace(/&sdot;/g, "⋅");
}

export default decodeHTMLEntities;
