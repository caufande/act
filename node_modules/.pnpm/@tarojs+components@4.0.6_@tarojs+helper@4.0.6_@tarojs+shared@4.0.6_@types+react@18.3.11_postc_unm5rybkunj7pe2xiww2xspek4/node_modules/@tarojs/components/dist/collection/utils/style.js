export function convertStyle(style) {
  if (style) {
    const regex = /([\w-]*)\s*:\s*([^;]*)/g;
    const properties = {};
    let match;
    while ((match = regex.exec(style)))
      properties[`${match[1]}`] = match[2].trim();
    return properties;
  }
}
