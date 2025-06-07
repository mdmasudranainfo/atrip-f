import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookCheck,
  CalendarIcon,
  Hotel,
  MapPin,
  ShieldQuestion,
  SlidersHorizontal,
  SquarePlus,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { formatPrice } from "@/lib/utils";

const BlogDetails = async (context: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await context.params;
  const slug = params.slug;

  return (
    <div>
      <h1>Blog Details</h1>
    </div>
  );
};

export default BlogDetails;
