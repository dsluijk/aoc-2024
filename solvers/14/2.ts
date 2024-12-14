const PARSER = /p=([0-9]+),([0-9]+) v=(-?[0-9]+),(-?[0-9]+)/;

const TESTING = false;
const WIDTH = TESTING ? 11 : 101;
const HEIGHT = TESTING ? 7 : 103;

type State = {
  pos: [number, number];
  vel: [number, number];
};

export const solve = (input: string) => {
  const lines = input.split("\n");

  const states: State[] = [];
  for (const line of lines) {
    const parsed = line.match(PARSER);
    if (!parsed) continue;
    states.push({
      pos: [Number(parsed[1]), Number(parsed[2])],
      vel: [Number(parsed[3]), Number(parsed[4])],
    });
  }

  for (let i = 1; i < 1000000; i++) {
    const picture: boolean[][] = [];
    let overlaps = false;
    for (let state of states) {
      state.pos[0] = (state.pos[0] + state.vel[0] + WIDTH) % WIDTH;
      state.pos[1] = (state.pos[1] + state.vel[1] + HEIGHT) % HEIGHT;

      if (!picture[state.pos[0]]) picture[state.pos[0]] = [];
      if (picture[state.pos[0]][state.pos[1]]) overlaps = true;
      picture[state.pos[0]][state.pos[1]] = true;
    }

    if (!overlaps) return i;
  }

  return -1;
};
