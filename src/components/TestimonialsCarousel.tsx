import React from "react";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { VideoCard } from "./VideoCard";
import JsonLd from "@/components/JsonLd";
import { Review, WithContext } from "schema-dts";
import { getTestimonials, getStrapiImageUrl } from "@/lib/strapi";

interface TestimonialsCarouselProps {
  title?: React.ReactNode;
  videoCategory?: string;
  lang?: string;
}

export default async function TestimonialsCarousel({ title, videoCategory = "Video Testimonial", lang = "en" }: TestimonialsCarouselProps) {
  const testimonials = await getTestimonials(lang);

  if (!testimonials.length) return null;

  const cards = testimonials.map((item, index) => (
    <VideoCard
      key={item.documentId}
      card={{
        title: item.title,
        category: videoCategory,
        src: item.thumbnail ? getStrapiImageUrl(item.thumbnail.url) : '/logo.webp',
        videoUrl: item.video ? getStrapiImageUrl(item.video.url) : undefined,
        content: <DummyContent content={item.content ?? ''} studentName={item.studentName} />,
      }}
      index={index}
    />
  ));

  const reviewSchema: WithContext<Review>[] = testimonials.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: item.studentName,
    },
    reviewBody: item.content,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    itemReviewed: {
      "@type": "Organization",
      name: "Student's Life",
    },
  }));

  return (
    <div className="w-full h-full">
      {reviewSchema.map((schema, idx) => (
        <JsonLd<Review> key={idx} data={schema} />
      ))}
      <Carousel items={cards} title={title} />
    </div>
  );
}

const DummyContent = ({ content, studentName }: { content: string; studentName: string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {studentName}
        </span>{" "}
        <br /><br />
        {content}
      </p>
    </div>
  );
};
