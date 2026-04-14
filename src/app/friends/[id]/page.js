export default function Page({ params }) {
  return (
    <div>
      <h1>Friend Detail</h1>
      <p>Friend ID: {params.id}</p>
    </div>
  );
}