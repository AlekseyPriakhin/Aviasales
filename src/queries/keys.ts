const flights = Object.assign(() => ['flights'], {
  flight: Object.assign((id: number) => ['flight', id], {
    reserved: (id: number) => ['reservedSeats', id],
  }),
});

const tickets = Object.assign(() => ['tickets'], {});

const queryKeys = {
  flights,
  tickets,
};

export default queryKeys;
