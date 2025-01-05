const flights = Object.assign(() => ['flights'], {
  flight: Object.assign((id: number) => ['flight', id], {
    reserved: (id: number) => ['reservedSeats', id],
  }),
});

const routes = Object.assign(() => ['routes'], {
  search: (tag = '') => [`search_${tag}`],
});

const tickets = Object.assign(() => ['tickets'], {});

const me = Object.assign(() => ['me'], {});

const queryKeys = {
  flights,
  tickets,
  routes,
  me,
};

export default queryKeys;
