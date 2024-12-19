type Pattern = "w" | "u" | "b" | "r" | "g";

interface PrefixNode {
  isEnd: boolean;
  w?: PrefixNode;
  u?: PrefixNode;
  b?: PrefixNode;
  r?: PrefixNode;
  g?: PrefixNode;
}

const makePrefix = (prefix: PrefixNode, pattern: string[]) => {
  const front = pattern.shift() as Pattern;
  if (prefix[front] === undefined) prefix[front] = { isEnd: false };
  if (pattern.length === 0) {
    prefix[front].isEnd = true;
  } else {
    makePrefix(prefix[front], pattern);
  }
};

const isPossible = (
  prefix: PrefixNode,
  startPrefix: PrefixNode,
  design: Pattern[]
): boolean => {
  if (design.length === 0) return prefix.isEnd;
  if (
    prefix.isEnd &&
    isPossible(startPrefix, startPrefix, structuredClone(design))
  )
    return true;
  const front = design.shift() as Pattern;
  if (prefix[front] === undefined) return false;
  return isPossible(prefix[front], startPrefix, structuredClone(design));
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
  };

  for (const pattern of patterns) {
    makePrefix(prefix, pattern);
  }

  let valid = 0;
  for (const design of designs) {
    if (isPossible(prefix, prefix, structuredClone(design))) {
      valid++;
    }
  }

  return valid;
};
