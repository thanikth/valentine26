import BookOpening from "../album/BookOpening";

export default function BookDemoPage() {
  return (
    <div>
      <BookOpening
        title="Valentine Album"
        autoPlay={true}
        autoPlayDelay={300}
        pages={[
          { id: 1, content: "📖 Chapter 1" },
          { id: 2, content: "💝 Special Moments" },
          { id: 3, content: "🌹 Memories Together" },
          { id: 4, content: "✨ Forever" },
          { id: 5, content: "❤️ Always" },
        ]}
      />
    </div>
  );
}
