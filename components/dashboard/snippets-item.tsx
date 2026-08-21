type SnippetItemsProps={
    name: string;
    code: string;
    language: string[];
    updatedAt: string;
}

export function SnippetItem({
    name,
    code,
    language,
    updatedAt
}:SnippetItemsProps){
    return(
        <div className="cursor-pointer rounded-lg p-3 transition hover:bg-muted">
      <h3 className="font-medium">{name}</h3>

      <p className="text-sm text-muted-foreground">
        {code}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {language.join(" · ")}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {updatedAt}
      </p>
    </div>
    )
}