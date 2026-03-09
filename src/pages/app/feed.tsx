import * as React from "react"
import { useState, useEffect, useRef } from "react"
import {
  ThumbsUp,
  Heart,
  MessageCircle,
  Share2,
  Image,
  Film,
  SmilePlus,
  X,
  Send,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// --- Dummy Data ---

const currentUser = {
  name: "Sarah Mitchell",
  avatar: "",
  initials: "SM",
}

type Reaction = "like" | "love"

interface Comment {
  id: string
  author: { name: string; initials: string; avatar: string }
  content: string
  time: string
}

interface Post {
  id: string
  author: { name: string; initials: string; avatar: string; role: string }
  content: string
  image?: string
  time: string
  reactions: { like: number; love: number }
  userReaction?: Reaction | null
  comments: Comment[]
  shares: number
}

const initialPosts: Post[] = [
  {
    id: "1",
    author: { name: "Maria Gonzalez", initials: "MG", avatar: "", role: "County Chair" },
    content: "Just wrapped up our precinct captain training session! 42 new captains ready to hit the ground running this cycle. So proud of this team. 💪 If you missed it, we'll have recordings up in the Training section by Friday.",
    time: "2 hours ago",
    reactions: { like: 34, love: 12 },
    userReaction: null,
    comments: [
      { id: "c1", author: { name: "James Chen", initials: "JC", avatar: "" }, content: "This was such a great session! Can't wait to get started in my precinct.", time: "1 hour ago" },
      { id: "c2", author: { name: "Tonya Williams", initials: "TW", avatar: "" }, content: "Will the slides be available too? I want to share them with my team.", time: "45 min ago" },
    ],
    shares: 8,
  },
  {
    id: "2",
    author: { name: "David Park", initials: "DP", avatar: "", role: "Volunteer Coordinator" },
    content: "🗳️ VOTER REGISTRATION DRIVE THIS SATURDAY!\n\nWe need 20 more volunteers for our registration drive at Riverside Community Center. 9 AM - 4 PM. Lunch provided!\n\nSign up in the Events section or reply here if you can make it.",
    time: "5 hours ago",
    reactions: { like: 56, love: 23 },
    userReaction: null,
    comments: [
      { id: "c3", author: { name: "Lisa Ramirez", initials: "LR", avatar: "" }, content: "Count me in! I'll bring my neighbor too.", time: "4 hours ago" },
      { id: "c4", author: { name: "Robert Kim", initials: "RK", avatar: "" }, content: "I can do 9-1. Will that work?", time: "3 hours ago" },
      { id: "c5", author: { name: "David Park", initials: "DP", avatar: "" }, content: "@Robert absolutely, half-day shifts are perfect!", time: "3 hours ago" },
    ],
    shares: 15,
  },
  {
    id: "3",
    author: { name: "Angela Foster", initials: "AF", avatar: "", role: "Communications Director" },
    content: "New talking points for the infrastructure bill are now available in Resources. Key highlights:\n\n• $2.3M allocated for local road repairs\n• New community center funding approved\n• Broadband expansion to rural precincts\n\nPlease review before any canvassing this weekend!",
    time: "8 hours ago",
    reactions: { like: 41, love: 8 },
    userReaction: null,
    comments: [
      { id: "c6", author: { name: "Marcus Johnson", initials: "MJ", avatar: "" }, content: "The broadband point is huge for District 7. Thanks for putting this together!", time: "7 hours ago" },
    ],
    shares: 22,
  },
  {
    id: "4",
    author: { name: "Kevin O'Brien", initials: "KO", avatar: "", role: "Field Organizer" },
    content: "Shoutout to the phone bank crew last night! We made 847 calls and identified 312 supporters. That's a 37% contact rate — well above our 25% target. 🎉\n\nTop callers:\n🥇 Priya Sharma - 94 calls\n🥈 Tom Walters - 87 calls\n🥉 Diana Cruz - 82 calls",
    time: "12 hours ago",
    reactions: { like: 89, love: 45 },
    userReaction: null,
    comments: [
      { id: "c7", author: { name: "Priya Sharma", initials: "PS", avatar: "" }, content: "What a night! The new script really made a difference.", time: "11 hours ago" },
      { id: "c8", author: { name: "Tom Walters", initials: "TW2", avatar: "" }, content: "Great team effort! When's the next one?", time: "10 hours ago" },
      { id: "c9", author: { name: "Kevin O'Brien", initials: "KO", avatar: "" }, content: "Next phone bank is Thursday 6-9 PM. Same Zoom link!", time: "10 hours ago" },
    ],
    shares: 11,
  },
  {
    id: "5",
    author: { name: "Rachel Adams", initials: "RA", avatar: "", role: "Treasurer" },
    content: "Monthly fundraising update: We've raised $18,400 this month from 234 individual donors. That's a 23% increase over last month! Small-dollar donations are making a huge difference.\n\nReminder: Our quarterly filing deadline is in 12 days. Please submit any outstanding expense reports ASAP.",
    time: "1 day ago",
    reactions: { like: 67, love: 31 },
    userReaction: null,
    comments: [
      { id: "c10", author: { name: "Maria Gonzalez", initials: "MG", avatar: "" }, content: "Incredible work Rachel! The grassroots energy is real.", time: "22 hours ago" },
    ],
    shares: 5,
  },
  {
    id: "6",
    author: { name: "James Chen", initials: "JC", avatar: "", role: "Precinct Captain" },
    content: "Did my first solo door-knocking shift today! Talked to 28 households in Precinct 14. Most people were friendly and willing to chat. Got 6 new volunteer sign-ups! 🚪\n\nThe canvassing training really prepared me well. Highly recommend it if you haven't done it yet.",
    time: "1 day ago",
    reactions: { like: 52, love: 19 },
    userReaction: null,
    comments: [
      { id: "c11", author: { name: "Angela Foster", initials: "AF", avatar: "" }, content: "This is exactly why we do these trainings. Amazing job James!", time: "1 day ago" },
      { id: "c12", author: { name: "Kevin O'Brien", initials: "KO", avatar: "" }, content: "6 volunteer signups from one shift?! That's outstanding.", time: "23 hours ago" },
    ],
    shares: 3,
  },
  {
    id: "7",
    author: { name: "Tonya Williams", initials: "TW", avatar: "", role: "Digital Organizer" },
    content: "📱 Social media tip of the week:\n\nWhen sharing our campaign content, add a personal story about WHY the issue matters to you. Posts with personal stories get 3x more engagement than straight policy shares.\n\nDrop your best personal story examples below! 👇",
    time: "2 days ago",
    reactions: { like: 38, love: 14 },
    userReaction: null,
    comments: [
      { id: "c13", author: { name: "Lisa Ramirez", initials: "LR", avatar: "" }, content: "I shared about how the new crosswalk saved my daughter's walk to school. Got 200+ shares!", time: "2 days ago" },
    ],
    shares: 18,
  },
]

const upcomingEvents = [
  { id: "e1", title: "Voter Registration Drive", date: "Sat, Mar 15", time: "9 AM - 4 PM", location: "Riverside Community Center" },
  { id: "e2", title: "Phone Bank Night", date: "Thu, Mar 13", time: "6 - 9 PM", location: "Virtual (Zoom)" },
  { id: "e3", title: "Monthly Meeting", date: "Mon, Mar 17", time: "7 PM", location: "County HQ" },
  { id: "e4", title: "Canvassing Weekend", date: "Sat, Mar 22", time: "10 AM - 2 PM", location: "Multiple Locations" },
]

const popularPosts = [
  { id: "p1", title: "Phone bank crew hits 847 calls!", author: "Kevin O'Brien", reactions: 134 },
  { id: "p2", title: "Monthly fundraising up 23%", author: "Rachel Adams", reactions: 98 },
  { id: "p3", title: "Voter registration drive Saturday", author: "David Park", reactions: 79 },
  { id: "p4", title: "42 new precinct captains trained", author: "Maria Gonzalez", reactions: 46 },
]

// --- Shared card style ---
const feedCard = "gap-0 py-0 bg-sidebar border-border/50 shadow-none"

// --- Components ---

function CreatePostPrompt({ onClick }: { onClick: () => void }) {
  return (
    <Card className={`cursor-pointer ${feedCard}`} onClick={onClick}>
      <CardContent className="flex items-center gap-3 p-4">
        <Avatar className="size-10">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 rounded-full border bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          What's on your mind, {currentUser.name.split(" ")[0]}?
        </div>
        <Button size="icon" className="shrink-0 rounded-full size-9 bg-green-200 hover:bg-green-300 text-green-800 border-0">
          <Image className="size-4" />
        </Button>
        <Button size="icon" className="shrink-0 rounded-full size-9 bg-red-200 hover:bg-red-300 text-red-800 border-0">
          <Film className="size-4" />
        </Button>
        <Button size="icon" className="shrink-0 rounded-full size-9 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 border-0">
          <SmilePlus className="size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

function CreatePostModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [content, setContent] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 pt-2">
          <Avatar className="size-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">Posting to Community Feed</p>
          </div>
        </div>
        <Textarea
          placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
          className="min-h-[120px] resize-none border-0 p-0 text-base shadow-none focus-visible:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-green-600">
              <Image className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500">
              <Film className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-yellow-500">
              <SmilePlus className="size-5" />
            </Button>
          </div>
          <Button disabled={!content.trim()}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false)
  const [reaction, setReaction] = useState<Reaction | null>(post.userReaction ?? null)
  const [reactions, setReactions] = useState(post.reactions)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(post.comments)

  function toggleReaction(type: Reaction) {
    if (reaction === type) {
      setReaction(null)
      setReactions((r) => ({ ...r, [type]: r[type] - 1 }))
    } else {
      if (reaction) {
        setReactions((r) => ({ ...r, [reaction]: r[reaction] - 1 }))
      }
      setReaction(type)
      setReactions((r) => ({ ...r, [type]: r[type] + 1 }))
    }
  }

  function addComment() {
    if (!commentText.trim()) return
    setComments([
      ...comments,
      {
        id: `new-${Date.now()}`,
        author: currentUser,
        content: commentText,
        time: "Just now",
      },
    ])
    setCommentText("")
  }

  const totalReactions = reactions.like + reactions.love

  return (
    <Card className={feedCard}>
      <CardHeader className="flex flex-row items-start gap-3 p-4">
        <Avatar className="size-10">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{post.author.name}</span>
            <span className="text-xs text-muted-foreground">• {post.author.role}</span>
          </div>
          <p className="text-xs text-muted-foreground">{post.time}</p>
        </div>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        <p className="text-sm whitespace-pre-line">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="" className="mt-3 rounded-lg w-full object-cover max-h-96" />
        )}
      </CardContent>
      {/* Reaction counts */}
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {totalReactions > 0 && (
            <>
              <span className="flex -space-x-0.5">
                <span className="inline-flex size-4 items-center justify-center rounded-full bg-blue-500 text-[8px] text-white">👍</span>
                {reactions.love > 0 && (
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">❤️</span>
                )}
              </span>
              <span>{totalReactions}</span>
            </>
          )}
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          {comments.length > 0 && (
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </button>
          )}
          {post.shares > 0 && <span>{post.shares} shares</span>}
        </div>
      </div>
      <Separator />
      {/* Action buttons */}
      <CardFooter className="p-1">
        <div className="grid w-full grid-cols-3">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${reaction === "like" ? "text-blue-600" : "text-muted-foreground"}`}
            onClick={() => toggleReaction("like")}
          >
            <ThumbsUp className="size-4" />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="size-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Share2 className="size-4" />
            Share
          </Button>
        </div>
      </CardFooter>
      {/* Comments section */}
      {showComments && (
        <div className="border-t px-4 py-3">
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="rounded-2xl bg-muted px-3 py-2">
                    <p className="text-xs font-semibold">{comment.author.name}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="mt-0.5 flex gap-3 px-2 text-xs text-muted-foreground">
                    <span>{comment.time}</span>
                    <button className="font-medium hover:underline">Like</button>
                    <button className="font-medium hover:underline">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-xs">{currentUser.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 items-center gap-1 rounded-full border bg-muted/50 px-3">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground"
                onClick={addComment}
                disabled={!commentText.trim()}
              >
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function EventsSidebar() {
  return (
    <Card className={feedCard}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Calendar className="size-4" />
          Upcoming Events
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
              <p className="text-xs text-muted-foreground">{event.location}</p>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="mt-3 w-full text-xs">
          View All Events
        </Button>
      </CardContent>
    </Card>
  )
}

function PopularPostsSidebar() {
  return (
    <Card className={feedCard}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="size-4" />
          Popular Posts
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {popularPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.author} • {post.reactions} reactions</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// --- Main Feed Page ---

export function FeedPage() {
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [showFloatingBtn, setShowFloatingBtn] = useState(false)
  const createPostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingBtn(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (createPostRef.current) observer.observe(createPostRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex gap-6 p-4 pt-0">
      {/* Feed column */}
      <div className="flex-1 max-w-2xl mx-auto space-y-4 relative">
        <div ref={createPostRef}>
          <CreatePostPrompt onClick={() => setCreatePostOpen(true)} />
        </div>
        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Right sidebar */}
      <div className="hidden xl:block w-80 shrink-0">
        <div className="sticky top-4 space-y-4">
          <EventsSidebar />
          <PopularPostsSidebar />
        </div>
      </div>

      {/* Floating create post button */}
      {showFloatingBtn && (
        <Button
          className="fixed bottom-6 right-6 z-50 gap-2 shadow-lg"
          size="lg"
          onClick={() => setCreatePostOpen(true)}
        >
          <Plus className="size-4" />
          Create Post
        </Button>
      )}

      <CreatePostModal open={createPostOpen} onOpenChange={setCreatePostOpen} />
    </div>
  )
}
