import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-xs mx-auto mt-8 w-full max-w-[320px">
      {/* Tomorrow Tile */}
      <Card className="">
        <CardHeader className="items-center">
          <CardTitle>Tomorrow</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-14 h-14 text-2xl border-2 border-dashed"
            aria-label="Add meal for tomorrow"
          >
            +
          </Button>
        </CardContent>
      </Card>

      {/* Today Tile */}
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <Badge className="rotate-45 px-6 py-2 text-lg font-bold">Pizza</Badge>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button size="sm" variant="outline">how was it?</Button>
        </CardFooter>
      </Card>

      {/* Yesterday Tile */}
      <Card>
        <CardHeader>
          <CardTitle>Yesterday</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <Badge className="rotate-45 px-6 py-2 text-lg font-bold">Zupa</Badge>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end items-center">
          <span className="text-xs bg-muted rounded px-2 py-1">8/10</span>
          <Button size="sm" variant="outline">EDIT</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
