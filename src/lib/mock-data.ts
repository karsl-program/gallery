export interface Creator {
  id: string
  name: string
  avatar: string
}

export interface Photo {
  id: string
  url: string
  title: string
  description: string
  creator: Creator
  width: number
  height: number
  likes: number
}

export const MOCK_CREATORS: Creator[] = [
  {
    id: "c1",
    name: "Alice Photographer",
    avatar: "https://i.pravatar.cc/150?u=alice",
  },
  {
    id: "c2",
    name: "Bob Shutter",
    avatar: "https://i.pravatar.cc/150?u=bob",
  },
  {
    id: "c3",
    name: "Charlie Lens",
    avatar: "https://i.pravatar.cc/150?u=charlie",
  },
]

export const MOCK_PHOTOS: Photo[] = Array.from({ length: 20 }).map((_, i) => {
  const width = i % 3 === 0 ? 800 : 600
  const height = i % 3 === 0 ? 1200 : i % 2 === 0 ? 800 : 600
  const creator = MOCK_CREATORS[i % MOCK_CREATORS.length]
  return {
    id: `p${i + 1}`,
    url: `https://picsum.photos/id/${10 + i}/${width}/${height}`,
    title: `Beautiful Shot ${i + 1}`,
    description: `This is a wonderful photo taken by ${creator.name}. It captures the essence of the moment.`,
    creator,
    width,
    height,
    likes: Math.floor(Math.random() * 1000),
  }
})
