import { motion } from "framer-motion";

type Props = { title: string; description: string; onClick?: () => void; };

export default function ToolCard({ title, description, onClick }: Props) {
  return (
    <motion.article whileHover={{ y: -6 }} className="bg-white dark:bg-[#061018] border dark:border-gray-800 p-5 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4">
        <button onClick={onClick} className="px-3 py-2 bg-primary text-white rounded-md text-sm">Open</button>
      </div>
    </motion.article>
  );
}
