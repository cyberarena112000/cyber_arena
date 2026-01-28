import { useParams } from "react-router-dom";
import { tools } from "../data/tools";

export default function ToolDetails() {
    const { id } = useParams();
    const tool = tools.find((t) => t.id === id);

    if (!tool) {
        return <div>Tool not found</div>;
    }

    return (
        <div>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
        </div>
    );
}
