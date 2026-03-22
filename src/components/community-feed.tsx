"use client"

import { useState } from "react"
import { MOCK_PHOTOS } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Columns, 
  List, 
  Grid3X3, 
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type LayoutMode = "masonry" | "single" | "grid"

export function CommunityFeed() {
  const [layout, setLayout] = useState<LayoutMode>("masonry")

  return (
    <div className="container mx-auto px-4 space-y-8 pb-20">
      <div className="flex justify-between items-center py-4 sticky top-20 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg px-4 border shadow-sm mt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Explore</h1>
        <div className="flex space-x-1 bg-muted p-1 rounded-md">
          <Button
            variant={layout === "masonry" ? "default" : "ghost"}
            size="sm"
            onClick={() => setLayout("masonry")}
            title="Masonry View"
            className="px-3 h-8"
          >
            <Columns className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Masonry</span>
          </Button>
          <Button
            variant={layout === "single" ? "default" : "ghost"}
            size="sm"
            onClick={() => setLayout("single")}
            title="Detail View"
            className="px-3 h-8"
          >
            <List className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Detail</span>
          </Button>
          <Button
            variant={layout === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setLayout("grid")}
            title="Grid View"
            className="px-3 h-8"
          >
            <Grid3X3 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
        </div>
      </div>

      <div className={cn(
        "w-full transition-all duration-500 ease-in-out",
        layout === "masonry" && "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4",
        layout === "single" && "max-w-2xl mx-auto space-y-8",
        layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      )}>
        {MOCK_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={cn(
              "break-inside-avoid",
              layout === "masonry" ? "mb-4" : "",
              layout === "grid" ? "h-full" : ""
            )}
          >
            <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col border-none shadow-md bg-card/50 backdrop-blur-sm">
              <Link href={`/photo/${photo.id}`} className="block relative overflow-hidden group">
                 <div className={cn(
                    "relative overflow-hidden bg-muted",
                    layout === "grid" ? "aspect-square" : "w-full"
                 )}>
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      className={cn(
                        "object-cover transition-transform duration-700 group-hover:scale-110",
                        layout === "grid" ? "absolute inset-0 w-full h-full" : "w-full h-auto"
                      )}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                 </div>
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </Button>
                 </div>
              </Link>
              
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold truncate pr-2 text-foreground/90">{photo.title}</h3>
                        <div className="flex items-center text-muted-foreground text-xs bg-muted px-2 py-1 rounded-full">
                            <Heart className="h-3 w-3 mr-1 fill-current" />
                            {photo.likes}
                        </div>
                    </div>
                    {layout === "single" && (
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {photo.description}
                        </p>
                    )}
                 </div>
                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <Link href={`/user/${photo.creator.id}`} className="flex items-center space-x-2 group/user">
                        <Avatar className="h-6 w-6 ring-2 ring-background transition-transform group-hover/user:scale-110">
                            <AvatarImage src={photo.creator.avatar} />
                            <AvatarFallback>{photo.creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground group-hover/user:text-primary transition-colors">
                            {photo.creator.name}
                        </span>
                    </Link>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
