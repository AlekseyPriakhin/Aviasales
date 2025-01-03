const flights = Object.assign(() => ['flights'], {
  flight: Object.assign((id: number) => ['flight', id], {
    reserved: (id: number) => ['reservedSeats', id],
  }),
});

const routes = Object.assign(() => ['routes'], {
  search: (tag = '') => [`search_${tag}`],
});

const tickets = Object.assign(() => ['tickets'], {});

const queryKeys = {
  flights,
  tickets,
  routes,
};

export default queryKeys;
