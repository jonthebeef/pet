export async function GET() {
  return Response.json({ status: 'ok', message: 'Tamagotchi server is running!' });
}