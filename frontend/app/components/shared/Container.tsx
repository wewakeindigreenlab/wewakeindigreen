export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-20">
      {children}
    </div>
  );
}
