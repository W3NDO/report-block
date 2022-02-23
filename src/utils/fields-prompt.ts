export default function fieldsPrompt(fields: string[]): Record<string, string> | void {
  const output = {};
  for (let field of fields) {
    const input = prompt(`Provide value for '${field}'`)?.trim();
    if (!input) return;

    output[field] = input
  }

  return output;
}
