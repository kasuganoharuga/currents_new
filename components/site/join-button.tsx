function JoinButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="rounded-full bg-ink px-[18px] py-[9px] font-space text-xs font-bold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-black"
      onClick={onClick}
    >
      Join Currents
    </button>
  );
}

export { JoinButton };
