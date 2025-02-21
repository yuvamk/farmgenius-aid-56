
import { useState } from "react";
import { FeaturedNews } from "./FeaturedNews";
import { NewsItem } from "./NewsItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data - replace with actual API call
const fetchNews = async () => {
  // Implement your news API call here
  return {
    featured: {
      title: "Revolutionary Smart Irrigation System Helps Farmers Save Water",
      summary: "A new AI-powered irrigation system is helping farmers reduce water consumption by up to 40% while maintaining crop yields.",
      imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      source: "AgriTech Today",
      publishedAt: new Date(),
      url: "#",
    },
    news: Array.from({ length: 10 }, (_, i) => ({
      title: `Farming News Article ${i + 1}`,
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      source: "AgriNews",
      publishedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      url: "#",
    })),
  };
};

const categories = [
  "All",
  "Technology",
  "Market Trends",
  "Policy",
  "Weather",
  "Research",
];

export const NewsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data: newsData, isLoading } = useQuery({
    queryKey: ["news", page, selectedCategory],
    queryFn: fetchNews,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Farming News Across the Country
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 max-w-[calc(100vw-2rem)] sm:max-w-none">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Featured News */}
        <div className="lg:sticky lg:top-24 h-fit">
          {newsData?.featured && <FeaturedNews {...newsData.featured} />}
        </div>

        {/* News List */}
        <div className="space-y-4">
          <ScrollArea className="h-[800px] pr-4">
            {newsData?.news.map((item, index) => (
              <div key={index} className="mb-4">
                <NewsItem {...item} />
              </div>
            ))}
          </ScrollArea>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLoadMore}
          >
            Load More News
          </Button>
        </div>
      </div>
    </section>
  );
};
