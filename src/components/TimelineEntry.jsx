export default function TimelineEntry({ entry }) {
  return (
    <div>
      <p>{entry.text}</p>
      <span>{entry.date}</span>
    </div>
  );
}