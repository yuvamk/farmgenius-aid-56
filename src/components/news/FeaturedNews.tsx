
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FeaturedNewsProps {
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishedAt: Date;
  url: string;
}

export const FeaturedNews = ({
  title,
  summary,
  imageUrl,
  source,
  publishedAt,
  url,
}: FeaturedNewsProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-[300px] overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-2">
        <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">{summary}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDistanceToNow(publishedAt, { addSuffix: true })}
          </div>
          <span>Source: {source}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group" asChild>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Read Full Article
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
