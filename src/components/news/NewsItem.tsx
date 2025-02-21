
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NewsItemProps {
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishedAt: Date;
  url: string;
}

export const NewsItem = ({
  title,
  summary,
  imageUrl,
  source,
  publishedAt,
  url,
}: NewsItemProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-accent/5">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardContent className="p-4 flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {summary}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(publishedAt, { addSuffix: true })}
              </div>
              <span>{source}</span>
            </div>
          </div>
        </CardContent>
      </a>
    </Card>
  );
};
