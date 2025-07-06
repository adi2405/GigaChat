import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-6">
      <p className="text-6xl font-semibold text-black">Whereas</p>
      <Button variant={"default"} size={"lg"} className="text-lg cursor-pointer">
        GigaChat
      </Button>
    </div>
  );
}
