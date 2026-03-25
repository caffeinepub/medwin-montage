export default function PageBackground({ src }: { src: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        style={{ opacity: 0.18 }}
      />
    </div>
  );
}
