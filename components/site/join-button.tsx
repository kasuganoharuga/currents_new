import { Button } from "@/components/ui/button";

function JoinButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="brand"
      className="h-auto px-[18px] py-[9px] font-space text-xs font-bold tracking-[0.12em] uppercase max-[560px]:px-4"
      onClick={onClick}
    >
      <span className="max-[560px]:hidden">Join the community</span>
      <span className="min-[560px]:hidden">Join</span>
    </Button>
  );
}

export { JoinButton };
