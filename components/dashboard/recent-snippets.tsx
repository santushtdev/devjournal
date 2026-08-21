import { SnippetItem } from "./snippets-item";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentSnippets(){
    return(
        <Card>
  <CardHeader>
    <CardTitle>Recent Snippets</CardTitle>
    <CardDescription>This are code snippets</CardDescription>
    <CardAction></CardAction>
  </CardHeader>
  <CardContent className="space-y-2">
    <SnippetItem
    name="API code"
    code="///"
    language={["Ts","Js"]}
    updatedAt="updated successfully"
    />
    </CardContent>
  
</Card>
    )
}