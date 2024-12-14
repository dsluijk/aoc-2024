const PARSER = /p=([0-9]+),([0-9]+) v=(-?[0-9]+),(-?[0-9]+)/;

const WIDTH = process.env.NODE_ENV === "test" ? 11 : 101;
const HEIGHT = process.env.NODE_ENV === "test" ? 7 : 103;

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

  for (let i = 0; i < 100; i++) {
    for (let state of states) {
      state.pos[0] = (state.pos[0] + state.vel[0] + WIDTH) % WIDTH;
      state.pos[1] = (state.pos[1] + state.vel[1] + HEIGHT) % HEIGHT;
    }
  }

  const quads = [0, 0, 0, 0];
  for (let state of states) {
    const wMid = Math.floor(WIDTH / 2);
    const hMid = Math.floor(HEIGHT / 2);
    if (state.pos[0] < wMid && state.pos[1] < hMid) quads[0]++;
    if (state.pos[0] > wMid && state.pos[1] < hMid) quads[1]++;
    if (state.pos[0] < wMid && state.pos[1] > hMid) quads[2]++;
    if (state.pos[0] > wMid && state.pos[1] > hMid) quads[3]++;
  }

  return quads[0] * quads[1] * quads[2] * quads[3];
};
