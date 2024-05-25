import prods from './prods.json';

export async function GET(request: Request) {
  return Response.json(prods);
}
