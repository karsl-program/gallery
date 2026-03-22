import { MOCK_PHOTOS } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Download, Maximize2, ArrowLeft } from "lucide-react"

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const photo = MOCK_PHOTOS.find((p) => p.id === id)

  if (!photo) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Gallery
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center min-h-[500px] relative group border">
           <div className="relative w-full h-full min-h-[500px]">
             <Image
               src={photo.url}
               alt={photo.title}
               fill
               className="object-contain"
               priority
             />
           </div>
           <Button variant="secondary" size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="h-4 w-4" />
           </Button>
        </div>

        <div className="space-y-8">
           <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight">{photo.title}</h1>
              <div className="flex items-center justify-between">
                 <Link href={`/user/${photo.creator.id}`} className="flex items-center space-x-3 group">
                    <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary transition-all">
                       <AvatarImage src={photo.creator.avatar} />
                       <AvatarFallback>{photo.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                       <p className="font-medium group-hover:text-primary transition-colors">{photo.creator.name}</p>
                       <p className="text-xs text-muted-foreground">Pro Member</p>
                    </div>
                 </Link>
                 <Button variant="outline" size="sm">Follow</Button>
              </div>
           </div>

           <div className="flex space-x-2">
              <Button className="flex-1" size="lg">
                 <Heart className="h-5 w-5 mr-2" />
                 Like
              </Button>
              <Button variant="secondary" size="icon" className="h-11 w-11">
                 <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="h-11 w-11">
                 <Download className="h-5 w-5" />
              </Button>
           </div>

           <div className="bg-card border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                 {photo.description}
              </p>
           </div>

           <div className="flex flex-wrap gap-2">
              {["Nature", "Photography", "Landscape", "Canon", "Outdoor"].map(tag => (
                 <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium cursor-pointer hover:bg-secondary/80">
                    #{tag}
                 </span>
              ))}
           </div>
           
           <div className="text-xs text-muted-foreground pt-4 border-t">
              <p>Uploaded on March 15, 2026</p>
              <p>Resolution: {photo.width}x{photo.height}</p>
           </div>
        </div>
      </div>
    </div>
  )
}
