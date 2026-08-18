import { Button } from "@/components/ui/button";

function JoinButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="brand"
      className="h-auto px-[18px] py-[9px] font-space text-xs font-bold tracking-[0.12em] uppercase max-[480px]:px-3 max-[480px]:text-[9px]"
      onClick={onClick}
    >
      Become a member
    </Button>
  );
}

export { JoinButton };
