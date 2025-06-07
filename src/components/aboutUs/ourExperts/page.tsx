import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Expert {
    name: string
    role: string
    imageUrl: string
}

export default function OurExperts() {
    const experts: Expert[] = [
        {
            name: "Rafael E. Kennison",
            role: "Web Developer",
            imageUrl: "/images/experts_1.png",
        },
        {
            name: "John T. Johnson",
            role: "Digital Marketer",
            imageUrl: "/images/experts_2.png",
        },
        {
            name: "Russell M. Bucher",
            role: "UI Designer",
            imageUrl: "/images/experts_3.png",
        },
        {
            name: "William P. Britton",
            role: "Content Writer",
            imageUrl: "/images/experts_2.png",
        },
    ]

    return (
        <section className="py-12 px-4 md:py-16 md:px-6 lg:py-20">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl text-dark font-bold text-center mb-12">Meet With Our Experts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experts.map((expert) => (
                        <Card key={expert.name} className="border-none !shadow-none !bg-transparent">
                            <CardContent className="p-0 sm:p-0">
                                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                                    <Image
                                        src={expert.imageUrl || "/placeholder.svg"}
                                        alt={expert.name}
                                        fill
                                        width={500}
                                        height={500}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-semibold text-lg text-dark mb-1">{expert.name}</h3>
                                    <p className="text-dark">{expert.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
