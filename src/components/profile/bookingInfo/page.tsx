"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookingHistoryById } from "@/lib/actions/booking-actions";
import { reviewStore } from "@/lib/actions/subscribe-action";
import { BookingInfoDataType } from "@/types/booking";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Sparkles } from "lucide-react";
import {
  Bed,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  ShowerHeadIcon as Shower,
  Sofa,
  Tag,
  User,
  UtensilsCrossed,
  XCircle,
  Plane,
  Car,
  Building,
  CreditCard,
  House,
  FerrisWheel,
  Bus,
  Sun,
  Briefcase,
  PlaneTakeoff,
  CarTaxiFront,
  Send,
} from "lucide-react";
import { auth } from "~/auth";
import axios from "axios";
// interface RatingStarsProps {
//   category: string;
//   label: string;
//   onRateChange: (category: string, value: number) => void;
// }
interface RatingStarsProps {
  category: string;
  label: string;
  onRateChange: (category: string, value: number) => void;
}

export function BookingInfo({
  bookingData,
}: {
  bookingData: BookingInfoDataType;
}) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedBookingData, setSelectedBookingData] = useState({
    id: null,
    objectModel: "",
  });
  const [ratings, setRatings] = useState({
    service: 0,
    organization: 0,
    friendliness: 0,
    areaExpert: 0,
    safety: 0,
  });
  const [reviewData, setReviewData] = useState({
    review_title: "",
    review_content: "",
    review_stats: {
      Service: "",
      Organization: "",
      Friendliness: "",
      "Area Expert": "",
      Safety: "",
    },
    review_service_id: 6,
    review_service_type: "tour",
  });

  const handleOpenModal = async (bookingId: number | string) => {
    setIsLoading(true);
    try {
      const bookDetails = await getBookingHistoryById(bookingId);

      if (bookDetails?.success && bookDetails?.data) {
        setSelectedBooking(bookDetails?.data);
        setIsModalOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Bed size={22} />;
      case "flight":
        return <PlaneTakeoff size={22} />;
      case "car":
        return <Car size={22} />;
      case "attractions":
        return <FerrisWheel size={22} />;
      case "transport":
        return <Bus size={22} />;
      case "holiday":
        return <Sun size={22} />;
      case "visa":
        return <PlaneTakeoff size={22} />;
      case "car rental":
        return <Car size={22} />;
      case "umrah":
        return <MapPin size={22} />;
      case "car+driver":
        return <CarTaxiFront size={22} />;
      case "a2a visa":
        return <Briefcase size={22} />;
      case "chauffeur":
        return <User size={22} />;
      default:
        return <Home size={22} />;
    }
  };

  const StarRates = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const handleOpenReviewModal = (booking: any, index: number) => {
    setSelectedBookingData({
      id: booking.object_id,
      objectModel: booking.object_model,
    });
    setIsReviewModalOpen(true);
  };

  const handleRatingChange = (category: string, value: number) => {
    // console.log(`Category: ${category}, Rating: ${value}`);
    setReviewData((prevData) => ({
      ...prevData,
      review_stats: {
        ...prevData.review_stats,
        [category]: value,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedReviewData = {
      ...reviewData,
      review_title: e.target.title.value,
      review_content: comment,
      review_service_id: selectedBookingData.id,
      review_service_type: selectedBookingData.objectModel,
    };

    try {
      const response = await reviewStore(updatedReviewData);

      // if (!response.success) {
      //   throw new Error(response.error || "Something went wrong.");
      // }

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
    }

    setRating(0);
    setComment("");
    setIsReviewModalOpen(false);
  };

  // const RatingStars: React.FC<RatingStarsProps> = ({ category, label, onRateChange }) => {
  //   const [rating, setRating] = useState<number | null>(null);
  //   const handleRating = (value: number) => {
  //     setRating(value);
  //     onRateChange(category, value);
  //   };
  //   return (
  //     <div className="mb-6">
  //       <div className="text-gray-600 mb-2 flex items-center gap-2 font-medium">{label}</div>
  //       <div className="flex gap-1">
  //         {[1, 2, 3, 4, 5].map((star) => (
  //           <button
  //             key={star}
  //             type="button"
  //             className="focus:outline-none transition-transform hover:scale-110"
  //             onClick={() => handleRating(star)}
  //           >
  //             <Star
  //               className={`w-6 h-6 ${star <= ratings[category as keyof typeof ratings]
  //                 ? "fill-amber-400 stroke-amber-500"
  //                 : "fill-gray-100 stroke-gray-300"
  //                 }`}
  //             />
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }
  const RatingStars: React.FC<RatingStarsProps> = ({
    category,
    label,
    onRateChange,
  }) => {
    const [rating, setRating] = useState<number>(0); // Stores selected rating
    const [hover, setHover] = useState<number | null>(null); // Stores hovered star

    const handleRating = (value: number) => {
      console.log("ii", value);
      setRating(value); // Save selected rating
      onRateChange(category, value); // Send rating to parent component
    };

    return (
      <div className="mb-6">
        <div className="text-gray-600 mb-2 flex items-center gap-2 font-medium">
          {label}
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => handleRating(star)} // Change color on click
              onMouseEnter={() => setHover(star)} // Change color on hover
              onMouseLeave={() => setHover(null)} // Reset hover on leave
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= (hover ?? rating)
                    ? "fill-yellow-400 stroke-yellow-500" // Active star (clicked or hovered)
                    : "fill-gray-100 stroke-gray-300" // Inactive star
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container m-auto">
      <div className="p-4 shadow-md border rounded-xl bg-white my-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base sm:text-xl font-medium text-dark">
            Booking Information
          </h3>
          <div className="w-64"></div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
          <Table className="min-w-[1000px]">
            <TableCaption className="text-sm text-gray-500">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold whitespace-nowrap">
                  Type
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Title
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Order Date
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Amount
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Paid
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Remain
                </TableHead>
                <TableHead className="font-bold whitespace-nowrap">
                  Review
                </TableHead>
                <TableHead className="text-right pe-4 font-bold whitespace-nowrap">
                  View
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingData?.data.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell className="font-semibold flex gap-2 items-center whitespace-nowrap">
                    {getIcon(booking?.object_model || "")}
                    {booking?.object_model
                      ? booking.object_model.charAt(0).toUpperCase() +
                        booking.object_model.slice(1)
                      : ""}
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {booking?.service?.title.slice(0, 20)}...
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {booking?.created_at
                      ? new Date(booking.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : ""}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`py-1 px-4 rounded-md text-white font-semibold ${
                        booking?.status === "unpaid"
                          ? "bg-red-600"
                          : booking?.status === "failed"
                          ? "bg-red-600"
                          : booking?.status === "paid"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking?.status
                        ? booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)
                        : ""}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {Number(booking?.total || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {Number(booking?.paid || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {(
                      Number(booking?.total || 0) - Number(booking?.paid || 0)
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {booking.review === true ? (
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-medium animate-fadeIn">
                        <CheckCircle className="h-4 w-4" />
                        <span>Submitted</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          handleOpenReviewModal(booking, index);
                        }}
                        className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-950"
                      >
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          <span>Submit</span>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-right pe-4 whitespace-nowrap space-x-2">
                    <Button
                      className="hover:bg-[#273F5F] hover:text-white"
                      variant="ghost"
                      onClick={() => handleOpenModal(booking?.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        <IoEyeOutline size={18} />
                      )}
                    </Button>
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/download/${booking?.code}/invoice`}
                      download
                    >
                      <Button
                        className="hover:bg-[#273F5F] hover:text-white"
                        variant="ghost"
                      >
                        <Download size={18} />
                      </Button>
                    </a>
                    <a href={`/booking/${booking?.code}`}>
                      {Number(booking?.total || 0) >
                        Number(booking?.paid || 0) && (
                        <Button
                          className="hover:bg-[#273F5F] hover:text-white font-bold"
                          variant="ghost"
                        >
                          <CreditCard size={18} />
                        </Button>
                      )}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Booking Details
              </DialogTitle>
            </DialogHeader>
          </div>

          {selectedBooking ? (
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card className="overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Name
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.booking?.first_name}{" "}
                          {selectedBooking?.booking?.last_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Email
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.booking?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Phone
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.booking?.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          City
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.booking?.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Country
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.booking?.country}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Details Card */}
                <Card className="overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <Calendar className="h-5 w-5" />
                      Booking Details
                    </h3>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Service Title
                        </span>
                        <p className="font-medium">
                          {selectedBooking?.service?.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Category
                        </span>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {selectedBooking?.booking?.object_model}
                          </p>
                          <StarRates
                            rating={Number(
                              selectedBooking?.booking?.review_score
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedBooking?.booking?.status === "confirmed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Status
                        </span>
                        <div>
                          <Badge
                            className={`${
                              selectedBooking?.booking?.status === "confirmed"
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            {selectedBooking?.booking?.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Amount
                        </span>
                        <p className="text-lg font-bold text-primary">
                          ${selectedBooking?.booking?.total}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hotel Information Card (Conditional) */}
              {selectedBooking?.service?.hotel_info && (
                <Card className="overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
                  <div className="bg-primary/10 p-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      <Home className="h-5 w-5" />
                      Hotel Information
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                        <Bed className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Bedroom
                        </span>
                        <p className="font-semibold">
                          {selectedBooking?.service?.hotel_info?.bedroom}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                        <Sofa className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Living Room
                        </span>
                        <p className="font-semibold">
                          {selectedBooking?.service?.hotel_info?.livingroom}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                        <Shower className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Bathroom
                        </span>
                        <p className="font-semibold">
                          {selectedBooking?.service?.hotel_info?.bathroom}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                        <UtensilsCrossed className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Kitchen
                        </span>
                        <p className="font-semibold">
                          {selectedBooking?.service?.hotel_info?.kitchen}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                        <Home className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Type
                        </span>
                        <p className="font-semibold">
                          {selectedBooking?.service?.hotel_info?.type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">
                Loading booking details...
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="w-full max-w-5xl mx-auto my-4 md:my-10 p-4 md:p-6 bg-white rounded-lg shadow-lg max-h-screen overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="flex gap-1 text-lg md:text-2xl font-bold tracking-tight items-center">
                <Sparkles className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
                <span>Share Your Experience</span>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Scrollable Content with Custom Scrollbar */}
          <div className="overflow-y-auto max-h-[70vh] p-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <div className="bg-white border rounded-xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  <div className="p-4 md:p-6">
                    <div className="mb-4 md:mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="What's most important to know?"
                        className="w-full p-2 md:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review
                        </label>
                        <textarea
                          id="comment"
                          placeholder="Write your review here..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          required
                          className="w-full p-3 md:p-4 border border-gray-200 rounded-lg h-32 md:h-64 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 bg-gray-50 p-4 md:p-6 rounded-lg">
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-4">
                          Rate Your Experience
                        </h3>
                        <RatingStars
                          category="Service"
                          label="Service Quality"
                          onRateChange={handleRatingChange}
                        />
                        <RatingStars
                          category="Organization"
                          label="Organization"
                          onRateChange={handleRatingChange}
                        />
                        <RatingStars
                          category="Friendliness"
                          label="Staff Friendliness"
                          onRateChange={handleRatingChange}
                        />
                        <RatingStars
                          category="Area Expert"
                          label="Knowledge & Expertise"
                          onRateChange={handleRatingChange}
                        />
                        <RatingStars
                          category="Safety"
                          label="Safety Measures"
                          onRateChange={handleRatingChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center mt-6 md:mt-8">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:translate-y-[-2px]"
                      >
                        <Send className="w-4 h-4" />
                        Submit Your Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
