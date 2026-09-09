const WORDS_PER_MINUTE = 200;

const calculateReadingTime = (content = "") => {
  const plainText = content.replace(/<[^>]*>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
};

export default calculateReadingTime;