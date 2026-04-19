export default function SubPage({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500">This page is currently under development.</p>
    </div>
  );
}
