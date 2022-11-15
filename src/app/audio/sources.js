/**
 * @param {number} limit
 */
export function configureSources(limit) {
  const sources = [];

  return {
    add(source) {
      if (sources.length === limit) {
        throw new Error("Max limit reached; increase the limit");
      }
      sources.push(source);
      return this;
    },
    build() {
      return sources;
    },
    generateKeyboardSamples() {
      return sources.reduce((acc, curr, index) => {
        acc[`row_${index}`] = {
          key: curr.name,
          source: curr.source,
          label: curr.label || "todo",
        };
        return acc;
      }, {});
    },
  };
}
