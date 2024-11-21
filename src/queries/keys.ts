const flights = Object.assign(() => ['flights'], {
  flight: (id: number) => ['flight', id],
});

const tickets = Object.assign(() => ['tickets'], {});

const queryKeys = {
  flights,
  tickets,
};

export default queryKeys;
