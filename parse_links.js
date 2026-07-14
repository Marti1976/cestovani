const parseLink = (link) => {
  if (!link) return null;
  try {
    const url = new URL(link);
    return url.searchParams.get('query');
  } catch (e) {
    return null;
  }
};
console.log(parseLink('https://www.google.com/maps/search/?api=1&query=Penzion+Komarno'));
