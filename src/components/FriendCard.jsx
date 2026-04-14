export default function FriendCard({ friend }) {
  return (
    <div>
      <h2>{friend.name}</h2>
      <p>{friend.description}</p>
    </div>
  );
}