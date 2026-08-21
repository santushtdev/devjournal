type ProjectItemsProps={
    name: string;
    description: string;
    technologies: string[];
    updatedAt: string;
}

export function ProjectItem({
    name,
    description,
    technologies,
    updatedAt

}:ProjectItemsProps){
    return (
    <div className="cursor-pointer rounded-lg p-3 transition hover:bg-muted">
      <h3 className="font-medium">{name}</h3>

      <p className="text-sm text-muted-foreground">
        {description}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {technologies.join(" · ")}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {updatedAt}
      </p>
    </div>
  );
}