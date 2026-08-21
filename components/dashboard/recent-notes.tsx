import { NoteItem } from "./note-item";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentNotes(){
    return(
        <Card>
  <CardHeader>
    <CardTitle>Recent Notes</CardTitle>
    <CardDescription>This are you'r recent notes </CardDescription>
    <CardAction></CardAction>
  </CardHeader>
  <CardContent className="space-y-2">
   <NoteItem
   name="My Note"
   description="Some description"
   updatedAt="Updated recently"
  />
  </CardContent>
 
</Card>
    )
}