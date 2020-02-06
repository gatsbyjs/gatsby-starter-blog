module.exports = function(chunksTotal, { node }) {
  const {
    fields: { slug },
    frontmatter: { title },
    internal: { content }
  } = node;

  const noEmojiContent = content.replace(/<img class="emoji-icon".+\/>/g, "");

  const contentChunks = chunkString(noEmojiContent, 5000);
  const record = { title, slug, content };
  const recordChunks = contentChunks.reduce((recordChunksTotal, contentChunksItem, idx) => {
    return [
      ...recordChunksTotal,
      { ...record, ...{ content: contentChunksItem }, objectID: `${slug}${idx}` }
    ];
  }, []);

  return [...chunksTotal, ...recordChunks];
};

function chunkString(str, length) {
  return str.match(new RegExp("(.|[\r\n]){1," + length + "}", "g"));
}
