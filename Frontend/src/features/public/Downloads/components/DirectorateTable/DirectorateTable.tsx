import { Card } from "@/components"
import { elements } from "./elements"

export const DirectorateTable = () => {
    return elements.map((element) => (
        <Card
            name={element.name}
            icon={element.icon}
            color="green"
            description={element.description}
        />
    ))
}