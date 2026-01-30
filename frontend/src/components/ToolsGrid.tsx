import ToolCard from "./ToolCard";

const tools = [
  { title: "AES Encrypt/Decrypt", description: "AES-GCM symmetric encryption" },
  { title: "RSA Sign/Verify", description: "RSA keys signing" },
  { title: "SHA-256 Hash", description: "Create SHA-256 hashes" },
  { title: "Base64 Encode/Decode", description: "Quick base64 utilities" },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t) => <ToolCard key={t.title} {...t} onClick={() => alert(`${t.title} open`)} />)}
      </div>
    </section>
  );
}
