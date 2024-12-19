type Pattern = "w" | "u" | "b" | "r" | "g";

interface PrefixNode {
  isEnd: boolean;
  w?: PrefixNode;
  u?: PrefixNode;
  b?: PrefixNode;
  r?: PrefixNode;
  g?: PrefixNode;
  cache: { [prefix: string]: number };
}

const makePrefix = (prefix: PrefixNode, pattern: string[]) => {
  const front = pattern.shift() as Pattern;
  if (prefix[front] === undefined) prefix[front] = { isEnd: false, cache: {} };
  if (pattern.length === 0) {
    prefix[front].isEnd = true;
  } else {
    makePrefix(prefix[front], pattern);
  }
};

const validDesigns = (
  prefix: PrefixNode,
  startPrefix: PrefixNode,
  design: Pattern[]
): number => {
  if (design.length === 0) return prefix.isEnd ? 1 : 0;

  let count = 0;
  const front = design.shift() as Pattern;

  if (prefix.isEnd && startPrefix[front] !== undefined) {
    if (startPrefix.cache[design.join("")] !== undefined) {
      count += startPrefix.cache[design.join("")];
    } else {
      const valid = validDesigns(
        startPrefix[front],
        startPrefix,
        structuredClone(design)
      );
      startPrefix.cache[design.join("")] = valid;
      count += valid;
    }
  }

  if (prefix[front] !== undefined) {
    if (prefix.cache[design.join("")] !== undefined) {
      count += prefix.cache[design.join("")];
    } else {
      const valid = validDesigns(
        prefix[front],
        startPrefix,
        structuredClone(design)
      );
      prefix.cache[design.join("")] = valid;
      count += valid;
    }
  }

  return count;
};

export const solve = (input: string) => {
  const [patternsPart, designsPart] = input.split("\n\n");
  const patterns = patternsPart
    .split(", ")
    .map((pattern) => pattern.split("") as Pattern[]);
  const designs = designsPart
    .split("\n")
    .map((design) => design.split("") as Pattern[]);
  const prefix: PrefixNode = {
    isEnd: false,
    cache: {},
  };

  for (const pattern of patterns) {
    makePrefix(prefix, pattern);
  }

  let valid = 0;
  for (const design of designs) {
    const designPrefix = structuredClone(prefix);
    valid += validDesigns(designPrefix, designPrefix, structuredClone(design));
  }

  return valid;
};
