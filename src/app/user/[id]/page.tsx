import { MOCK_CREATORS, MOCK_PHOTOS } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, UserPlus, Image as ImageIcon, Layers, Heart, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const user = MOCK_CREATORS.find(c => c.id === id) || {
      id: id,
      name: "User " + id,
      avatar: "https://github.com/shadcn.png",
      bio: "Photography enthusiast. Capturing moments."
  }

  const isOwnProfile = id === "u1" // Mock check

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left space-y-4">
           <div className="flex flex-col md:flex-row items-center gap-4">
             <h1 className="text-3xl font-bold">{user.name}</h1>
             {isOwnProfile ? (
                <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                </Button>
             ) : (
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                </Button>
             )}
           </div>
           
           <div className="flex justify-center md:justify-start gap-6 text-sm">
              <div className="text-center md:text-left">
                 <span className="font-bold block text-lg">128</span>
                 <span className="text-muted-foreground">Photos</span>
              </div>
              <div className="text-center md:text-left">
                 <span className="font-bold block text-lg">12</span>
                 <span className="text-muted-foreground">Albums</span>
              </div>
              <div className="text-center md:text-left">
                 <span className="font-bold block text-lg">2.4k</span>
                 <span className="text-muted-foreground">Followers</span>
              </div>
               <div className="text-center md:text-left">
                 <span className="font-bold block text-lg">350</span>
                 <span className="text-muted-foreground">Following</span>
              </div>
           </div>

           <p className="text-muted-foreground max-w-lg">
             {(user as any).bio || "No bio yet."}
           </p>
        </div>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 mb-8 overflow-x-auto">
          <TabsTrigger value="photos" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <ImageIcon className="h-4 w-4 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="albums" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Layers className="h-4 w-4 mr-2" />
            Albums
          </TabsTrigger>
          <TabsTrigger value="likes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Heart className="h-4 w-4 mr-2" />
            Likes
          </TabsTrigger>
          <TabsTrigger value="following" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6">
            <Users className="h-4 w-4 mr-2" />
            Following
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="mt-0">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {MOCK_PHOTOS.slice(0, 8).map(photo => (
                 <Link href={`/photo/${photo.id}`} key={photo.id} className="relative aspect-square bg-muted overflow-hidden rounded-md group">
                    <Image src={photo.url} alt={photo.title} fill className="object-cover transition-transform group-hover:scale-105" />
                 </Link>
              ))}
           </div>
        </TabsContent>
        
        <TabsContent value="albums">
           <div className="text-center py-12 text-muted-foreground">
              No albums created yet.
           </div>
        </TabsContent>

        <TabsContent value="likes">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {MOCK_PHOTOS.slice(5, 10).map(photo => (
                 <Link href={`/photo/${photo.id}`} key={photo.id} className="relative aspect-square bg-muted overflow-hidden rounded-md group">
                    <Image src={photo.url} alt={photo.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Heart className="h-8 w-8 text-white fill-white" />
                    </div>
                 </Link>
              ))}
           </div>
        </TabsContent>
        
        <TabsContent value="following">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_CREATORS.map(creator => (
                 <Link href={`/user/${creator.id}`} key={creator.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar>
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">1.2k followers</p>
                    </div>
                 </Link>
              ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
