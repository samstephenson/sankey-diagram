export default function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 px-6 pb-6 mx-auto w-full flex flex-col">
        {props.children}
      </main>
    </div>
  );
}
