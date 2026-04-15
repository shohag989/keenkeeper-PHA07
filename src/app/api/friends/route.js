import friends from "@/data/friends.json";

export function GET() {
  return Response.json(friends);
}

