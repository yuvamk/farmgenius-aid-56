
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";

interface SchemeCardProps {
  title: string;
  description: string;
  eligibility: string[];
  icon: string;
  type: string;
  region: string;
  pdfUrl?: string;
  learnMoreUrl: string;
}

export const SchemeCard = ({
  title,
  description,
  eligibility,
  icon,
  type,
  region,
  pdfUrl,
  learnMoreUrl,
}: SchemeCardProps) => {
  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 p-2 flex items-center justify-center">
            <img src={icon} alt="" className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{type}</Badge>
              <Badge variant="outline">{region}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <div>
          <h4 className="font-medium mb-2">Eligibility:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {eligibility.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button className="flex-1" asChild>
          <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4 mr-2" />
            Learn More
          </a>
        </Button>
        {pdfUrl && (
          <Button variant="outline" className="flex-1" asChild>
            <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
